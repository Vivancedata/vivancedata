import Link from "next/link";
import {
  ArrowRight,
  ClipboardCheck,
  Code,
  FileSearch,
  LightbulbIcon,
  LineChart,
  Settings,
  Users,
} from "lucide-react";
import { processSteps } from "@/constants/process";

const iconMap = {
  fileSearch: FileSearch,
  lightbulb: LightbulbIcon,
  settings: Settings,
  code: Code,
  clipboardCheck: ClipboardCheck,
  users: Users,
  lineChart: LineChart,
} as const;

const stepCardClass =
  "h-full rounded-[calc(var(--radius)+0.25rem)] border border-border/70 bg-card/92 p-6 shadow-elevation-1 backdrop-blur-sm transition-transform transition-shadow duration-300 motion-reduce:transition-none motion-safe:hover:-translate-y-1 hover:shadow-elevation-2";

const ctaClass =
  "inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-elevation-1 transition-colors duration-200 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const Process = () => {
  return (
    <section
      className="w-full bg-muted/20 py-16 md:py-24"
      style={{ contentVisibility: "auto", containIntrinsicSize: "1200px" }}
    >
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary dark:bg-primary/20">
            Our Approach
          </div>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">How We Work</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Our proven methodology ensures successful AI implementation from initial concept to ongoing optimization and support.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 hidden h-full w-1 -translate-x-1/2 bg-primary/30 md:block" aria-hidden="true" />

          <ol className="relative space-y-12">
            {processSteps.map((step, index) => {
              const Icon = iconMap[step.iconType];

              return (
                <li
                  key={step.number}
                  className={`flex flex-col items-center md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                >
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"}`}>
                    <article className={stepCardClass}>
                      <div className={`mb-4 flex items-center ${index % 2 === 0 ? "justify-end" : "justify-start"}`}>
                        <div className="mr-4 rounded-full bg-primary/10 p-3 dark:bg-primary/20">
                          <Icon className="h-8 w-8 text-primary" aria-hidden="true" />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">
                            Step {step.number}
                          </div>
                          <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                        </div>
                      </div>
                      <p className="text-muted-foreground">{step.description}</p>
                    </article>
                  </div>

                  <div className="relative z-10 my-4 flex h-12 w-12 items-center justify-center rounded-full border-4 border-background bg-primary font-bold text-primary-foreground shadow-lg md:my-0">
                    {step.number}
                  </div>

                  <div className="w-full md:w-5/12" />
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-16 text-center">
          <p className="mx-auto mb-6 max-w-2xl text-lg text-foreground/80">
            Ready to transform your business with our AI solutions? Let&apos;s start the journey together.
          </p>
          <Link href="/contact" className={ctaClass}>
            <span>Schedule a Consultation</span>
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Process;
