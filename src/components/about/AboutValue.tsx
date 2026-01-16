import React from "react";
import Image from "next/image";

interface AboutValueProps {
  title: string;
  description: string;
  imageSrc?: string;
}

export function AboutValue({ title, description, imageSrc }: AboutValueProps): React.ReactElement {
  return (
    <section className="container mx-auto py-16 md:py-24 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            {description}
          </p>
        </div>
        {imageSrc && (
          <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
            <Image
              src={imageSrc}
              alt={`Illustration representing ${title}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        )}
      </div>
    </section>
  );
}
