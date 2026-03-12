import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ServicesStackProps {
  title: string;
  description?: string;
  technologies?: Array<{
    id: string;
    name: string;
    shortLabel: string;
    tone?: string;
    logo?: string;
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
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
          {description}
        </p>
      )}
      
      {technologies && technologies.length > 0 && (
        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-7">
          {technologies.map((tech) => (
            <div key={tech.id} className="flex flex-col items-center rounded-xl border border-border/60 bg-card/70 p-4">
              {tech.logo ? (
                <Image
                  src={tech.logo}
                  alt={`${tech.name} logo`}
                  width={56}
                  height={56}
                  className="mb-3 h-14 w-14 object-contain"
                  unoptimized
                />
              ) : (
                <div
                  className={cn(
                    "mb-3 flex h-14 w-14 items-center justify-center rounded-xl text-sm font-semibold tracking-wide shadow-sm",
                    tech.tone ?? "bg-primary/10 text-primary"
                  )}
                  aria-hidden="true"
                >
                  {tech.shortLabel}
                </div>
              )}
              <span className="text-center text-sm font-medium text-foreground">{tech.name}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
