import type { Demo } from "@/constants/demos";
import { cn } from "@/lib/utils";

/**
 * The demo-link affordance: mono, uppercase, brand-colored, trailing arrow.
 * Callers pass only positioning classes so the treatment stays identical on
 * every surface that renders one.
 */
export function DemoLink({ demo, className }: { demo: Demo; className?: string }) {
  return (
    <a
      href={demo.href}
      className={cn(
        "font-mono text-xs uppercase tracking-wider text-brand underline-offset-4 hover:underline",
        className,
      )}
    >
      {demo.label} →
    </a>
  );
}
