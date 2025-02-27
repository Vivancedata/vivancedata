import React from "react";
import Image from "next/image";

interface ServicesStackProps {
  title: string;
  description?: string;
  technologies?: Array<{
    id: string;
    name: string;
    icon: string;
  }>;
}

export function ServicesStack({ 
  title, 
  description, 
  technologies 
}: ServicesStackProps): React.ReactElement {
  return (
    <section className="container mx-auto py-16 md:py-24 px-4 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>
      {description && (
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-12">
          {description}
        </p>
      )}
      
      {technologies && technologies.length > 0 && (
        <div className="flex flex-wrap justify-center items-center gap-8 mt-8">
          {technologies.map((tech) => (
            <div key={tech.id} className="flex flex-col items-center">
              <div className="relative w-16 h-16 md:w-20 md:h-20 mb-3">
                <Image
                  src={tech.icon}
                  alt={tech.name}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-sm font-medium">{tech.name}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
