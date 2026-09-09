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
  /**
   * Overrides the section label for this card. One shared label across cards
   * whose links go to different places was the bug: two of these convert to
   * /contact and one navigates to a service page, and a single "Discuss scope"
   * described neither honestly.
   */
  ctaLabel?: string;
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
  ctaLabel = "Book a call"
}: ServicesCasesProps): React.ReactElement {
  const getCaseVisual = (category: string) => {
    const iconClass = "h-6 w-6 text-mute";

    switch (category) {
      case "Document Processing":
        return { icon: <FileText className={iconClass} aria-hidden="true" /> };
      case "Knowledge & Retrieval":
        return { icon: <Search className={iconClass} aria-hidden="true" /> };
      case "Workflow Automation":
        return { icon: <Workflow className={iconClass} aria-hidden="true" /> };
      default:
        return { icon: <Workflow className={iconClass} aria-hidden="true" /> };
    }
  };

  return (
    <section className="bg-muted/30 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="mb-4 font-display text-serif-lg">{title}</h2>
          <p className="max-w-[62ch] text-body-lg text-muted-foreground">
            {description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((caseItem) => {
            const visual = getCaseVisual(caseItem.category);
            return (
              <div key={caseItem.id} className="flex flex-col border border-rule bg-card">
                <div className="flex items-center justify-between gap-md border-b border-rule px-lg py-md">
                  {visual.icon}
                  <p className="text-label uppercase text-mute">{caseItem.impact}</p>
                </div>
                <div className="p-6">
                  <p className="mb-2 text-label uppercase text-mute">{caseItem.category}</p>
                  <h3 className="mb-3 font-display text-serif-sm">{caseItem.title}</h3>
                  <p className="text-muted-foreground mb-4">{caseItem.description}</p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={caseItem.link} className="inline-flex items-center">
                      {caseItem.ctaLabel ?? ctaLabel} <ArrowRight className="ml-2 h-4 w-4" />
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
