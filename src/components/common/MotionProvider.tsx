"use client";

import { type ReactNode } from "react";
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";

interface MotionProviderProps {
  children: ReactNode;
}

/**
 * Pages use framer-motion's tree-shakeable `m.*` components, which only animate
 * when LazyMotion has supplied the feature bundle. Without this provider every
 * AnimateOnScroll element stays pinned at its `hidden` variant -- i.e. opacity
 * 0 -- so the body content of all six industry pages rendered invisible.
 *
 * `reducedMotion="user"` is the part that was missing.
 *
 * The design system has a `@media (prefers-reduced-motion: reduce)` block that
 * collapses every animation and transition to 0.01ms, and it looks like it
 * covers the site. It does not reach any of this: framer-motion animates inline
 * styles from JavaScript, which no CSS `animation` or `transition` rule can
 * cancel. So on the twenty-two AnimateOnScroll and StaggerContainer call sites
 * across the industry, service and about pages, a visitor who had asked their
 * operating system for less motion still got the full spatial entrance.
 *
 * With this set, framer-motion drops transforms for those visitors and keeps
 * opacity and colour, which is what the reduced-motion contract asks for --
 * fewer and gentler, not nothing.
 */
export function MotionProvider({ children }: MotionProviderProps) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation}>{children}</LazyMotion>
    </MotionConfig>
  );
}
