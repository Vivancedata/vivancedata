import React from "react";

interface AboutDescriptionProps {
  title: string;
  description: string;
}

export function AboutDescription({ title, description }: AboutDescriptionProps): React.ReactElement {
  return (
    <section className="container mx-auto py-16 md:py-24 px-4">
      <div>
        <h2 className="mb-6 font-display text-serif-lg">{title}</h2>
        <p className="max-w-[62ch] text-body-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </section>
  );
}
