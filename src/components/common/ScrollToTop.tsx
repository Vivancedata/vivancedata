"use client";

import { useState, useEffect } from "react";
import { ArrowMark } from "@/components/common/Marks";

/**
 * Back to top.
 *
 * It was a 48px filled circle that grew 10% on hover. In this world there are
 * no filled circles, no shadows, and exactly one authored motion moment — which
 * this is not. It is a hairline pill in the same vocabulary as every other
 * control: mono, uppercase, 44px, and it uses the site's one arrow shape rather
 * than a second glyph, rotated a quarter turn.
 *
 * It earns its place because the pages here are genuinely long — the homepage
 * runs to about 14,000px — and it sits on an opaque ground so it stays legible
 * over the dot field and the ruled bands it floats above.
 */
export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    toggleVisibility();
    window.addEventListener("scroll", toggleVisibility, { passive: true });

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      // Respect the visitor's motion preference rather than always animating;
      // `scroll-behavior: smooth` is set globally and this call overrides it.
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 transition-opacity duration-default ${
        isVisible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <button
        type="button"
        onClick={scrollToTop}
        // `inert` rather than only `pointer-events-none`: a faded-out control
        // still takes keyboard focus, which is how a hidden button becomes a
        // dead tab stop on every page.
        {...(isVisible ? {} : { tabIndex: -1, "aria-hidden": true as const })}
        className="inline-flex min-h-11 items-center gap-2.5 rounded-pill border border-rule bg-background px-4 text-label uppercase text-mute transition-colors duration-fast hover:border-mute hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <ArrowMark className="-rotate-90" />
        <span>Top</span>
      </button>
    </div>
  );
}
