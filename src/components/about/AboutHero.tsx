import React from "react";

interface AboutHeroProps {
  title: string;
  description: string;
}

export function AboutHero({ title, description }: AboutHeroProps): React.ReactElement {
  return (
    <section className="w-full bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto text-blue-100">
          {description}
        </p>
      </div>
    </section>
  );
}
