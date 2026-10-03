import { Link } from "react-router-dom";
import { useLang } from "@/contexts/LanguageContext";
import { MapPin, Heart } from "lucide-react";
import logo from "@/assets/logo.png";

export function Footer() {
  const { t, lang } = useLang();
  const year = new Date().getFullYear();

  const quickLinks = [
    { href: "/", label: t.home },
    { href: "/courses", label: t.courses },
    { href: "/teachers", label: t.teachers },
    { href: "/about", label: t.about },
  ];

  const supportLinks = [
    { href: "/faq", label: lang === "ar" ? "الأسئلة الشائعة" : "FAQ" },
    { href: "/help", label: lang === "ar" ? "مركز المساعدة" : "Help Center" },
    { href: "/contact", label: t.contact },
    { href: "/privacy", label: lang === "ar" ? "سياسة الخصوصية" : "Privacy Policy" },
  ];

  /*
   * Column headings are uppercase + tracked in Latin — the standard footer
   * label treatment. Arabic must NOT get `tracking`: letter-spacing opens
   * gaps between joined glyphs and visibly stretches the words, so the
   * tracking is applied only when the bundle is English.
   */
  const headingClass =
    "mb-4 text-xs font-semibold uppercase text-foreground" +
    (lang === "en" ? " tracking-wider" : "");

  /*
   * Link rows sit in a negative-inline-margin pill: the box overhangs the
   * column by exactly its own inline padding, so the label lands on the same
   * axis as the heading above it while the hover fill can still bleed
   * outward. The accent tick is absolutely placed in that overhang, so it
   * never nudges the text — no layout shift on hover, and `start`/`end`
   * keep it on the correct side in both directions.
   */
  const linkClass =
    "group relative -mx-2.5 inline-flex rounded-lg px-2.5 py-1.5 text-sm text-muted-foreground " +
    "transition-colors duration-200 hover:bg-accent/60 hover:text-foreground";

  const renderList = (items: { href: string; label: string }[]) => (
    <ul className="space-y-1">
      {items.map((link) => (
        <li key={link.href}>
          <Link to={link.href} className={linkClass}>
            <span
              aria-hidden="true"
              className="absolute inset-y-1.5 start-1 w-0.5 rounded-full bg-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            />
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <footer className="mt-auto shrink-0 py-4">
      {/*
        Same construction as the header: the shell supplies the max-width and
        the side inset, and the rounded block lives inside it — so the footer
        lines up with the nav bar above at every width instead of running
        edge to edge.

        The grid is one ladder rather than several independent breakpoints:
          base  -> 1 column (stacked, nothing truncates at 320px)
          sm    -> 2 columns, brand and contact spanning the full row so the
                   two short link lists pair up instead of stranding one
          lg    -> 12 columns as 4 / 2 / 2 / 4, which puts all four blocks
                   on a single row while still giving the address ~400px
        `sm:col-span-*` and `lg:col-span-*` are set per block because they
        resolve in breakpoint order, so the lg values simply replace the sm
        ones rather than fighting them.
      */}
      <div className="shell">
        <div className="relative overflow-hidden rounded-2xl border border-border/40 bg-card/60">
          {/* One soft wash so the block has depth without a hard panel. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 end-0 h-56 w-56 rounded-full bg-primary/10 blur-3xl"
          />

          <div className="relative grid grid-cols-1 gap-8 p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-12 lg:gap-10 lg:p-10">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-4">
              <Link to="/" className="group mb-4 inline-flex items-center gap-2.5">
                <div className="relative">
                  <div className="absolute inset-0 rounded-lg bg-primary/20 blur-sm transition-all duration-300 group-hover:blur-md" />
                  <img
                    src={logo}
                    alt={t.schoolName}
                    className="relative h-9 w-9 rounded-lg object-contain"
                  />
                </div>
                <span className="text-base font-bold text-foreground">{t.schoolName}</span>
              </Link>
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                {lang === "ar"
                  ? "منصة رقمية للتعريف بمدرسة الشهيد محي الدين نوح شاهين للتعليم الأساسي وخدماتها التعليمية."
                  : "A digital platform for Martyr Mohi El-Din Shaheen Basic Education School and its educational services."}
              </p>
            </div>

            {/* Quick links */}
            <div className="lg:col-span-2">
              <h4 className={headingClass}>{lang === "ar" ? "روابط سريعة" : "Quick Links"}</h4>
              {renderList(quickLinks)}
            </div>

            {/* Support */}
            <div className="lg:col-span-2">
              <h4 className={headingClass}>{lang === "ar" ? "الدعم" : "Support"}</h4>
              {renderList(supportLinks)}
            </div>

            {/* Contact */}
            <div className="sm:col-span-2 lg:col-span-4">
              <h4 className={headingClass}>{lang === "ar" ? "تواصل معنا" : "Contact Us"}</h4>
              <ul className="space-y-3">
                <li className="text-sm text-muted-foreground">
                  {lang === "ar" ? "غير منشور رسميًا" : "Not publicly published"}
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <MapPin className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm leading-relaxed text-muted-foreground">
                    {lang === "ar"
                      ? "ميت الرخا، مركز زفتى، محافظة الغربية، مصر"
                      : "Mit Al-Rakha, Zefta, Gharbia, Egypt"}
                  </span>
                </li>
                <li className="text-xs text-muted-foreground">Plus Code: J6CG+9F2</li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="relative border-t border-border/60 px-6 py-4 sm:px-8 lg:px-10">
            <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
              <p className="text-center text-sm text-muted-foreground sm:text-start">
                © {year} {t.schoolName}. {lang === "ar" ? "جميع الحقوق محفوظة." : "All rights reserved."}
              </p>
              <p className="flex items-center gap-1 text-sm text-muted-foreground">
                {lang === "ar" ? "صُنع بـ" : "Made with"}
                <Heart className="mx-0.5 h-3.5 w-3.5 fill-destructive text-destructive" />
                {lang === "ar" ? "للتعليم" : "for education"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
