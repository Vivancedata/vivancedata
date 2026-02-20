import React, { ReactNode } from "react";

interface Stat {
  icon: ReactNode;
  value: string;
  label: string;
}

interface StatsSectionProps {
  title: string;
  description: string;
  stats: Stat[];
}

export function StatsSection({
  title,
  description,
  stats
}: StatsSectionProps): React.ReactElement {
  return (
    <section className="w-full bg-primary text-primary-foreground py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">{description}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {stats.map((stat) => (
            <div key={`${stat.label}-${stat.value}`} className="flex flex-col items-center text-center">
              <div className="bg-primary-foreground/10 rounded-full p-4 mb-4">
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-primary-foreground/80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
