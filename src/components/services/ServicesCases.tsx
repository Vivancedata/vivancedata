import React from "react";
import Link from "next/link";
import { ArrowRight, FileText, Search, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Case {
  id: string;
  title: string;
  category: string;
  description: string;
  impact: string;
  link: string;
}

interface ServicesCasesProps {
  title: string;
  description: string;
  cases: Case[];
  ctaLabel?: string;
}

export function ServicesCases({
  title,
  description,
  cases,
  ctaLabel = "Learn more"
}: ServicesCasesProps): React.ReactElement {
  const getCaseVisual = (category: string) => {
    const gradient = "from-primary to-primary/85";
    const iconClass = "h-7 w-7 text-primary-foreground/90";

    switch (category) {
      case "Document Processing":
        return { icon: <FileText className={iconClass} aria-hidden="true" />, gradient };
      case "Knowledge & Retrieval":
        return { icon: <Search className={iconClass} aria-hidden="true" />, gradient };
      case "Workflow Automation":
        return { icon: <Workflow className={iconClass} aria-hidden="true" />, gradient };
      default:
        return { icon: <Workflow className={iconClass} aria-hidden="true" />, gradient };
    }
  };

  return (
    <section className="bg-muted/30 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-display mb-4">{title}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((caseItem) => {
            const visual = getCaseVisual(caseItem.category);
            return (
              <div key={caseItem.id} className="bg-card rounded-lg overflow-hidden border border-border/60">
                <div className={`h-44 w-full bg-gradient-to-br ${visual.gradient} p-6 flex flex-col justify-between`}>
                  {visual.icon}
                  <p className="text-sm font-medium text-primary-foreground/90">{caseItem.impact}</p>
                </div>
                <div className="p-6">
                  <div className="text-sm font-medium text-brand mb-2">{caseItem.category}</div>
                  <h3 className="text-heading-3 mb-3">{caseItem.title}</h3>
                  <p className="text-muted-foreground mb-4">{caseItem.description}</p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={caseItem.link} className="inline-flex items-center">
                      {ctaLabel} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
