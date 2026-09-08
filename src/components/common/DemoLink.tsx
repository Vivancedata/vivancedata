"use client";

import type { Demo } from "@/constants/demos";
import { ArrowMark } from "@/components/common/Marks";
import { ANALYTICS } from "@/lib/analytics";
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
      onClick={() => ANALYTICS.demoOpened(demo.label)}
      className={cn(
        "group inline-flex min-h-11 items-center justify-center gap-2.5 rounded-pill border border-rule bg-transparent px-4",
        "text-label uppercase text-brand transition-colors duration-fast",
        "hover:border-brand/50 hover:bg-accent",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
    >
      {demo.label}
      {/* One arrow shape across the site, at one stroke weight. */}
      <ArrowMark className="transition-transform duration-default group-hover:translate-x-0.5" />
    </a>
  );
}
