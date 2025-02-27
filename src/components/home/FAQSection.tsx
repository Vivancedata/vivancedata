import React from "react";
import FAQ from "@/components/common/question";

interface FAQSectionProps {
  title: string;
  description: string;
}

export function FAQSection({ 
  title, 
  description 
}: FAQSectionProps): React.ReactElement {
  return (
    <section className="container mx-auto py-16 px-4 md:py-24">
      <div className="text-center mb-12">
        <div className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 mb-4">
          Frequently Asked Questions
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
      </div>
      <div className="max-w-3xl mx-auto">
        <FAQ />
      </div>
    </section>
  );
}
