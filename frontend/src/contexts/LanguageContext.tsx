import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import { ar, en } from "@/locales";
import { revealState, RevealOrigin } from "@/lib/reveal-transition";

type Lang = "ar" | "en";

/**
 * Translation keys are derived from the Arabic bundle, which is the source of
 * truth. Previously `t` was typed `Record<string, string>`, which meant any
 * typo (`t.myGrads`) type-checked and rendered `undefined` at runtime, and a
 * regex audit could not even tell `t.id` (a toast in use-toast.ts) apart from
 * `t.id` (a translation). Typing the keys closes both holes.
 */
export type TranslationKey = keyof typeof ar;
type Translations = Record<TranslationKey, string>;

/**
 * Compile-time guarantee that both bundles stay in sync. If a key is ever added
 * to `ar.ts` without a matching entry in `en.ts`, this assignment fails the
 * build ("Property 'x' is missing") instead of silently falling back to
 * `undefined` at runtime.
 */
const _englishBundleIsComplete: Translations = en;
void _englishBundleIsComplete;

const STORAGE_KEY = "lang";

function isLang(value: unknown): value is Lang {
  return value === "ar" || value === "en";
}

function readStoredLang(): Lang {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return isLang(stored) ? stored : "ar";
  } catch {
    // Private mode / storage disabled — fall back to the default.
    return "ar";
  }
}

function applyDocumentLang(lang: Lang) {
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.documentElement.lang = lang;
}

interface LangCtx {
  lang: Lang;
  /** `origin` anchors the reveal circle to the point the user clicked. */
  toggle: (origin?: RevealOrigin) => void;
  t: Translations;
  isRtl: boolean;
}

const LanguageContext = createContext<LangCtx>({
  lang: "ar",
  toggle: () => {},
  t: ar as unknown as Translations,
  isRtl: true,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(readStoredLang);
  // Mirror of state so rapid clicks never act on a stale closure.
  const langRef = useRef(lang);
  langRef.current = lang;

  // Applied during the first render (not in an effect) so an Arabic default
  // never paints once as LTR before flipping.
  if (typeof document !== "undefined") applyDocumentLang(lang);

  useEffect(() => {
    applyDocumentLang(lang);
  }, [lang]);

  const toggle = (origin?: RevealOrigin) => {
    const next: Lang = langRef.current === "ar" ? "en" : "ar";
    revealState(origin, next, setLang, (n) => {
      // Also run by the render triggered above; kept so the DOM is correct
      // even if React bails out of re-rendering (same value).
      applyDocumentLang(n);
      try {
        window.localStorage.setItem(STORAGE_KEY, n);
      } catch {
        // Ignore quota / private-mode failures; the language still applies.
      }
    });
  };

  return (
    <LanguageContext.Provider
      value={{
        lang,
        toggle,
        t: (lang === "ar" ? ar : en) as unknown as Translations,
        isRtl: lang === "ar",
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
