import {
  ArrowRight,
  BarChart2,
  BookOpen,
  CheckSquare,
  Download,
  FileCheck,
  FileText,
  Table2,
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
import {
  featuredResources,
  type ResourceType,
  getFormatBadgeClasses,
  getResourceTypeBadgeClasses,
  getResourceTypeLabel,
} from "@/constants/resources";

const resourceIcons: Record<ResourceType, typeof FileText> = {
  whitepaper: FileText,
  ebook: BookOpen,
  report: BarChart2,
  guide: FileCheck,
  spreadsheet: Table2,
  checklist: CheckSquare,
};

export default function ResourcesSection() {
  return (
    <section
      className="w-full overflow-hidden bg-muted/20 py-20 md:py-32"
    >
      <div className="container relative mx-auto px-4">
        <div className="absolute right-0 top-40 -z-10 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-20 left-0 -z-10 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />

        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              Free Resources
            </div>
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-5xl">Learn From Our Experts</h2>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Access practical guides, templates, and reference material that help teams make
              better decisions about AI adoption and delivery.
            </p>
          </div>
          <Button
            variant="outline"
            className="h-auto border-primary px-6 py-6 text-primary transition-all duration-300 hover:bg-primary/10"
            asChild
          >
            <a href="/resources">
              <span>View All Resources</span>
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {featuredResources.map((resource) => {
            const Icon = resourceIcons[resource.type];

            return (
              <Card
                key={resource.id}
                className="group flex h-full flex-col overflow-hidden border border-border bg-card/95 shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative flex h-32 items-center justify-center overflow-hidden bg-primary/10">
                  <div className="absolute inset-0 bg-background/20" aria-hidden="true" />
                  <div className="text-primary/85">
                    <Icon className="h-8 w-8" aria-hidden="true" />
                  </div>

                  <div className="absolute left-3 top-3">
                    <Badge
                      className={`${getResourceTypeBadgeClasses(resource.type)} flex items-center gap-1.5 border-0 px-2.5 py-1 text-xs font-medium`}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      {getResourceTypeLabel(resource.type)}
                    </Badge>
                  </div>

                  <div className="absolute right-3 top-3">
                    <Badge
                      className={`${getFormatBadgeClasses(resource.format)} border-0 px-2 py-1 text-xs font-semibold`}
                    >
                      {resource.format}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-2">
                  <CardTitle className="line-clamp-2 text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                    {resource.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-grow pb-4">
                  <CardDescription className="line-clamp-3 text-sm text-muted-foreground">
                    {resource.description}
                  </CardDescription>
                </CardContent>

                <CardFooter className="mt-auto pt-0">
                  <Button className="w-full" asChild>
                    <a href={resource.downloadUrl}>
                      <Download className="mr-2 h-4 w-4" aria-hidden="true" />
                      <span>Get Free Download</span>
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 rounded-2xl border border-border/50 bg-primary/10 p-8 md:p-12">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="text-center md:text-left">
              <h3 className="mb-2 text-2xl font-bold text-foreground md:text-3xl">Need Custom Research?</h3>
              <p className="text-lg text-muted-foreground">
                We can create tailored reports and benchmarking material around your specific
                industry, workflow, or AI delivery challenge.
              </p>
            </div>
            <Button size="lg" className="h-auto rounded-xl px-8 py-6 text-lg" asChild>
              <a href="/contact?inquiry=custom-research">
                <span>Request Custom Report</span>
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
