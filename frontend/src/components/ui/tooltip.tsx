import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

/**
 * Styled against the design tokens rather than shadcn's defaults:
 *
 *   • `--popover` / `--popover-foreground` are themed, so this reads correctly
 *     in dark mode without a separate rule (the old `bg-popover text-…` was
 *     fine, but `shadow-md` sat on top of our own scale — `shadow-depth-lg`
 *     keeps it in the same family as the menus it sits next to).
 *   • `border-border/70` instead of a solid border: at 20px tall a full-weight
 *     border frames the text more than it separates the surface.
 *   • `text-xs font-medium` — this is a label, not body copy. `text-sm` made
 *     it the same weight as the nav links it was annotating.
 *
 * The arrow is rendered by default because every current use anchors a tooltip
 * to a small control; without it, a 4px offset on a 32px button reads as
 * "floating near" rather than "pointing at".
 */
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 6, children, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 flex items-center whitespace-nowrap rounded-lg border border-border/70 bg-popover px-2.5 py-1.5 text-xs font-medium text-popover-foreground shadow-depth-lg animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  >
    {children}
    <TooltipPrimitive.Arrow className="fill-popover" width={10} height={5} />
  </TooltipPrimitive.Content>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
