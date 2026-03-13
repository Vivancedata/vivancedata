import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  categoryColors,
  getIntegrationsByCategory,
  integrationCategories,
  type Integration,
} from "@/constants/integrations";
import { cn } from "@/lib/utils";

const getIconLetters = (name: string): string => {
  const words = name.split(" ");
  if (words.length === 1) {
    return name.substring(0, 2).toUpperCase();
  }

  return words
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
};

function IntegrationCard({ integration }: { integration: Integration }) {
  const colors = categoryColors[integration.category];

  return (
    <li>
      <Card className="h-full border border-border/70 bg-card/95 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:border-primary/30">
        <CardContent className="flex h-full flex-col items-start p-6">
          <div
            className={cn(
              "mb-4 flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm",
              integration.logo
                ? "bg-white p-2.5"
                : "bg-primary text-lg font-bold text-primary-foreground"
            )}
          >
            {integration.logo ? (
              <Image
                src={integration.logo}
                alt={`${integration.name} logo`}
                width={36}
                height={36}
                className="h-full w-full object-contain"
                unoptimized
              />
            ) : (
              <span aria-hidden="true">{getIconLetters(integration.name)}</span>
            )}
          </div>

          <span
            className={cn(
              "mb-3 rounded-full border px-2.5 py-1 text-xs font-semibold",
              colors.bg,
              colors.text,
              colors.border
            )}
          >
            {integration.category}
          </span>

          <h3 className="text-lg font-semibold text-foreground">{integration.name}</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{integration.description}</p>
        </CardContent>
      </Card>
    </li>
  );
}

export default function Integrations() {
  return (
    <section
      className="w-full overflow-hidden bg-muted/20 py-16 md:py-24"
      style={{ contentVisibility: "auto", containIntrinsicSize: "1800px" }}
    >
      <div className="container relative mx-auto px-4">
        <div className="absolute left-0 top-20 -z-10 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-20 right-0 -z-10 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />

        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            Technology Stack
          </div>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Seamless Integrations
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            We work with the systems your team already relies on, from cloud infrastructure and data
            platforms to CRM and communication tools.
          </p>
        </div>

        <div className="space-y-10">
          {integrationCategories.map((category) => (
            <section key={category} aria-labelledby={`integration-category-${category}`}>
              <div className="mb-5 flex items-center gap-3">
                <h3
                  id={`integration-category-${category}`}
                  className="text-xl font-semibold text-foreground"
                >
                  {category}
                </h3>
                <div className="h-px flex-1 bg-border/70" aria-hidden="true" />
              </div>
              <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {getIntegrationsByCategory(category).map((integration) => (
                  <IntegrationCard key={integration.id} integration={integration} />
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-primary px-8 py-10 text-center text-primary-foreground shadow-xl">
          <h3 className="text-2xl font-bold md:text-3xl">Don&apos;t See Your Platform?</h3>
          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground">
            We also build custom integrations for internal APIs, legacy systems, and bespoke data
            workflows. If it matters to your team, we can design around it.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm font-medium">
            {["REST APIs", "GraphQL", "WebSockets", "SOAP", "Custom Protocols"].map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-primary-foreground/30 bg-primary-foreground px-4 py-2 text-primary"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
