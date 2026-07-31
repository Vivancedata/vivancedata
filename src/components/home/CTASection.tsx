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
    <section className="relative w-full border-t border-border py-4xl">
      <div className="container mx-auto px-4 text-center">
        <div className="px-8 py-12 md:px-16">
          <h2 className="text-display mb-6">{title}</h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            {description}
          </p>
          {/* End-of-page marketing CTA: a pill, per the button-shape split. */}
          <Button size="lg" shape="pill" asChild>
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
