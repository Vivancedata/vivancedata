"use client";

import { type ReactNode } from "react";
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";

interface MotionProviderProps {
  children: ReactNode;
}

/**
 * The blog and the tools use framer-motion's tree-shakeable `m.*` components,
 * which only animate when LazyMotion has supplied the feature bundle. Without
 * this provider they stay pinned at their `hidden` variant, which is opacity 0.
 *
 * `reducedMotion="user"` matters because framer-motion animates inline styles
 * from JavaScript, which the design system's `prefers-reduced-motion` CSS block
 * cannot cancel. With it set, a visitor who asked for less motion keeps opacity
 * and colour and loses the transforms.
 */
export function MotionProvider({ children }: MotionProviderProps) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation}>{children}</LazyMotion>
    </MotionConfig>
  );
}
