import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export function CTASection({ 
  title, 
  description, 
  buttonText, 
  buttonLink 
}: CTASectionProps): React.ReactElement {
  return (
    <section className="w-full bg-blue-600 text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>
        <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
          {description}
        </p>
        <Button 
          size="lg" 
          className="bg-white text-blue-600 hover:bg-blue-50"
          asChild
        >
          <a href={buttonLink}>
            <span>{buttonText}</span>
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </Button>
      </div>
    </section>
  );
}
