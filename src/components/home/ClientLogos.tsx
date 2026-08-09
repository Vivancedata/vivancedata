import { Factory, HardHat, Truck, Wrench } from "lucide-react";
import { clients, type ClientIcon } from "@/constants/clients";

// Same string-keyed icon map pattern as Welcome.tsx — constants stay serializable.
const sectorIcons: Record<ClientIcon, typeof Factory> = {
  "hard-hat": HardHat,
  wrench: Wrench,
  truck: Truck,
  factory: Factory,
};

export default function ClientLogos() {
  return (
    <section
      className="w-full overflow-hidden bg-muted/20 py-16 md:py-24"
      aria-label="Industries we serve"
    >
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center md:mb-16">
          <div className="mb-4 inline-block rounded-full bg-muted px-3 py-1 text-sm font-medium text-brand">
            Industries We Serve
          </div>
          <h2 className="text-display mb-4 text-foreground">
            Sectors We Work In
          </h2>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg">
            We work with blue-collar and local service businesses — the ones where the paperwork,
            the phone and the schedule are what actually hold the day up.
          </p>
        </div>

        <ul className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {clients.map((client) => {
            const Icon = sectorIcons[client.icon];
            return (
              <li key={client.id}>
                <div className="flex h-full flex-col items-center justify-start rounded-2xl border border-border/60 bg-card/70 px-4 py-6 text-center shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:border-brand/25 hover:shadow-md">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-brand">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-foreground md:text-base">{client.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground md:text-sm">{client.blurb}</p>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-12 border-t border-border pt-8 md:mt-16">
          <div className="grid grid-cols-1 gap-6 text-center md:grid-cols-3 md:gap-8">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-foreground md:text-base">Advisory + Delivery</p>
              <p className="text-sm text-muted-foreground">
                From strategy through implementation support.
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-foreground md:text-base">Cross-Functional Enablement</p>
              <p className="text-sm text-muted-foreground">
                Product, engineering, operations, and governance stakeholders.
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-foreground md:text-base">Industry-Aware Workflows</p>
              <p className="text-sm text-muted-foreground">
                Use-case design tailored to domain and compliance constraints.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
