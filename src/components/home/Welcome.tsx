import Link from "next/link";
import { BarChart3, Brain, CheckCircle2, ChevronRight, Zap } from "lucide-react";
import { features } from "@/constants/welcome";

const featureIcons = {
  brain: Brain,
  barChart: BarChart3,
  zap: Zap,
  checkCircle: CheckCircle2,
} as const;

const primaryCtaClass =
  "inline-flex min-h-14 items-center justify-center rounded-xl bg-primary px-8 py-4 text-lg font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-colors duration-200 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const secondaryCtaClass =
  "inline-flex min-h-14 items-center justify-center rounded-xl border border-primary px-8 py-4 text-lg font-medium text-primary transition-colors duration-200 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export default function Welcome() {
  return (
    <section className="container mx-auto overflow-hidden px-4 py-16 md:py-28">
      <div className="relative">
        <div className="absolute inset-x-0 top-0 -z-10 h-52 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent" aria-hidden="true" />
        <div className="absolute right-0 top-0 -z-10 hidden h-80 w-80 rounded-full bg-primary/10 blur-3xl md:block" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 -z-10 hidden h-72 w-72 rounded-full bg-accent/10 blur-3xl md:block" aria-hidden="true" />

        <div className="mb-16 flex flex-col items-center justify-center space-y-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/95 px-4 py-1.5 text-sm font-medium text-foreground shadow-sm dark:bg-card/90">
            Why Choose VivanceData
          </div>
          <h2 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Transforming Businesses Through <span className="text-primary">Intelligent Automation</span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-xl leading-relaxed text-muted-foreground">
            We combine cutting-edge AI technology with deep industry expertise to deliver solutions that drive real business outcomes.
          </p>
        </div>

        <div
          className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2rem" }}
        >
          {features.map((feature) => {
            const Icon = featureIcons[feature.icon as keyof typeof featureIcons] ?? Brain;

            return (
              <article
                key={feature.title}
                className="group flex h-full flex-col rounded-3xl border border-border/70 bg-card/90 p-8 shadow-[0_25px_60px_-45px_rgba(15,118,110,0.24)] transition-transform transition-shadow duration-300 motion-reduce:transition-none motion-safe:hover:-translate-y-1 hover:shadow-[0_35px_80px_-50px_rgba(13,148,136,0.36)]"
              >
                <div className="mb-6 w-fit rounded-2xl border border-border/70 bg-background p-4 transition-colors duration-300 group-hover:border-primary/40">
                  <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                  {feature.title}
                </h3>
                <p className="text-lg text-muted-foreground">{feature.description}</p>
              </article>
            );
          })}
        </div>

        <div
          className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row"
          style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "1.5rem" }}
        >
          <Link href="/services" className={primaryCtaClass}>
            <span>Explore Our Services</span>
            <ChevronRight className="ml-2 h-5 w-5" aria-hidden="true" />
          </Link>
          <Link href="/contact" className={secondaryCtaClass}>
            Schedule a Consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
