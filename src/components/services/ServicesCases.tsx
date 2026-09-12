import React from "react";
import Link from "next/link";
import { FileText, Search, Workflow } from "lucide-react";
import { ArrowMark } from "@/components/common/Marks";
import { ctaSecondary } from "@/components/common/controls";

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
    <section className="bleed border-t border-rule py-3xl md:py-4xl">
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
                {/* flex-1 + mt-auto so the three actions sit on one line
                  * regardless of how long each description runs. */}
                <div className="flex flex-1 flex-col p-6">
                  <p className="mb-2 text-label uppercase text-mute">{caseItem.category}</p>
                  <h3 className="mb-3 font-display text-serif-sm">{caseItem.title}</h3>
                  <p className="mb-lg text-body-sm text-muted-foreground">{caseItem.description}</p>
                  <Link href={caseItem.link} className={`${ctaSecondary} mt-auto self-start`}>
                    <span>{caseItem.ctaLabel ?? ctaLabel}</span>
                    <ArrowMark />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
