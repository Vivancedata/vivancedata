import React from "react";
import { CheckCircle } from "lucide-react";
import { ProfileForm } from "@/components/contact/Form";

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
    <section className="container mx-auto py-16 px-4 md:py-24 bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <div className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 mb-4">
            Get In Touch
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-gray-600 mb-6">
            {description}
          </p>
          <div className="space-y-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="rounded-full bg-blue-100 p-2 mt-1">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
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
