import React from "react";
import { CheckCircle } from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
}

interface ServicesListProps {
  services: Service[];
}

export function ServicesList({ services }: ServicesListProps): React.ReactElement {
  return (
    <section className="container mx-auto py-16 md:py-24 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service) => (
          <div key={service.id} className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-blue-100 p-2 mt-1">
                <CheckCircle className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-700">{service.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
