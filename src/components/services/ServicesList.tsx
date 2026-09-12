import React from "react";

interface Service {
  id: string;
  title: string;
  description: string;
}

interface ServicesListProps {
  services: Service[];
}

/**
 * What a build covers, as ruled rows.
 *
 * These were `bg-card p-8 rounded-lg border border-border` panels, each with a
 * lucide `CheckCircle` sitting in a tinted circle — a card grammar the rest of
 * this site does not use, and a second icon family beside the drawn marks. The
 * homepage's own note says nothing on it is a card; these pages were not
 * following it.
 *
 * The check went with the card rather than being replaced. It was decorative:
 * six identical ticks down a list of things a build covers assert nothing, and
 * the rule plus the serif heading already separate one row from the next. A
 * mark earns its place where it distinguishes items from each other, which is
 * what it does in the pricing table and the night log, and not here.
 */
export function ServicesList({ services }: ServicesListProps): React.ReactElement {
  return (
    <section className="container mx-auto px-4 py-3xl md:py-4xl">
      <div className="grid grid-cols-1 gap-x-2xl gap-y-xl md:grid-cols-2">
        {services.map((service) => (
          <div key={service.id} className="flex flex-col border-t border-rule pt-lg">
            <h3 className="font-display text-serif-sm text-foreground">{service.title}</h3>
            <p className="mt-md text-body-sm text-muted-foreground">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
