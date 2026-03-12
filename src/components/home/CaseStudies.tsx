import Link from "next/link";
import {
  ArrowRight,
  Brain,
  ChevronRight,
  Database,
  LineChart,
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

const industryVisuals: Record<string, typeof Database> = {
  Retail: Database,
  Healthcare: Brain,
  Finance: LineChart,
  "E-commerce": MessageSquare,
};

export default function CaseStudies() {
  return (
    <section
      className="w-full overflow-hidden bg-muted/20 py-20 md:py-32"
      style={{ contentVisibility: "auto", containIntrinsicSize: "1600px" }}
    >
      <div className="container relative mx-auto px-4">
        <div className="absolute left-0 top-40 -z-10 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-20 right-0 -z-10 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />

        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
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
            const IndustryIcon = industryVisuals[study.industry] ?? Database;

            return (
              <Card
                key={study.id}
                className="overflow-hidden border-0 bg-card/95 shadow-2xl"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="p-8 md:p-10">
                    <CardHeader className="mb-8 p-0">
                      <div className="mb-6">
                        <Badge className="mb-3 bg-primary/10 px-3 py-1 text-primary hover:bg-primary/10">
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
                        <h3 className="mb-3 text-xl font-bold text-primary">Challenge</h3>
                        <CardDescription className="text-base text-muted-foreground">
                          {study.challenge}
                        </CardDescription>
                      </div>

                      <div>
                        <h3 className="mb-3 text-xl font-bold text-primary">Solution</h3>
                        <CardDescription className="text-base text-muted-foreground">
                          {study.solution}
                        </CardDescription>
                      </div>

                      <div>
                        <h3 className="mb-3 text-xl font-bold text-primary">Results</h3>
                        <ul className="space-y-3">
                          {study.results.map((result) => (
                            <li key={`${study.id}-result-${result}`} className="flex items-start">
                              <div className="mr-3 mt-1 rounded-full bg-green-100 p-1 shadow-sm dark:bg-green-900/30">
                                <svg
                                  className="h-4 w-4 text-green-600 dark:text-green-400"
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
                        <h3 className="mb-3 text-xl font-bold text-primary">Technologies Used</h3>
                        <div className="flex flex-wrap gap-2">
                          {study.technologies.map((tech) => (
                            <Badge
                              key={`${study.id}-tech-${tech}`}
                              variant="outline"
                              className="border-primary/20 bg-primary/5 px-3 py-1 text-sm text-primary"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="mt-10 p-0">
                      <Button className="rounded-xl px-8 py-6 text-lg" asChild>
                        <Link href="/case-studies">
                          <span>Read Full Case Study</span>
                          <ChevronRight className="ml-2 h-5 w-5" aria-hidden="true" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </div>

                  <div className="relative flex min-h-80 items-end overflow-hidden bg-primary p-8 text-primary-foreground">
                    <div
                      className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage:
                          'url("data:image/svg+xml,%3Csvg width=\\"100\\" height=\\"100\\" viewBox=\\"0 0 100 100\\" xmlns=\\"http://www.w3.org/2000/svg\\"%3E%3Cpath d=\\"M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\\" fill=\\"%23000000\\" fill-opacity=\\"0.18\\" fill-rule=\\"evenodd\\"/%3E%3C/svg%3E")',
                      }}
                    />
                    <div className="relative flex items-center space-x-4">
                      <div className="rounded-full bg-primary-foreground p-3 shadow-lg">
                        <IndustryIcon className="h-7 w-7 text-primary" aria-hidden="true" />
                      </div>
                      <div className="text-primary-foreground">
                        <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-foreground/15">
                          <StudyIcon className="h-8 w-8" aria-hidden="true" />
                        </div>
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
          <Button variant="outline" className="h-auto border-primary px-6 py-6 text-primary hover:bg-primary/10" asChild>
            <Link href="/case-studies">
              <span>View All Case Studies</span>
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
