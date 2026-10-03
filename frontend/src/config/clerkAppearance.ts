/**
 * Shared Clerk component appearance.
 *
 * Clerk injects its own stylesheet at runtime and it wins over Tailwind's
 * utilities, hard-coding `.cl-rootBox`/`.cl-card` to 348px. On narrow
 * viewports that is wider than the space available, so the card spills past the
 * viewport edge and adds a horizontal scrollbar. The `w-full!` / `max-w-full!`
 * important modifiers (Tailwind v4 trailing `!`) override Clerk's rules and let
 * the card shrink, while the `cardBox` padding keeps it readable.
 */
export const CLERK_APPEARANCE = {
  elements: {
    rootBox: "w-full!",
    card: "w-full! max-w-full! bg-card border border-border shadow-depth-md rounded-2xl",
    cardBox: "px-4 sm:px-8",
    headerTitle: "text-foreground font-bold",
    headerSubtitle: "text-muted-foreground",
    formButtonPrimary:
      "bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-colors font-medium",
    formFieldInput:
      "border-input rounded-xl focus:ring-2 focus:ring-primary/20 bg-background",
    formFieldLabel: "text-foreground font-medium text-sm",
    footerActionLink: "text-primary hover:text-primary/80 font-medium",
    dividerLine: "bg-border",
    dividerText: "text-muted-foreground text-xs",
    socialButtonsBlockButton:
      "border border-border rounded-xl hover:bg-accent transition-colors",
    alertText: "text-destructive",
  },
};
