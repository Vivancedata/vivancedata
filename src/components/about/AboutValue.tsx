import React from "react";
import Image from "next/image";

interface AboutValueProps {
  title: string;
  description: string;
  imageSrc?: string;
}

/**
 * Without an image this is a single column. It used to fall back to a mocked
 * "deployment log" card (94/94 tests, "deployed 2 min ago") -- proof-shaped
 * decoration that described no real deployment. Nothing stands in for evidence
 * the practice does not have; see PRODUCT.md, "Absences that must not be
 * fabricated".
 */
export function AboutValue({ title, description, imageSrc }: AboutValueProps): React.ReactElement {
  return (
    <section className="container mx-auto py-16 md:py-24 px-4">
      <div
        className={
          imageSrc
            ? "grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            : "max-w-4xl mx-auto"
        }
      >
        <div>
          <h2 className="text-display mb-6">{title}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            {description}
          </p>
        </div>
        {imageSrc ? (
          <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
            <Image
              src={imageSrc}
              alt={`Illustration representing ${title}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
