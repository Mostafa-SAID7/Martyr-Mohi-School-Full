import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import { revealState, RevealOrigin } from "@/lib/reveal-transition";

export type Theme = "light" | "dark";
/** Re-exported so callers do not need a second import just to pass an origin. */
export type { RevealOrigin };

const STORAGE_KEY = "theme";

interface ThemeCtx {
  theme: Theme;
  /** `origin` anchors the reveal circle to the point the user clicked. */
  setTheme: (theme: Theme, origin?: RevealOrigin) => void;
  toggleTheme: (origin?: RevealOrigin) => void;
}

const ThemeContext = createContext<ThemeCtx>({
  theme: "light",
  setTheme: () => {},
  toggleTheme: () => {},
});

const commit = (next: Theme) => {
  const root = document.documentElement;
  root.classList.toggle("dark", next === "dark");
  root.style.colorScheme = next;
};

/** Kept in sync with the inline bootstrap in index.html. */
export function readInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // storage unavailable — fall through to the OS preference
  }
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(readInitialTheme);
  // Mirror of state so rapid clicks never act on a stale closure.
  const themeRef = useRef(theme);
  themeRef.current = theme;

  // Applied during render, not in an effect, so the correct palette is in
  // place for the very first paint (the inline script in index.html covers
  // the gap before React mounts).
  if (typeof document !== "undefined") applyTheme(theme);

  useEffect(() => {
    applyTheme(theme);
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Ignore storage failures; the theme still applies for this session.
    }
  }, [theme]);

  // Follow the OS only while the user has not made an explicit choice.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      let explicit: string | null = null;
      try {
        explicit = window.localStorage.getItem(STORAGE_KEY);
      } catch {
        explicit = null;
      }
      if (explicit === "light" || explicit === "dark") return;
      setThemeState(e.matches ? "dark" : "light");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const setTheme = (next: Theme, origin?: RevealOrigin) => {
    if (next === themeRef.current) return;
    revealState(origin, next, setThemeState, commit, "theme");
  };

  const toggleTheme = (origin?: RevealOrigin) =>
    setTheme(themeRef.current === "dark" ? "light" : "dark", origin);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
