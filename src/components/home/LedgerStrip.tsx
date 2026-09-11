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
 */
export function LedgerStrip() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setRunning(entry.isIntersecting),
      { rootMargin: "80px" }
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden border-y border-rule py-3.5"
      aria-hidden="true"
    >
      <div
        className="drift flex w-max gap-0"
        style={{ animationPlayState: running ? "running" : "paused" }}
      >
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center gap-0">
            {ledgerMarks.map((mark) => (
              <li
                key={`${copy}-${mark}`}
                className="whitespace-nowrap px-6 font-mono text-data text-faint"
              >
                {mark}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
