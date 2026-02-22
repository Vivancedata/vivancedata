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
        ) : (
          <div className="h-[300px] md:h-[400px] rounded-lg overflow-hidden bg-slate-900 p-8 flex flex-col font-mono justify-center">
            <div className="text-primary/60 text-xs mb-6 tracking-wider">deployment log</div>
            <div className="space-y-3">
              {[
                "Build passing",
                "Tests: 94 / 94",
                "Deployed to production",
                "Team documentation delivered",
                "Monitoring configured",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="text-primary text-sm">✓</span>
                  <span className="text-white/60 text-sm">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 text-white/20 text-xs">Last deploy: production — 2 min ago</div>
          </div>
        )}
      </div>
    </section>
  );
}
