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
 *
 * ICON FEEDBACK: the sun/moon swap and the globe spin are held back until the
 * reveal is actually visible (see `playIcon`). On the View Transitions path
 * the live DOM is hidden behind the snapshot for the whole transition, so an
 * animation started at `apply` time runs unseen — and its 0% frame is what
 * gets photographed, which reads as a missing icon. That trap is why the rules
 * used to be gated on `.reveal-fallback` and the feedback was effectively
 * dead on every modern browser.
 */

export type RevealOrigin = { x: number; y: number };

/** Which toggle started the reveal, so only that button's glyph animates. */
export type RevealTarget = "theme" | "lang";

/** Must match the classes the icon rules in index.css are keyed on. */
const TARGET_CLASS: Record<RevealTarget, string> = {
  theme: "reveal-icons-theme",
  lang: "reveal-icons-lang",
};

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
const cssDurationMs = (property: string, fallbackMs: number) => {
  try {
    const ms = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue(property),
    );
    return Number.isFinite(ms) ? ms : fallbackMs;
  } catch {
    return fallbackMs;
  }
};

const animDurationMs = () => cssDurationMs("--reveal-duration", 400);
const iconDurationMs = () => cssDurationMs("--reveal-icon-duration", 400);

let running = false;
let fallbackTimer: ReturnType<typeof setTimeout> | undefined;
let iconTimer: ReturnType<typeof setTimeout> | undefined;
/** Set when a second click lands while a transition still covers the page. */
let queuedIcon: RevealTarget | undefined;

/**
 * Drop both icon classes (they hang on <html> because the toggles live in
 * three different subtrees). Called before every `apply` so the snapshot can
 * never catch a half-played animation.
 */
function clearIcons() {
  clearTimeout(iconTimer);
  iconTimer = undefined;
  document.documentElement.classList.remove(
    TARGET_CLASS.theme,
    TARGET_CLASS.lang,
  );
}

/**
 * Play the local feedback on the button the user just pressed.
 *
 * Only ever called once the reveal is visible: immediately on the fallback
 * path, and after `finished` on the View Transitions path.
 */
function playIcon(target: RevealTarget) {
  if (prefersReducedMotion()) return;

  const root = document.documentElement;
  const cls = TARGET_CLASS[target];
  clearTimeout(iconTimer);
  // Remove before re-adding so a second click restarts an animation that has
  // already finished instead of silently doing nothing.
  root.classList.remove(cls);
  void root.offsetHeight;
  root.classList.add(cls);
  iconTimer = setTimeout(
    () => root.classList.remove(cls),
    iconDurationMs() + 80,
  );
}

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
 * Run `apply` behind a circular reveal growing from `origin` (the click point),
 * then confirm it on the button identified by `target`.
 * Safe to call from any event handler; falls back rather than dropping the
 * change if a transition is already in flight or the API is unavailable.
 */
export function reveal(
  origin: RevealOrigin | undefined,
  apply: () => void,
  target: RevealTarget,
) {
  const root = document.documentElement;
  const startVT = getStartViewTransition();

  if (prefersReducedMotion()) {
    apply();
    return;
  }

  // Guarantee a clean snapshot: no icon may be mid-animation when the browser
  // photographs the new page.
  clearIcons();

  if (!startVT) {
    // No API at all, so nothing will ever cover the page — the button can
    // answer the click straight away.
    fallback(apply);
    playIcon(target);
    return;
  }

  if (running) {
    // A transition is already running (Chrome would skip a second one) — take
    // the cheap path instead of silently losing the change. The icon is held
    // back: that in-flight snapshot still hides the live DOM, so playing it
    // now would repeat the original bug.
    fallback(apply);
    queuedIcon = target;
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
  let settled = false;

  const settle = (replay: boolean) => {
    if (settled) return;
    settled = true;
    running = false;
    // Skipped (document hidden, navigation, …) — make sure the change still
    // lands. `apply` is idempotent.
    if (replay) apply();
    // The snapshot is gone and the live page is showing: now — and only
    // now — can the button's own animation be seen.
    playIcon(target);
    if (queuedIcon) {
      const queued = queuedIcon;
      queuedIcon = undefined;
      playIcon(queued);
    }
  };

  // `finished` is the normal signal, but nothing guarantees it ever settles:
  // it can be left pending indefinitely when the document is hidden, when the
  // compositor stops producing frames, or when rasterising a viewport-sized
  // clip-path is slow. Betting on it alone would strand both the `running`
  // lock (every later toggle silently degrades) and the icon feedback. This
  // deadline is only a backstop — it is cleared the moment `finished` does
  // settle, so a healthy transition is unaffected.
  const guard = setTimeout(() => settle(false), animDurationMs() * 2 + 300);

  try {
    const handle = startVT(apply);
    Promise.resolve(handle?.finished).then(
      () => {
        clearTimeout(guard);
        settle(false);
      },
      () => {
        clearTimeout(guard);
        settle(true);
      },
    );
  } catch {
    clearTimeout(guard);
    fallback(apply);
    settle(false);
  }
}

/** Convenience wrapper for the very common "flip React state then paint" shape. */
export function revealState<T>(
  origin: RevealOrigin | undefined,
  next: T,
  setReactState: (next: T) => void,
  applyDom: (next: T) => void,
  target: RevealTarget,
) {
  reveal(
    origin,
    () => {
      // The old snapshot is taken before this callback runs, so the DOM must not
      // move until now — flushSync keeps React from deferring it a microtask.
      flushSync(() => setReactState(next));
      applyDom(next);
    },
    target,
  );
}
