import React from "react";
import { ArrowMark } from "@/components/common/Marks";
import { ctaPrimary } from "@/components/common/controls";

interface CTASectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

/**
 * The closing band of a page: one sentence, one ask.
 *
 * It used to build its own control — `<Button size="lg" shape="pill">` with
 * lucide's `ArrowRight` — which is how `/services` ended up with a 32px CTA on
 * a site whose control vocabulary has a 44px floor, and with a 2px-stroke
 * arrow beside the 1.5px one every other control uses. Neither was a decision;
 * they were what the generic component happened to produce.
 *
 * It now uses `ctaPrimary` and `ArrowMark`, so the closing ask on every page
 * that composes this band is the same object as the one in the header.
 */
export function CTASection({
  title,
  description,
  buttonText,
  buttonLink,
}: CTASectionProps): React.ReactElement {
  return (
    <section className="bleed border-t border-rule">
      <div className="container mx-auto px-4 py-3xl md:py-4xl">
        {/* Left-set, like every other band. The centred column here was the
          * only place a heading on this site broke the left edge, and it read
          * as a different page rather than as emphasis. */}
        <h2 className="max-w-[34ch] font-display text-serif-lg text-foreground">{title}</h2>
        <p className="mt-lg max-w-[58ch] text-body-lg text-muted-foreground">{description}</p>
        <a href={buttonLink} className={`${ctaPrimary} mt-xl`}>
          <span>{buttonText}</span>
          <ArrowMark />
        </a>
      </div>
    </section>
  );
}
