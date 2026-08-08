import {
  ArrowRight,
  Brain,
  ChevronRight,
  Database,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
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
import { caseStudies, type IconType } from "@/constants/caseStudies";

const iconMap: Record<IconType, typeof Database> = {
  database: Database,
  brain: Brain,
  "shield-check": ShieldCheck,
  "message-square": MessageSquare,
};

export default function CaseStudies() {
  return (
    <section
      className="w-full overflow-hidden bg-muted/20 py-20 md:py-32"
    >
      <div className="container relative mx-auto px-4">
        <div className="absolute left-0 top-40 -z-10 h-96 w-96 rounded-full bg-muted blur-3xl" />
        <div className="absolute bottom-20 right-0 -z-10 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />

        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-block rounded-full bg-muted px-3 py-1 text-sm font-medium text-brand">
            Success Stories
          </div>
          <h2 className="mb-6 text-3xl font-bold text-foreground md:text-5xl">Case Studies</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Representative engagement patterns across industries, showing common challenges,
            solution approaches, and delivery outcomes.
          </p>
          <p className="mt-3 text-sm text-muted-foreground/90">
            Examples are anonymized and generalized to protect client confidentiality.
          </p>
        </div>

        <div className="grid gap-8 xl:grid-cols-2">
          {caseStudies.map((study) => {
            const StudyIcon = iconMap[study.iconType];

            return (
              <Card
                key={study.id}
                className="overflow-hidden border-0 bg-card/95 shadow-2xl"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="p-8 md:p-10">
                    <CardHeader className="mb-8 p-0">
                      <div className="mb-6">
                        <Badge className="mb-3 bg-muted px-3 py-1 text-brand hover:bg-muted">
                          {study.industry}
                        </Badge>
                        <CardTitle className="text-3xl font-bold text-foreground md:text-4xl">
                          {study.title}
                        </CardTitle>
                        <p className="mt-2 text-lg text-muted-foreground">Client: {study.client}</p>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-8 p-0">
                      <div>
                        <h3 className="mb-3 text-xl font-bold text-brand">Challenge</h3>
                        <CardDescription className="text-base text-muted-foreground">
                          {study.challenge}
                        </CardDescription>
                      </div>

                      <div>
                        <h3 className="mb-3 text-xl font-bold text-brand">Solution</h3>
                        <CardDescription className="text-base text-muted-foreground">
                          {study.solution}
                        </CardDescription>
                      </div>

                      <div>
                        <h3 className="mb-3 text-xl font-bold text-brand">Results</h3>
                        <ul className="space-y-3">
                          {study.results.map((result) => (
                            <li key={`${study.id}-result-${result}`} className="flex items-start">
                              <div className="mr-3 mt-1 rounded-full bg-success/10 p-1">
                                <svg
                                  className="h-4 w-4 text-brand"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  aria-hidden="true"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <span className="text-lg text-foreground/80">{result}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="mb-3 text-xl font-bold text-brand">Technologies Used</h3>
                        <div className="flex flex-wrap gap-2">
                          {study.technologies.map((tech) => (
                            <Badge
                              key={`${study.id}-tech-${tech}`}
                              variant="outline"
                              className="border-brand/20 bg-muted px-3 py-1 text-sm text-brand"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="mt-10 p-0">
                      <Button className="rounded-xl px-8 py-6 text-lg" asChild>
                        <a href="/case-studies">
                          <span>Read Full Case Study</span>
                          <ChevronRight className="ml-2 h-5 w-5" aria-hidden="true" />
                        </a>
                      </Button>
                    </CardFooter>
                  </div>

                  {/* Ink band: spec-sheet mono label up top, watermark icon, and
                      the engagement identity at the base. The old dot texture was
                      black-on-black (fill #000 over bg-primary) — an invisible
                      pattern that left the panel reading as an empty void. */}
                  <div className="relative flex min-h-80 flex-col justify-between overflow-hidden bg-primary p-8 text-primary-foreground">
                    <StudyIcon
                      className="absolute -bottom-12 -right-12 h-64 w-64 text-primary-foreground/[0.07]"
                      aria-hidden="true"
                    />
                    <p className="relative font-mono text-xs uppercase tracking-[0.2em] text-primary-foreground/60">
                      {`// ${study.industry} engagement`}
                    </p>
                    <div className="relative flex items-center gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary-foreground/15">
                        <StudyIcon className="h-8 w-8" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-xl font-bold">{study.industry} Solution</p>
                        <p className="text-sm text-primary-foreground/85">Powered by VivanceData AI</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <Button variant="outline" className="h-auto border-brand px-6 py-6 text-brand hover:bg-muted" asChild>
            <a href="/case-studies">
              <span>View All Case Studies</span>
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
