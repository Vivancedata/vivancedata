import React from "react";
import Link from "next/link";
import { ArrowRight, Building2, HeartPulse, ShoppingCart } from "lucide-react";
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
}

export function ServicesCases({ 
  title, 
  description, 
  cases 
}: ServicesCasesProps): React.ReactElement {
  const getCaseVisual = (category: string) => {
    switch (category) {
      case "Software Development":
        return {
          icon: <Building2 className="h-7 w-7 text-white/90" aria-hidden="true" />,
          gradient: "from-sky-700 to-blue-600",
        };
      case "AI Engineering":
        return {
          icon: <HeartPulse className="h-7 w-7 text-white/90" aria-hidden="true" />,
          gradient: "from-emerald-700 to-teal-600",
        };
      case "Machine Learning":
        return {
          icon: <ShoppingCart className="h-7 w-7 text-white/90" aria-hidden="true" />,
          gradient: "from-violet-700 to-indigo-600",
        };
      default:
        return {
          icon: <Building2 className="h-7 w-7 text-white/90" aria-hidden="true" />,
          gradient: "from-slate-700 to-slate-600",
        };
    }
  };

  return (
    <section className="bg-muted/30 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((caseItem) => {
            const visual = getCaseVisual(caseItem.category);
            return (
              <div key={caseItem.id} className="bg-card rounded-lg shadow-md overflow-hidden border border-border/60">
                <div className={`h-44 w-full bg-gradient-to-br ${visual.gradient} p-6 flex flex-col justify-between`}>
                  {visual.icon}
                  <p className="text-sm font-medium text-white/90">{caseItem.impact}</p>
                </div>
                <div className="p-6">
                  <div className="text-sm font-medium text-primary mb-2">{caseItem.category}</div>
                  <h3 className="text-xl font-bold mb-3">{caseItem.title}</h3>
                  <p className="text-muted-foreground mb-4">{caseItem.description}</p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={caseItem.link} className="inline-flex items-center">
                      Read Case Study <ArrowRight className="ml-2 h-4 w-4" />
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
