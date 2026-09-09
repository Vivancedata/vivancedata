import React from "react";

interface PageHeroProps {
  title: React.ReactNode;
  description?: string;
  /**
   * An optional mono line BELOW the description — a spec line, not a kicker.
   * Use it for a fact that qualifies the page (a count, a date, a scope), never
   * to restate the title in smaller type.
   */
  meta?: string;
}

/**
 * The one hero grammar for top-level pages, in the `nightshift` world.
 *
 * Three things changed when the world did, and each is a rule rather than a
 * preference:
 *
 * 1. **The eyebrow prop is gone.** Every call site passed a line that restated
 *    the title underneath it ("About" over "About Vivancedata", "Our Services"
 *    over "Vivancedata Solutions"). A stacked pre-title is furniture; the
 *    heading carries its own weight. Where the eyebrow was genuinely the better
 *    line, it became the title instead of sitting above it.
 * 2. **Left-set, not centred.** A 76px centred headline sends the eye back
 *    across the viewport on every line, and this world reads as a ruled sheet
 *    rather than as a poster.
 * 3. **The serif, and no `text-brand` span.** Call sites used to colour one
 *    word of the title green. Green means affirmative machine state here, so
 *    emphasis is the serif's italic — pass `<em>` in the title node.
 *
 * The mesh went with the light world. The band closes on a hairline that runs
 * to the viewport edge, which is what every other band on this site does.
 */
export function PageHero({ title, description, meta }: PageHeroProps): React.ReactElement {
  return (
    <section className="bleed border-b border-rule">
      <div className="container mx-auto px-4 py-3xl md:py-4xl">
        <h1 className="max-w-[17ch] font-display text-serif-xl text-balance text-foreground">
          {title}
        </h1>
        {description && (
          <p className="mt-xl max-w-[62ch] text-body-lg text-muted-foreground">{description}</p>
        )}
        {meta && <p className="mt-lg font-mono text-data text-mute">{meta}</p>}
      </div>
    </section>
  );
}
