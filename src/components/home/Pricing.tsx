import { ArrowRight, Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { pricingTiers } from "@/constants/pricing";

interface PricingProps {
  /**
   * The /pricing page supplies its own page-level heading, so the section
   * header is suppressed there to avoid stacking two titles on one screen.
   */
  showHeader?: boolean;
}

export default function Pricing({ showHeader = true }: PricingProps) {
  return (
    <section
      className="relative overflow-hidden py-16 md:py-24"
    >
      <div className="container relative mx-auto px-4">
        {showHeader && (
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center rounded-full border border-border/70 bg-card/80 px-4 py-1 text-sm font-medium text-foreground">
              Pricing Plans
            </div>
            <h2 className="text-display text-foreground">
              What an engagement costs
            </h2>
            <p className="mt-4 text-muted-foreground">
              A build has two costs: getting it working, and keeping it working. Both are listed
              below, and every figure is a starting point rather than a quote.
            </p>
          </div>
        )}

        <div className="grid gap-8 md:grid-cols-3">
          {pricingTiers.map((tier) => (
            <Card
              key={tier.name}
              className={`relative flex h-full flex-col ${
                tier.popular
                  ? "border-brand shadow-[0_35px_80px_-50px_rgba(13,148,136,0.55)]"
                  : "border-border/70 shadow-[0_25px_60px_-45px_rgba(15,118,110,0.22)]"
              }`}
            >
              {tier.popular && (
                <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                  <Badge className="bg-primary px-3 py-1 text-primary-foreground">Most Popular</Badge>
                </div>
              )}
              <CardHeader>
                {/* h3 under the section's own h2 on the homepage; h2 on /pricing,
                    which renders this band headerless under the page h1. */}
                <CardTitle as={showHeader ? "h3" : "h2"} className="text-2xl text-foreground">
                  {tier.name}
                </CardTitle>
                <CardDescription className="mt-2 text-base">{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <div className="rounded-2xl bg-muted/40 p-5">
                  <p className="text-2xl font-bold text-foreground">{tier.price.setup}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{tier.price.ongoing}</p>
                </div>

                <ul className="mt-6 space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature.name} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden="true" />
                      ) : (
                        <X className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground/60" aria-hidden="true" />
                      )}
                      <div>
                        <p className={feature.included ? "text-foreground/85" : "text-muted-foreground/75"}>
                          {feature.name}
                        </p>
                        {feature.tooltip ? (
                          <p className="mt-1 text-xs text-muted-foreground">{feature.tooltip}</p>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-2">
                <Button
                  className={tier.popular ? "w-full bg-primary text-primary-foreground hover:bg-primary/90" : "w-full"}
                  variant={tier.popular ? "default" : "outline"}
                  asChild
                >
                  <a href="/contact">
                    <span>{tier.cta}</span>
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* The "Delivery Confidence Guarantee" panel that sat beside this was a
            promise with nothing behind it (no SLA, no refund terms); the fixed
            price in writing is the real commitment, so that is what is said. */}
        <div className="mx-auto mt-16 max-w-3xl rounded-3xl border border-border/70 bg-card/90 p-8 shadow-lg md:p-12">
          <div>
            <h3 className="text-heading-1 text-foreground">Does not fit one of these?</h3>
            <p className="mt-4 text-muted-foreground">
              Every build is scoped around the systems you already run and how much of it you
              want to run yourself. Tell me what is going wrong and I will come back with a scope
              and a fixed price in writing.
            </p>
            <ul className="mt-6 space-y-4">
              {[
                "Works with the dispatch, accounting and phone systems you already have",
                "Handover-only if you would rather run it without me",
                "A fixed price in writing before anything starts",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" aria-hidden="true" />
                  <span className="text-foreground/85">{item}</span>
                </li>
              ))}
            </ul>
            <Button className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <a href="/contact">
                <span>Book a call</span>
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
