"use client";

import { useEffect, useRef, useState } from "react";
import { ledgerMarks } from "@/constants/nightLog";

/**
 * The drifting strip of job identifiers under the hero.
 *
 * The reference this design follows runs a field of currency symbols under its
 * hero, because it is a bank. The equivalent material here is the paperwork —
 * the RFI numbers, delivery notes, timestamps and permit codes that are the
 * thing being typed twice. It is decoration and it is marked as such:
 * `aria-hidden`, in the decorative grey tier, and duplicated only so the loop
 * closes seamlessly.
 *
 * It is a client component for one reason: the animation is a 90-second
 * infinite loop, and it used to keep running for as long as the tab was open —
 * still compositing, still waking the GPU, hours after the visitor had scrolled
 * past it. A decorative loop that nobody can see should not cost anything, and
 * this audience is explicitly on a phone between jobs.
 *
 * An IntersectionObserver pauses it the moment it leaves the viewport. That is
 * the whole of the JavaScript here, it runs no work on load, and if the
 * observer never fires the strip simply stays paused — the failure mode is a
 * static strip, not a missing one.
 *
 * It also carries a pause control. A loop that moves for longer than five
 * seconds beside readable content has to be stoppable (WCAG 2.2.2), and
 * `aria-hidden` does not exempt it: a sighted visitor distracted by motion is
 * exactly who the rule is for. Under reduced motion the strip is already still,
 * so the control is hidden there.
 */
export function LedgerStrip() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const running = inView && !paused;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "80px" }
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative overflow-hidden border-y border-rule py-3.5">
      <div
        className="drift flex w-max gap-0"
        style={{ animationPlayState: running ? "running" : "paused" }}
        aria-hidden="true"
      >
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center gap-0">
            {ledgerMarks.map((mark) => (
              <li
                key={`${copy}-${mark}`}
                className="whitespace-nowrap px-6 font-mono text-data text-mute"
              >
                {mark}
              </li>
            ))}
          </ul>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setPaused((value) => !value)}
        aria-pressed={paused}
        aria-label={paused ? "Play the moving strip" : "Pause the moving strip"}
        className="absolute inset-y-0 right-0 inline-flex min-w-11 items-center justify-center border-l border-rule bg-background px-3 text-label uppercase text-mute transition-colors duration-fast hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring motion-reduce:hidden"
      >
        {paused ? "Play" : "Pause"}
      </button>
    </div>
  );
}
