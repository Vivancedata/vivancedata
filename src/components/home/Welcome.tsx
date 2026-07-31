import { BarChart3, Brain, CheckCircle2, ChevronRight, Zap } from "lucide-react";
import { features } from "@/constants/welcome";

const featureIcons = {
  brain: Brain,
  barChart: BarChart3,
  zap: Zap,
  checkCircle: CheckCircle2,
} as const;

// Marketing CTAs are pills; the primary is an ink fill, the secondary a white
// pill with a hairline. See DESIGN.md for why the shape differs from app chrome.
const primaryCtaClass =
  "inline-flex min-h-12 items-center justify-center rounded-pill bg-primary px-6 text-body font-medium text-primary-foreground transition-colors duration-fast hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const secondaryCtaClass =
  "inline-flex min-h-12 items-center justify-center rounded-pill border border-border bg-card px-6 text-body font-medium text-foreground transition-colors duration-fast hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export default function Welcome() {
  return (
    <section className="hero-mesh w-full">
      <div className="container mx-auto px-4 py-4xl md:py-section">
        <div className="mb-3xl flex flex-col items-center justify-center gap-lg text-center">
          {/* The uppercase Geist Mono eyebrow, labelling the band like a spec sheet. */}
          <p className="eyebrow">Why Choose VivanceData</p>
          <h2 className="text-display-xl text-foreground">
            Transforming Businesses Through{" "}
            <span className="text-brand">Intelligent Automation</span>
          </h2>
          <p className="mx-auto max-w-3xl text-body-lg text-muted-foreground">
            We combine cutting-edge AI technology with deep industry expertise to
            deliver solutions that drive real business outcomes.
          </p>
        </div>

        <div className="mb-3xl grid grid-cols-1 gap-lg md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon =
              featureIcons[feature.icon as keyof typeof featureIcons] ?? Brain;

            return (
              /* Level 0: hairline card, no shadow, no hover lift. */
              <article
                key={feature.title}
                className="flex h-full flex-col rounded-md border border-border bg-card p-lg transition-colors duration-default hover:border-brand/40"
              >
                <div className="mb-lg w-fit rounded-sm border border-border bg-muted p-3">
                  <Icon className="h-5 w-5 text-brand" aria-hidden="true" />
                </div>
                <h3 className="mb-sm text-heading-3 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-body-sm text-muted-foreground">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-xl flex flex-col items-center justify-center gap-md sm:flex-row">
          <a href="/services" className={primaryCtaClass}>
            <span>Explore Our Services</span>
            <ChevronRight className="ml-2 h-5 w-5" aria-hidden="true" />
          </a>
          <a href="/contact" className={secondaryCtaClass}>
            Schedule a Consultation
          </a>
        </div>
      </div>
    </section>
  );
}
