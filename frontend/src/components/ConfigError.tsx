/**
 * Rendered instead of the app when a required environment variable was not
 * present at build time.
 *
 * Without this, ClerkProvider throws a minified stack trace and leaves a blank
 * page, which tells whoever is looking at the deploy nothing about what to fix.
 *
 * Deliberately self-contained: it renders before ThemeProvider/ClerkProvider and
 * before LanguageProvider, so it must not depend on translations, contexts, or
 * any module that could itself fail. Styling uses the CSS custom properties from
 * index.css, which resolve for whichever theme class is already on <html>.
 */

interface ConfigErrorProps {
  missing: string[];
}

const LOCAL_NOTE = "Local dev: put the value in frontend/.env";

export default function ConfigError({ missing }: ConfigErrorProps) {
  return (
    <div
      dir="rtl"
      className="min-h-screen bg-background text-foreground flex items-center justify-center px-4 py-10"
    >
      <div className="w-full max-w-2xl rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
        <div className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive text-lg font-bold"
          >
            !
          </span>
          <div className="min-w-0">
            <h1 className="text-lg sm:text-xl font-semibold leading-tight">
              إعدادات بيئية مفقودة
            </h1>
            <p className="mt-1 text-sm text-muted-foreground" dir="ltr">
              Missing environment variables
            </p>
          </div>
        </div>

        <p className="mt-5 text-sm leading-relaxed">
          لا يمكن تشغيل التطبيق لأن هذه المتغيرات لم تكن موجودة وقت بناء
          الحزمة.
        </p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground" dir="ltr">
          The app cannot start because these variables were absent when the
          bundle was built.
        </p>

        <ul
          dir="ltr"
          className="mt-4 rounded-lg border border-border bg-background p-3 space-y-1.5"
        >
          {missing.map((name) => (
            <li
              key={name}
              className="font-mono text-sm text-foreground break-all"
            >
              {name}
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <h2 className="text-sm font-semibold">طريقة الحل / How to fix</h2>
          <ol className="mt-2 space-y-2 text-sm leading-relaxed">
            <li className="flex gap-2">
              <span className="text-muted-foreground">1.</span>
              <span dir="ltr" className="min-w-0 break-words">
                Vercel → Project → Settings → Environment Variables
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-muted-foreground">2.</span>
              <span className="min-w-0">
                أضف كل متغير مذكور أعلاه، وحدّد نطاق{" "}
                <span dir="ltr" className="font-mono">
                  Production
                </span>
                .
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-muted-foreground">3.</span>
              <span className="min-w-0">
                أعد النشر؛{" "}
                <span dir="ltr" className="font-mono">
                  VITE_*
                </span>{" "}
                تُدمج وقت البناء ولا تُقرأ بعد النشر.
              </span>
            </li>
          </ol>
        </div>

        <p
          dir="ltr"
          className="mt-5 border-t border-border pt-4 font-mono text-xs text-muted-foreground break-words"
        >
          {LOCAL_NOTE}
        </p>
      </div>
    </div>
  );
}
