import Link from "next/link";
import { ArrowRight, Bot, Code2, Lightbulb } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { services } from "@/constants/services";

const serviceIcons = {
  "generative-ai": Bot,
  consulting: Lightbulb,
  solutions: Code2,
} as const;

const serviceLinks: Record<string, string> = {
  "generative-ai": "/services/generative-ai",
  consulting: "/services/consulting",
  solutions: "/services",
};

export default function Overview() {
  return (
    <section
      className="container mx-auto py-16 px-4 md:py-24"
      style={{ contentVisibility: "auto", containIntrinsicSize: "1200px" }}
    >
      <div className="mx-auto mb-16 max-w-3xl text-center">
        <div className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
          Our Services
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          Comprehensive <span className="text-primary">AI Solutions</span> for Modern Businesses
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          From strategy to implementation, we provide end-to-end AI services that help teams move from
          exploration to measurable business outcomes.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {services.map((service) => {
          const Icon = serviceIcons[service.id as keyof typeof serviceIcons] ?? Bot;

          return (
            <Card
              key={service.id}
              className="flex h-full flex-col border border-border/70 bg-card/90 shadow-lg transition-transform duration-300 hover:-translate-y-1"
            >
              <CardContent className="flex h-full flex-col p-7">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <CardTitle className="text-2xl text-foreground">{service.title}</CardTitle>
                <CardDescription className="mt-3 text-base leading-7 text-muted-foreground">
                  {service.description}
                </CardDescription>
                <ul className="mt-6 space-y-3 text-sm text-foreground/85">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <CardFooter className="mt-auto px-0 pt-8">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                    <Link href={serviceLinks[service.id] ?? "/services"}>
                      <span>{service.cta}</span>
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                </CardFooter>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
