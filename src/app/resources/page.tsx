import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import {
  BookOpen,
  Calculator,
  ClipboardCheck,
  Lightbulb,
  Shield,
  ArrowRight
} from "lucide-react";

export const metadata: Metadata = {
  title: "Resources - Vivancedata",
  description: "The free things on this site: notes from the work, an ROI calculator, a readiness assessment, what I am testing, and how I handle the risky parts.",
  keywords: ["AI resources", "AI tools", "ROI calculator", "AI readiness", "AI blog", "responsible AI"],
  openGraph: {
    title: "Resources - Vivancedata",
    description: "Notes from the work, an ROI calculator, a readiness assessment, and how I handle the parts that can go wrong.",
    type: "website",
    url: "https://vivancedata.com/resources",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resources - Vivancedata",
    description: "Notes from the work, an ROI calculator, a readiness assessment, and how I handle the parts that can go wrong.",
  },
};

const resources = [
  {
    title: "Blog",
    description: "What happens when a model meets real paperwork, real calls and real crews, including the parts that do not work.",
    href: "/blog",
    icon: BookOpen,
  },
  {
    title: "ROI Calculator",
    description: "Put your own numbers in and see what a build would cost, what it might save, and how long before it pays back.",
    href: "/tools/roi-calculator",
    icon: Calculator,
  },
  {
    title: "AI Readiness Assessment",
    description: "Twenty questions about your records, your systems and your people, and a straight read on whether you are ready yet.",
    href: "/tools/ai-readiness",
    icon: ClipboardCheck,
  },
  {
    title: "Innovation Hub",
    description: "What I am testing before it goes near a job someone depends on, and what I am watching but would not build on yet.",
    href: "/innovation-hub",
    icon: Lightbulb,
  },
  {
    title: "Responsible AI",
    description: "How the parts that can go wrong get handled: what the system decides alone, what waits for a person, and what gets written down.",
    href: "/responsible-ai",
    icon: Shield,
  },
];

export default function ResourcesPage() {
  return (
    <main className="py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h1 className="max-w-[17ch] font-display text-serif-xl text-foreground">
            Resources
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            The free things. Two tools for sizing a project before you commit budget to it, and
            notes from the work for everything else.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => {
            const Icon = resource.icon;
            return (
              <Link
                key={resource.href}
                href={resource.href}
                className="group relative flex flex-col rounded-md border border-border bg-card p-8 transition-colors hover:border-brand/40"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center border border-rule text-mute">
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="mb-2 font-display text-serif-sm text-foreground">
                  {resource.title}
                </h2>
                <p className="text-muted-foreground flex-grow">
                  {resource.description}
                </p>
                <div className="mt-4 flex items-center text-label uppercase text-mute transition-colors group-hover:text-foreground">
                  Explore
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </main>
  );
}
