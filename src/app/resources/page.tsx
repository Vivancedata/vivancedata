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
  title: "Resources - VivanceData",
  description: "Explore our AI resources including blog articles, ROI calculator, AI readiness assessment, innovation hub, and responsible AI guidelines.",
  keywords: ["AI resources", "AI tools", "ROI calculator", "AI readiness", "AI blog", "responsible AI"],
  openGraph: {
    title: "Resources - VivanceData",
    description: "Explore our AI resources including tools, calculators, and educational content.",
    type: "website",
    url: "https://vivancedata.com/resources",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resources - VivanceData",
    description: "Explore our AI resources including tools, calculators, and educational content.",
  },
};

const resources = [
  {
    title: "Blog",
    description: "Practical writing on AI implementation, plus free tools for sizing a project before you commit budget to it.",
    href: "/blog",
    icon: BookOpen,
    color: "bg-brand",
  },
  {
    title: "ROI Calculator",
    description: "Calculate the potential return on investment for your AI initiatives. Get data-driven insights to build your business case.",
    href: "/tools/roi-calculator",
    icon: Calculator,
    color: "bg-brand",
  },
  {
    title: "AI Readiness Assessment",
    description: "Evaluate your organization's readiness for AI adoption. Identify gaps and get recommendations for your AI journey.",
    href: "/tools/ai-readiness",
    icon: ClipboardCheck,
    color: "bg-brand",
  },
  {
    title: "Innovation Hub",
    description: "Discover cutting-edge AI innovations and explore how emerging technologies can transform your business operations.",
    href: "/innovation-hub",
    icon: Lightbulb,
    color: "bg-brand",
  },
  {
    title: "Responsible AI",
    description: "Learn about our commitment to ethical AI practices, including fairness, transparency, and accountability in AI systems.",
    href: "/responsible-ai",
    icon: Shield,
    color: "bg-brand",
  },
];

export default function ResourcesPage() {
  return (
    <main className="py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h1 className="text-display text-foreground">
            Resources
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Explore our collection of tools, guides, and insights to help you navigate your AI journey.
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
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${resource.color} text-brand-foreground mb-4`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="text-heading-3 text-foreground mb-2">
                  {resource.title}
                </h2>
                <p className="text-muted-foreground flex-grow">
                  {resource.description}
                </p>
                <div className="mt-4 flex items-center text-sm font-medium text-brand dark:text-brand group-hover:text-brand/80">
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
