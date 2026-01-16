import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Case {
  id: string;
  title: string;
  category: string;
  description: string;
  imageSrc: string;
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
  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((caseItem) => (
            <div key={caseItem.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48 w-full">
                <Image
                  src={caseItem.imageSrc}
                  alt={`${caseItem.title} - ${caseItem.category} case study`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <div className="text-sm font-medium text-blue-600 mb-2">{caseItem.category}</div>
                <h3 className="text-xl font-bold mb-3">{caseItem.title}</h3>
                <p className="text-gray-700 mb-4">{caseItem.description}</p>
                <Button variant="outline" size="sm" asChild>
                  <a href={caseItem.link} className="inline-flex items-center">
                    Read more <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
