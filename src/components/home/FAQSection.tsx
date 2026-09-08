import React from "react";
import FAQ from "@/components/common/Question";

interface FAQSectionProps {
  title: string;
  description: string;
}

export function FAQSection({ 
  title, 
  description 
}: FAQSectionProps): React.ReactElement {
  return (
    <section
      className="container mx-auto py-16 px-4 md:py-24"
    >
      <div className="text-center mb-12">
        <h2 className="mb-4 font-display text-serif-lg">{title}</h2>
        <p className="max-w-[58ch] text-muted-foreground">{description}</p>
      </div>
      <div className="max-w-[72ch]">
        <FAQ />
      </div>
    </section>
  );
}
