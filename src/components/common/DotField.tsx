"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * The dot matrix behind a band, read two ways: a scan band crosses it while it
 * is on screen, and a mouse over the band lights the dots under it. The CSS is
 * in globals.css; this only says where the pointer is and whether to run.
 */
export function DotField({ className }: { className?: string }): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const field = ref.current;
    const band = field?.closest("section");
    if (!field || !band) return;

    const onScreen = new IntersectionObserver(([entry]) => {
      field.toggleAttribute("data-live", entry.isIntersecting);
    });
    onScreen.observe(field);

    const light = (event: PointerEvent): void => {
      if (event.pointerType !== "mouse") return;
      const { left, top } = field.getBoundingClientRect();
      field.style.setProperty("--mx", `${event.clientX - left}px`);
      field.style.setProperty("--my", `${event.clientY - top}px`);
      field.toggleAttribute("data-lit", true);
    };
    const dim = (): void => field.removeAttribute("data-lit");

    band.addEventListener("pointermove", light, { passive: true });
    band.addEventListener("pointerleave", dim);

    return () => {
      onScreen.disconnect();
      band.removeEventListener("pointermove", light);
      band.removeEventListener("pointerleave", dim);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "dot-field field-dots field-dots-fade pointer-events-none absolute inset-y-0 right-0 -z-10 hidden lg:block",
        className
      )}
      aria-hidden="true"
    >
      <div className="dot-scan">
        <i />
      </div>
      <div className="dot-lamp" />
    </div>
  );
}
