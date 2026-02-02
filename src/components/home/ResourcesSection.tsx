"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Download,
  FileText,
  BookOpen,
  BarChart2,
  FileCheck,
  Table2,
  CheckSquare,
} from "lucide-react";
import Link from "next/link";
import { AnimateOnScroll, StaggerContainer } from "@/hooks/useAnimateOnScroll";
import {
  featuredResources,
  ResourceType,
  getResourceTypeLabel,
  getResourceTypeBadgeClasses,
  getFormatBadgeClasses,
} from "@/constants/resources";

// Helper function to get the appropriate icon component based on resource type
const getResourceIcon = (type: ResourceType) => {
  switch (type) {
    case "whitepaper":
      return <FileText className="h-5 w-5" />;
    case "ebook":
      return <BookOpen className="h-5 w-5" />;
    case "report":
      return <BarChart2 className="h-5 w-5" />;
    case "guide":
      return <FileCheck className="h-5 w-5" />;
    case "spreadsheet":
      return <Table2 className="h-5 w-5" />;
    case "checklist":
      return <CheckSquare className="h-5 w-5" />;
    default:
      return <FileText className="h-5 w-5" />;
  }
};

// Helper function to get icon for the card display
const getResourceCardIcon = (type: ResourceType) => {
  switch (type) {
    case "whitepaper":
      return <FileText className="h-8 w-8" />;
    case "ebook":
      return <BookOpen className="h-8 w-8" />;
    case "report":
      return <BarChart2 className="h-8 w-8" />;
    case "guide":
      return <FileCheck className="h-8 w-8" />;
    case "spreadsheet":
      return <Table2 className="h-8 w-8" />;
    case "checklist":
      return <CheckSquare className="h-8 w-8" />;
    default:
      return <FileText className="h-8 w-8" />;
  }
};

const ResourcesSection = () => {
  return (
    <section className="w-full py-20 md:py-32 overflow-hidden bg-gradient-to-b from-muted/50 to-background">
      <div className="container mx-auto px-4 relative">
        {/* Background elements */}
        <div className="absolute top-40 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-20 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl -z-10" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16">
          <AnimateOnScroll variant="fadeInUp">
            <div className="inline-block rounded-full bg-primary/10 dark:bg-primary/20 px-3 py-1 text-sm font-medium text-primary mb-4">
              Free Resources
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Learn From Our Experts
            </h2>
            <p className="text-muted-foreground max-w-2xl text-lg">
              Access our collection of free guides, whitepapers, and tools to
              accelerate your AI journey and make informed decisions.
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll
            variant="fadeInLeft"
            delay={0.2}
            className="mt-6 md:mt-0"
          >
            <Link href="/resources">
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 group transition-all duration-300 px-6 py-6 h-auto"
              >
                <span>View All Resources</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </AnimateOnScroll>
        </div>

        <StaggerContainer
          staggerDelay={0.1}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {featuredResources.map((resource) => (
            <Card
              key={resource.id}
              className="overflow-hidden border border-border bg-card/90 dark:bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-500 rounded-xl group flex flex-col"
            >
              {/* Icon Header */}
              <div className="relative h-32 w-full overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
                <div className="text-primary/80 dark:text-primary group-hover:scale-110 transition-transform duration-500">
                  {getResourceCardIcon(resource.type)}
                </div>

                {/* Resource Type Badge */}
                <div className="absolute top-3 left-3">
                  <Badge
                    className={`${getResourceTypeBadgeClasses(resource.type)} border-0 px-2.5 py-1 text-xs font-medium flex items-center gap-1.5`}
                  >
                    {getResourceIcon(resource.type)}
                    {getResourceTypeLabel(resource.type)}
                  </Badge>
                </div>

                {/* Format Badge */}
                <div className="absolute top-3 right-3">
                  <Badge
                    className={`${getFormatBadgeClasses(resource.format)} border-0 px-2 py-1 text-xs font-semibold`}
                  >
                    {resource.format}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-2 flex-grow-0">
                <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                  {resource.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="pb-4 flex-grow">
                <CardDescription className="text-sm text-muted-foreground line-clamp-3">
                  {resource.description}
                </CardDescription>
              </CardContent>

              <CardFooter className="pt-0 mt-auto">
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-md shadow-primary/10 group/btn transition-all duration-300"
                >
                  <Link href={resource.downloadUrl}>
                    <Download className="mr-2 h-4 w-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5" />
                    Get Free Download
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </StaggerContainer>

        {/* Bottom CTA */}
        <AnimateOnScroll variant="fadeInUp" delay={0.4} className="mt-16">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 rounded-2xl p-8 md:p-12 border border-border/50">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Need Custom Research?
                </h3>
                <p className="text-muted-foreground text-lg">
                  Our team can create tailored reports and analysis for your
                  specific industry and use case.
                </p>
              </div>
              <Link href="/contact?inquiry=custom-research">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-lg shadow-primary/20 px-8 py-6 h-auto text-lg rounded-xl group transition-all duration-300"
                >
                  <span>Request Custom Report</span>
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default ResourcesSection;
