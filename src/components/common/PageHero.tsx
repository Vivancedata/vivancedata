import React from "react";

interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
}

/**
 * The one hero grammar for top-level pages: light canvas with the soft brand
 * mesh, a mono eyebrow, display ink type with at most one `text-brand` accent
 * span, and a muted lede. Home (Welcome) and methodology set this precedent;
 * every other page hero renders through here so the art direction cannot
 * drift back into per-page backdrops.
 */
export function PageHero({ eyebrow, title, description }: PageHeroProps): React.ReactElement {
  return (
    <section className="hero-mesh w-full">
      <div className="container mx-auto flex flex-col items-center gap-lg px-4 py-4xl text-center md:py-section">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="max-w-4xl text-display-xl text-foreground">{title}</h1>
        {description && (
          <p className="mx-auto max-w-3xl text-body-lg text-muted-foreground">{description}</p>
        )}
      </div>
    </section>
  );
}
