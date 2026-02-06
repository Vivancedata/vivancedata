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
    <section className="w-full py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5" aria-hidden="true" />
      <div className="absolute -top-20 right-10 h-56 w-56 rounded-full bg-primary/20 blur-[120px]" aria-hidden="true" />
      <div className="absolute -bottom-20 left-10 h-56 w-56 rounded-full bg-accent/20 blur-[120px]" aria-hidden="true" />
      <div className="container mx-auto px-4 text-center relative">
        <div className="glass-panel px-8 py-12 md:px-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            {description}
          </p>
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            asChild
          >
            <a href={buttonLink}>
              <span>{buttonText}</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
