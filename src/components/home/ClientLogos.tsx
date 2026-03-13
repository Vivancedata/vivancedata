import { Building2 } from "lucide-react";
import { clients } from "@/constants/clients";

export default function ClientLogos() {
  return (
    <section
      className="w-full overflow-hidden bg-muted/20 py-16 md:py-24"
      aria-label="Industries we serve"
    >
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center md:mb-16">
          <div className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            Industries We Serve
          </div>
          <h2 className="mb-4 text-2xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Sectors We Work In
          </h2>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg">
            We partner with teams across regulated, operationally complex, and customer-facing
            environments to ship practical AI systems.
          </p>
        </div>

        <ul className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {clients.map((client) => (
            <li key={client.id}>
              <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-border/60 bg-card/70 px-4 py-6 text-center shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-md">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Building2 className="h-7 w-7" aria-hidden="true" />
                </div>
                <p className="mt-4 text-sm font-semibold text-foreground md:text-base">{client.name}</p>
                <p className="mt-1 text-xs text-muted-foreground md:text-sm">{client.industry}</p>
              </div>
            </li>
          ))}
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
