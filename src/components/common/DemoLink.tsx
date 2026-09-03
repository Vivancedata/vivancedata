import type { Demo } from "@/constants/demos";
import { cn } from "@/lib/utils";

/**
 * The demo-link affordance. These are the only proof on this site a visitor can
 * check without talking to anyone, and they shipped as 12px mono links with a
 * 16px-tall tap target at 390 -- smaller than the twenty vendor logos that each
 * got a 190px card. They are now the secondary pill: hairline border, card
 * ground, 44px minimum height, which is the platform floor for a touch target.
 * The mono label stays; it is what marks a live artefact rather than a claim.
 */
export function DemoLink({ demo, className }: { demo: Demo; className?: string }) {
  return (
    <a
      href={demo.href}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-pill border border-border bg-card px-4",
        "font-mono text-xs uppercase tracking-wider text-brand transition-colors duration-fast",
        "hover:border-brand/40 hover:bg-accent",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
    >
      {demo.label}
      <span aria-hidden="true">&rarr;</span>
    </a>
  );
}
