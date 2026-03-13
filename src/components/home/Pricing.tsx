import Link from "next/link";
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

export default function Pricing() {
  return (
    <section
      className="relative overflow-hidden py-16 md:py-24"
    >
      <div className="absolute inset-x-0 -top-20 h-64 bg-primary/5 blur-3xl" aria-hidden="true" />
      <div className="container relative mx-auto px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-border/70 bg-card/80 px-4 py-1 text-sm font-medium text-foreground shadow-sm">
            Pricing Plans
          </div>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Transparent Pricing for Your AI Journey
          </h2>
          <p className="mt-4 text-muted-foreground">
            Engagements are structured around how much support your team needs, from strategic
            advisory through embedded delivery partnership.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {pricingTiers.map((tier) => (
            <Card
              key={tier.name}
              className={`relative flex h-full flex-col ${
                tier.popular
                  ? "border-primary shadow-[0_35px_80px_-50px_rgba(13,148,136,0.55)]"
                  : "border-border/70 shadow-[0_25px_60px_-45px_rgba(15,118,110,0.22)]"
              }`}
            >
              {tier.popular && (
                <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                  <Badge className="bg-primary px-3 py-1 text-primary-foreground">Most Popular</Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">{tier.name}</CardTitle>
                <CardDescription className="mt-2 text-base">{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <div className="rounded-2xl bg-muted/40 p-5">
                  <p className="text-3xl font-bold text-foreground">{tier.price.monthly}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Project cadence: {tier.price.annually}
                  </p>
                </div>

                <ul className="mt-6 space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature.name} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
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
                  <Link href="/contact">
                    <span>{tier.cta}</span>
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 grid gap-8 rounded-3xl border border-border/70 bg-card/90 p-8 shadow-lg md:grid-cols-2 md:p-12">
          <div>
            <h3 className="text-2xl font-bold text-foreground md:text-3xl">Need a Custom Solution?</h3>
            <p className="mt-4 text-muted-foreground">
              Every engagement is tailored around your data, workflows, and internal capacity. We
              can scope advisory, delivery, governance, or capability-building support to fit.
            </p>
            <ul className="mt-6 space-y-4">
              {[
                "Custom AI model development and evaluation",
                "Integration with existing software and data systems",
                "Flexible pricing aligned to scope and timeline",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" aria-hidden="true" />
                  <span className="text-foreground/85">{item}</span>
                </li>
              ))}
            </ul>
            <Button className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <Link href="/contact">
                <span>Schedule a Consultation</span>
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <div className="rounded-2xl bg-primary p-8 text-primary-foreground">
            <h4 className="text-xl font-bold">Delivery Confidence Guarantee</h4>
            <p className="mt-3 text-primary-foreground">
              We scope projects around measurable outcomes and explicit checkpoints, so your team
              always knows what success looks like before implementation begins.
            </p>
            <div className="mt-8 border-t border-primary-foreground/20 pt-6">
              <p className="text-primary-foreground">
                Have questions about pricing or want help choosing the right engagement model?
              </p>
              <Button
                className="mt-4 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                asChild
              >
                <Link href="/contact">Contact Our Team</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
