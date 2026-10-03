import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLang } from "@/contexts/LanguageContext";
import { useState, useEffect, useRef, type ReactElement } from "react";
import {
  Menu,
  X,
  Globe,
  GraduationCap,
  LogOut,
  LayoutDashboard,
  LogIn,
  Sun,
  Moon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import logo from "@/assets/logo.png";

/**
 * Wraps a control in the Tooltip from `components/ui/tooltip`.
 *
 * These buttons are icon-only, so the label used to live on a native `title` —
 * which is slow to appear, impossible to style, and never shown on touch.
 * Moving it here keeps `aria-label` as the accessible name (Radix suppresses
 * the tooltip on touch input, so it is decoration, not the only source).
 *
 * `asChild` means the trigger element itself is used, so `children` must be a
 * single ref-forwarding element. Every button and link below qualifies.
 */
function Tip({
  label,
  side = "bottom",
  children,
}: {
  label: string;
  side?: "top" | "bottom" | "left" | "right";
  children: ReactElement;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side}>{label}</TooltipContent>
    </Tooltip>
  );
}

export function PublicNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { userId, fullName, signOut, isTeacher, isParent } = useAuth();
  const { lang, toggle, t } = useLang();
  const { theme, toggleTheme } = useTheme();

  // The page is a fixed-height shell and the region under the header is the
  // scroll container at every breakpoint, so `window` never scrolls. The
  // container sits *after* the header as a sibling — searching only ancestors
  // walked straight past it up to <html> and fell back to `window`, which
  // never moves, so `scrolled` could never become true and the scroll
  // animation below never fired. Prefer the following sibling, then ancestors
  // (for layouts that do nest the header inside the scroller), then window.
  useEffect(() => {
    const isScrollable = (el: Element) => {
      const oy = getComputedStyle(el).overflowY;
      return oy === "auto" || oy === "scroll";
    };

    let node: HTMLElement | Window = window;
    const header = headerRef.current;
    const parent = header?.parentElement ?? null;

    if (header && parent) {
      const siblings = Array.from(parent.children) as HTMLElement[];
      const afterHeader = siblings
        .slice(siblings.indexOf(header) + 1)
        .find(isScrollable);
      if (afterHeader) node = afterHeader;
    }

    if (node === window) {
      let el = parent;
      while (el) {
        if (isScrollable(el)) {
          node = el;
          break;
        }
        el = el.parentElement;
      }
    }

    const handleScroll = () => {
      const top = node === window ? window.scrollY : (node as HTMLElement).scrollTop;
      setScrolled(top > 12);
    };

    handleScroll();
    node.addEventListener("scroll", handleScroll, { passive: true });
    return () => node.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setAvatarOpen(false);
  }, [location.pathname]);

  // The menu is `lg:hidden`, so without this a resize across the breakpoint
  // leaves it state-open and it reappears already open next time.
  useEffect(() => {
    const mq = window.matchMedia("(width >= 64rem)");
    const close = () => setIsOpen(false);
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) {
        setAvatarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const navLinks = [
    { href: "/", label: t.home },
    { href: "/courses", label: t.courses },
    { href: "/teachers", label: t.teachers },
    { href: "/about", label: t.about },
  ];

  const dashboardHref = isTeacher ? "/teacher/courses" : isParent ? "/parent" : "/dashboard";
  const initials = fullName
    ? fullName.trim().split(" ").slice(0, 2).map((w) => w[0]).join("")
    : "؟";

  // The toggle shows the *target* state, so a dark session reads "Light mode".
  const themeTip =
    theme === "dark"
      ? lang === "ar" ? "الوضع النهاري" : "Light mode"
      : lang === "ar" ? "الوضع الليلي" : "Dark mode";
  const langTip = lang === "ar" ? "Switch to English" : "التبديل للعربية";
  const loginTip = lang === "ar" ? "تسجيل الدخول" : "Sign in";
  const menuTip = lang === "ar" ? "القائمة" : "Menu";

  const handleSignOut = async () => {
    setAvatarOpen(false);
    await signOut();
    navigate("/");
  };

  return (
    <header
      ref={headerRef}
      className={cn(
        // Shrinking the top gutter on scroll is the scroll animation: the bar
        // visibly tightens against the edge while its own background, border
        // and shadow deepen. The gap is what moves — the bar's height and the
        // row inside it never change, so no text reflows as it happens.
        "sticky top-0 z-50 shrink-0 transition-all duration-300 ease-out",
        scrolled ? "pt-1.5" : "pt-4",
      )}
    >
      {/* Gutter, but no shell. `.shell` carried `max-width: 80rem`, which is
          what held the bar to 1280px and left it narrower than the page on
          any wide screen. The padding ladder below is byte-for-byte the one
          the shell used (1 / 1.5 / 2 / 2.5rem at 0 / 40 / 64 / 96rem), so the
          bar keeps the exact same inset on phones, tablets and laptops — only
          the ceiling is gone, and past 1536px it now spans the viewport.
          Padding still lives here rather than on the bar so the bar itself
          can run edge-to-edge inside its own rounded corners. */}
      <div className="px-4 sm:px-6 lg:px-8 2xl:px-10">
        {/* `relative` anchors the menu to the bar, not to the full-bleed
            header — so it inherits the bar's inset and rounded silhouette. */}
        <div className="relative">
          <nav
            aria-label={lang === "ar" ? "التنقل الرئيسي" : "Main navigation"}
            className={cn(
              // Rounded, but with no surface. The fill and backdrop-blur stay
              // gone (the page reads straight through), so the 1px border is
              // what draws the rounded silhouette — an outline is a shape,
              // not a background. `shadow-*` also stays off: it would bring
              // back the panel the fill used to make.
              //
              // Scroll still has two things to animate without touching the
              // surface: the border firms up (0.4 -> 0.7) and the header's top
              // gutter tightens 16px -> 6px. Bar height and the row inside it
              // never change, so no text reflows as it moves.
              "flex h-16 items-center justify-between gap-3 rounded-2xl border px-3 transition-all duration-300 ease-out",
              scrolled ? "border-border/70" : "border-border/40",
            )}
          >
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
              <div className="relative">
                <div className="absolute inset-0 rounded-xl bg-primary/25 blur-sm group-hover:blur-md transition-all duration-300" />
                <img
                  src={logo}
                  alt={t.schoolName}
                  width={40} height={40}
                  className="relative h-9 w-9 object-contain rounded-xl ring-1 ring-primary/20"
                />
              </div>
              <span className="text-base font-bold text-foreground hidden sm:block tracking-tight">
                {t.schoolName}
              </span>
            </Link>

            {/* Desktop center nav */}
            <ul className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => {
                const active = location.pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap",
                        active
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent/60",
                      )}
                    >
                      {link.label}
                      {active && (
                        <span className="absolute bottom-1 right-1/2 translate-x-1/2 w-4 h-0.5 rounded-full bg-primary" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Desktop right actions — icon-only */}
            <div className="hidden lg:flex items-center gap-1.5">
              <Tip label={themeTip}>
                <button
                  onClick={(e) => toggleTheme({ x: e.clientX, y: e.clientY })}
                  className="w-9 h-9 flex items-center justify-center rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-accent/60 hover:border-primary/30 transition-all duration-200"
                  aria-label={themeTip}
                >
                  {theme === "dark" ? <Sun className="h-4 w-4 theme-toggle-icon" /> : <Moon className="h-4 w-4 theme-toggle-icon" />}
                </button>
              </Tip>

              <Tip label={langTip}>
                <button
                  onClick={(e) => toggle({ x: e.clientX, y: e.clientY })}
                  className="w-9 h-9 flex items-center justify-center rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-accent/60 hover:border-primary/30 transition-all duration-200"
                  aria-label="تبديل اللغة"
                >
                  <Globe key={lang} className="h-4 w-4 lang-toggle-icon" />
                </button>
              </Tip>

              {userId ? (
                /* Avatar dropdown */
                <div className="relative" ref={avatarRef}>
                  <Tip
                    label={fullName || (lang === "ar" ? "القائمة الشخصية" : "Account menu")}
                    side="bottom"
                  >
                    <button
                      onClick={() => setAvatarOpen((v) => !v)}
                      className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground text-sm font-bold flex items-center justify-center ring-2 ring-transparent hover:ring-primary/40 transition-all duration-200 shadow-depth-sm"
                      aria-label={lang === "ar" ? "القائمة الشخصية" : "Account menu"}
                      aria-expanded={avatarOpen}
                    >
                      {initials}
                    </button>
                  </Tip>
                  {avatarOpen && (
                    <div className={cn(
                      "absolute top-11 z-50 w-52 rounded-2xl bg-card border border-border shadow-depth-lg overflow-hidden animate-scale-in",
                      lang === "ar" ? "left-0" : "right-0",
                    )}>
                      <div className="px-4 py-3 border-b border-border bg-secondary/30">
                        <p className="text-xs text-muted-foreground">{lang === "ar" ? "مرحباً" : "Hello"}</p>
                        <p className="text-sm font-semibold text-foreground truncate">{fullName}</p>
                      </div>
                      <div className="p-1.5 space-y-0.5">
                        <Link
                          to={dashboardHref}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-foreground hover:bg-accent/60 transition-colors"
                        >
                          <LayoutDashboard className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          {t.dashboard}
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-destructive hover:bg-destructive/8 transition-colors"
                        >
                          <LogOut className="h-4 w-4 flex-shrink-0" />
                          {t.signOut}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Tip label={loginTip}>
                  <Link
                    to="/auth"
                    aria-label="تسجيل الدخول"
                    className="w-9 h-9 flex items-center justify-center rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 shadow-depth-sm"
                  >
                    <LogIn className="h-4 w-4" />
                  </Link>
                </Tip>
              )}
            </div>

            {/* Mobile actions */}
            <div className="flex lg:hidden items-center gap-1.5">
              <Tip label={themeTip}>
                <button
                  onClick={(e) => toggleTheme({ x: e.clientX, y: e.clientY })}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-accent"
                  aria-label={themeTip}
                >
                  {theme === "dark" ? <Sun className="h-3.5 w-3.5 theme-toggle-icon" /> : <Moon className="h-3.5 w-3.5 theme-toggle-icon" />}
                </button>
              </Tip>
              <Tip label={langTip}>
                <button
                  onClick={(e) => toggle({ x: e.clientX, y: e.clientY })}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-accent"
                  aria-label="تبديل اللغة"
                >
                  <Globe key={lang} className="h-3.5 w-3.5 lang-toggle-icon" />
                </button>
              </Tip>
              {userId && (
                <Link to={dashboardHref} aria-label={lang === "ar" ? "لوحة التحكم" : "Dashboard"}>
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 text-primary-foreground text-xs font-bold flex items-center justify-center">
                    {initials}
                  </div>
                </Link>
              )}
              <Tip label={menuTip}>
                <button
                  onClick={() => setIsOpen((v) => !v)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-accent transition-colors"
                  aria-label={menuTip}
                  aria-expanded={isOpen}
                  aria-controls="nav-menu"
                >
                  {isOpen
                    ? <X className="h-4.5 w-4.5 text-foreground" />
                    : <Menu className="h-4.5 w-4.5 text-foreground" />}
                </button>
              </Tip>
            </div>
          </nav>

          {/*
            Mobile menu — a dropdown hanging off the bar rather than a strip
            pushed into the header's flow. Staying `absolute` means opening it
            never resizes the scroll region below, and `.nav-dropdown` (in
            index.css) animates both directions because the node is always
            mounted; `is-open` is the only thing that changes.

            `inset-x-0` matches it to the bar's width, so it reads as part of
            the header instead of a second full-width panel.
          */}
          <div
            id="nav-menu"
            className={cn(
              "nav-dropdown absolute inset-x-0 top-full mt-2 rounded-2xl border border-border/60 bg-card/95 shadow-depth-lg backdrop-blur-xl lg:hidden",
              isOpen && "is-open",
            )}
          >
            <div className="max-h-[calc(100dvh-7rem)] overflow-y-auto overscroll-contain p-2.5">
              <div className="space-y-0.5 mb-2.5">
                {navLinks.map((link) => {
                  const active = location.pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors",
                        active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent hover:text-foreground",
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
              <div className="border-t border-border pt-2.5 space-y-2">
                {userId ? (
                  <>
                    <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-secondary/40 border border-border">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 text-primary-foreground text-xs font-bold flex items-center justify-center flex-shrink-0">
                        {initials}
                      </div>
                      <span className="text-sm font-medium text-foreground truncate">{fullName}</span>
                    </div>
                    <Link to={dashboardHref} className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium text-foreground hover:bg-accent transition-colors">
                      <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
                      {t.dashboard}
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/8 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      {t.signOut}
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/auth" className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-accent transition-colors">
                      <GraduationCap className="h-4 w-4 text-primary" />
                      {t.signIn}
                    </Link>
                    <Link to="/auth" className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                      {t.signUp}
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
