import React from "react";

interface AboutDescriptionProps {
  title: string;
  description: string;
}

export function AboutDescription({ title, description }: AboutDescriptionProps): React.ReactElement {
  return (
    <section className="container mx-auto py-16 md:py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          {description}
        </p>
      </div>
    </section>
  );
}
