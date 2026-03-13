import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Clock, DollarSign, Quote, StarIcon, TrendingUp, Zap } from "lucide-react";
import { testimonials, type TestimonialMetrics } from "@/constants/testimonials";

const metricDefinitions = [
  {
    key: "percentImprovement",
    icon: TrendingUp,
    colorClass: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  },
  {
    key: "hoursSaved",
    icon: Clock,
    colorClass: "bg-primary/10 text-primary dark:bg-primary/20",
  },
  {
    key: "costReduction",
    icon: DollarSign,
    colorClass: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  },
  {
    key: "speedIncrease",
    icon: Zap,
    colorClass: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
  },
] as const;

function MetricsDisplay({ metrics }: { metrics: TestimonialMetrics }) {
  const activeMetrics = metricDefinitions.filter(
    ({ key }) => metrics[key as keyof TestimonialMetrics]
  );

  return (
    <ul className="mb-4 flex flex-wrap gap-2" aria-label="Key results achieved">
      {activeMetrics.map(({ key, icon: Icon, colorClass }) => {
        const value = metrics[key as keyof TestimonialMetrics];
        if (!value) {
          return null;
        }

        return (
          <li
            key={key}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold ${colorClass}`}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{value}</span>
          </li>
        );
      })}
    </ul>
  );
}

export default function Testimonials() {
  return (
    <section
      className="w-full overflow-hidden bg-muted/20 py-20 md:py-32"
      style={{ contentVisibility: "auto", containIntrinsicSize: "1400px" }}
    >
      <div className="container relative mx-auto px-4">
        <div className="absolute right-0 top-0 -z-10 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 -z-10 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />

        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            Client Success Stories
          </div>
          <h2 className="text-3xl font-bold text-foreground md:text-5xl">What Our Clients Say</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Feedback from recent delivery engagements focused on execution quality, adoption, and
            measurable outcomes.
          </p>
          <p className="mt-3 text-sm text-muted-foreground/90">
            Testimonials are anonymized to respect client confidentiality.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <Card
              key={`${testimonial.name}-${testimonial.role}`}
              className="h-full border-0 bg-card/90 shadow-xl"
            >
              <CardContent className="relative flex h-full flex-col p-8">
                <Quote className="absolute right-4 top-4 h-12 w-12 text-primary/10" aria-hidden="true" />
                <div className="mb-6 flex items-center">
                  <Avatar className="mr-4 h-14 w-14 border-2 border-primary/20 shadow-md">
                    <AvatarFallback className="bg-primary text-xl font-semibold text-primary-foreground">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-lg font-bold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>

                <div
                  className="mb-4 flex"
                  role="img"
                  aria-label={`${testimonial.rating} out of 5 stars`}
                >
                  {Array.from({ length: testimonial.rating }, (_, starIndex) => (
                    <StarIcon
                      key={`${testimonial.name}-star-${starIndex + 1}`}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <MetricsDisplay metrics={testimonial.metrics} />

                <blockquote className="mb-6 flex-grow italic leading-relaxed text-muted-foreground">
                  &quot;{testimonial.text}&quot;
                </blockquote>

                <div className="mt-auto border-t border-border pt-4">
                  <p className="text-sm font-medium text-primary">{testimonial.company}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/case-studies"
            className="inline-flex items-center rounded-md font-medium text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <span>View all case studies</span>
            <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
