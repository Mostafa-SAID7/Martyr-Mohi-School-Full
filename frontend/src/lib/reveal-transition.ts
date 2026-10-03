import { flushSync } from "react-dom";

/**
 * Shared circular-reveal used by BOTH the theme toggle and the language
 * toggle. Extracted so the two can never animate at the same time (they share
 * one lock) and so the origin / duration / fallback rules stay in one place.
 *
 * Two paths, documented next to the CSS in index.css:
 *
 *   1. View Transitions API — the browser rasterises the old page and the new
 *      page into two images and animates only those. No live element is
 *      repainted or re-laid-out per frame, which is what makes it both smooth
 *      and cheap. The new image is revealed by a circle growing out of the
 *      exact point the user clicked.
 *
 *   2. `.reveal-fallback` — a class hung on <html> for one duration so that
 *      ONLY paint properties transition. Layout properties are deliberately
 *      excluded: animating them would force a reflow on every frame.
 *
 * `prefers-reduced-motion` skips both and applies the change instantly.
 *
 * NOTE: the caller's `apply` runs INSIDE the view-transition callback. The old
 * snapshot is captured before that callback, so nothing may have touched the
 * DOM beforehand — that is why callers wrap their React state update in
 * `flushSync`. Calling `setX()` directly would let React render in a microtask
 * and change the DOM before the browser photographed it.
 */

export type RevealOrigin = { x: number; y: number };

type StartViewTransition = (
  update: () => void | Promise<void>,
) => { finished?: Promise<unknown> };

/** Typed locally so this compiles against lib.dom versions predating the API. */
const getStartViewTransition = (): StartViewTransition | undefined =>
  (document as unknown as { startViewTransition?: StartViewTransition })
    .startViewTransition;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Duration is read back from CSS so there is a single source of truth. */
const animDurationMs = () => {
  try {
    const ms = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--reveal-duration",
      ),
    );
    return Number.isFinite(ms) ? ms : 400;
  } catch {
    return 400;
  }
};

let running = false;
let fallbackTimer: ReturnType<typeof setTimeout> | undefined;

function fallback(apply: () => void) {
  const root = document.documentElement;
  root.classList.add("reveal-fallback");
  // Force one style recalc so `transition` is armed against the *current*
  // colours. Without it the class and the change land in the same recalc and
  // the browser has nothing to interpolate between.
  void root.offsetHeight;
  apply();
  clearTimeout(fallbackTimer);
  fallbackTimer = setTimeout(
    () => root.classList.remove("reveal-fallback"),
    animDurationMs() + 80,
  );
}

/**
 * Run `apply` behind a circular reveal growing from `origin` (the click point).
 * Safe to call from any event handler; falls back rather than dropping the
 * change if a transition is already in flight or the API is unavailable.
 */
export function reveal(origin: RevealOrigin | undefined, apply: () => void) {
  const root = document.documentElement;
  const startVT = getStartViewTransition();

  if (prefersReducedMotion()) {
    apply();
    return;
  }

  if (!startVT || running) {
    // No API, or a transition is already running (Chrome would skip a second
    // one) — take the cheap path instead of silently losing the change.
    fallback(apply);
    return;
  }

  const w = root.clientWidth;
  const h = root.clientHeight;
  const x = origin?.x ?? w / 2;
  const y = origin?.y ?? h / 2;

  root.style.setProperty("--reveal-x", `${x}px`);
  root.style.setProperty("--reveal-y", `${y}px`);
  // Farthest corner from the click point, so the circle always covers the page.
  root.style.setProperty(
    "--reveal-r",
    `${Math.hypot(Math.max(x, w - x), Math.max(y, h - y))}px`,
  );

  running = true;
  try {
    const handle = startVT(apply);
    Promise.resolve(handle?.finished).then(
      () => {
        running = false;
      },
      () => {
        // Skipped (document hidden, navigation, …) — make sure the change
        // still lands, then release the lock. `apply` is idempotent.
        running = false;
        apply();
      },
    );
  } catch {
    running = false;
    fallback(apply);
  }
}

/** Convenience wrapper for the very common "flip React state then paint" shape. */
export function revealState<T>(
  origin: RevealOrigin | undefined,
  next: T,
  setReactState: (next: T) => void,
  applyDom: (next: T) => void,
) {
  reveal(origin, () => {
    // The old snapshot is taken before this callback runs, so the DOM must not
    // move until now — flushSync keeps React from deferring it a microtask.
    flushSync(() => setReactState(next));
    applyDom(next);
  });
}
