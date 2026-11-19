"use client";

import { useEffect } from "react";

const TARGETS = "main :is(h2, figure, section.bleed.border-t)";
const SETTLE = "cubic-bezier(0.16, 1, 0.3, 1)";

/** Holds a target at its first keyframe until `play()`. */
function arm(target: Element): Animation {
  const animation =
    target.tagName === "SECTION"
      ? // The band's hairline is its `::before`; see globals.css.
        target.animate(
          { transform: ["scaleX(0)", "scaleX(1)"] },
          { duration: 900, easing: SETTLE, pseudoElement: "::before" }
        )
      : target.animate(
          { transform: ["translateY(12px)", "translateY(0)"] },
          { duration: 620, easing: SETTLE }
        );
  animation.pause();
  return animation;
}

/**
 * The sheet's scroll motion: a band's hairline draws across, and a heading or
 * figure rises 12px into register, as each enters the viewport.
 *
 * Three choices that are easy to undo by accident:
 *
 * - **Nothing is hidden while it waits.** A waiting heading sits 12px low at
 *   full opacity, so a page whose JavaScript never runs is a still page, not a
 *   blank one, and no text drops below its contrast floor mid-animation.
 * - **What is on screen when first observed is left alone.** Arming it would
 *   make it jump after first paint.
 * - **Web Animations, not classes or attributes.** The page body streams in and
 *   hydrates after this mounts, and writing an attribute onto markup React has
 *   not hydrated yet is a hydration mismatch. An animation is not part of the
 *   DOM React compares. It also means the design system's reduced-motion CSS
 *   cannot reach this, so the preference is checked here.
 */
export function SheetMotion(): null {
  useEffect(() => {
    const main = document.querySelector("main");
    if (!main || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const waiting = new Map<Element, Animation>();
    const settled = new WeakSet<Element>();

    const arrivals = new IntersectionObserver(
      (entries) => {
        for (const { target, isIntersecting, boundingClientRect } of entries) {
          if (isIntersecting) {
            waiting.get(target)?.play();
            waiting.delete(target);
            settled.add(target);
            arrivals.unobserve(target);
          } else if (!waiting.has(target) && boundingClientRect.top > window.innerHeight) {
            waiting.set(target, arm(target));
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px" }
    );

    // The page body arrives after this mounts and is replaced on navigation.
    const watch = (): void => {
      for (const target of main.querySelectorAll(TARGETS)) {
        if (!settled.has(target)) arrivals.observe(target);
      }
    };
    watch();
    const content = new MutationObserver(watch);
    content.observe(main, { childList: true, subtree: true });

    return () => {
      arrivals.disconnect();
      content.disconnect();
      for (const animation of waiting.values()) animation.cancel();
    };
  }, []);

  return null;
}
