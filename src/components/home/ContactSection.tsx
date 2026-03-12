import React from "react";
import dynamic from "next/dynamic";
import { CheckCircle } from "lucide-react";

const ProfileForm = dynamic(
  () => import("@/components/contact/Form").then((module) => module.ProfileForm),
  {
    loading: () => (
      <div
        className="min-h-[540px] rounded-[calc(var(--radius)+0.25rem)] border border-border/60 bg-card/80 shadow-lg"
        aria-hidden="true"
      />
    ),
  }
);

interface Benefit {
  title: string;
  description: string;
}

interface ContactSectionProps {
  title: string;
  description: string;
  benefits: Benefit[];
}

export function ContactSection({ 
  title, 
  description, 
  benefits 
}: ContactSectionProps): React.ReactElement {
  return (
    <section className="container mx-auto py-16 px-4 md:py-24 bg-muted/30">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
            Get In Touch
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-muted-foreground mb-6">
            {description}
          </p>
          <div className="space-y-6">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-2 mt-1">
                  <CheckCircle className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <ProfileForm />
        </div>
      </div>
    </section>
  );
}
