"use client";

import React from "react";
import { AnimateOnScroll } from "@/hooks/useAnimateOnScroll";
import { clients, Client } from "@/constants/clients";
import { Building2 } from "lucide-react";

interface ClientLogoItemProps {
  client: Client;
}

const ClientLogoItem: React.FC<ClientLogoItemProps> = ({ client }) => {
  return (
    <div
      className="flex-shrink-0 px-8 md:px-12"
      role="listitem"
      aria-label={`${client.name} - ${client.industry}`}
    >
      <div className="flex flex-col items-center justify-center h-20 w-32 md:w-40 group">
        {/* Placeholder logo using icon and text - replace with actual logos */}
        <div className="flex flex-col items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 ease-out">
          <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 group-hover:from-blue-50 group-hover:to-indigo-100 transition-all duration-500 shadow-sm group-hover:shadow-md">
            <Building2 className="w-6 h-6 md:w-7 md:h-7 text-slate-500 group-hover:text-blue-600 transition-colors duration-500" />
          </div>
          <span className="mt-2 text-xs md:text-sm font-semibold text-slate-600 group-hover:text-slate-900 transition-colors duration-500 whitespace-nowrap">
            {client.name}
          </span>
        </div>
      </div>
    </div>
  );
};

const ClientLogos: React.FC = () => {
  // Duplicate clients for seamless infinite scroll
  const duplicatedClients = [...clients, ...clients];

  return (
    <section
      className="w-full py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white overflow-hidden"
      aria-label="Our clients"
    >
      <div className="container mx-auto px-4">
        <AnimateOnScroll variant="fadeInUp" className="text-center mb-12 md:mb-16">
          <div className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 mb-4">
            Our Clients
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Trusted by Industry Leaders
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
            Join hundreds of forward-thinking companies that trust VivanceData to power their AI transformation.
          </p>
        </AnimateOnScroll>

        {/* Desktop: Animated marquee */}
        <AnimateOnScroll variant="fadeIn" delay={0.2}>
          <div className="relative hidden md:block">
            {/* Gradient overlays for fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            {/* Marquee container */}
            <div
              className="flex animate-marquee"
              role="list"
              aria-label="Client logos scrolling"
            >
              {duplicatedClients.map((client, index) => (
                <ClientLogoItem key={`${client.id}-${index}`} client={client} />
              ))}
            </div>
          </div>

          {/* Mobile: Static grid */}
          <div
            className="grid grid-cols-2 gap-6 md:hidden"
            role="list"
            aria-label="Client logos"
          >
            {clients.slice(0, 6).map((client) => (
              <div
                key={client.id}
                className="flex items-center justify-center p-4"
                role="listitem"
                aria-label={`${client.name} - ${client.industry}`}
              >
                <div className="flex flex-col items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 shadow-sm">
                    <Building2 className="w-6 h-6 text-slate-500" />
                  </div>
                  <span className="mt-2 text-xs font-semibold text-slate-600 whitespace-nowrap">
                    {client.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </AnimateOnScroll>

        {/* Stats bar */}
        <AnimateOnScroll variant="fadeInUp" delay={0.4}>
          <div className="mt-12 md:mt-16 pt-8 border-t border-slate-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
              <div className="space-y-1">
                <p className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                  500+
                </p>
                <p className="text-sm text-gray-600">Enterprise Clients</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                  50+
                </p>
                <p className="text-sm text-gray-600">Countries Served</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                  $2B+
                </p>
                <p className="text-sm text-gray-600">Client Revenue Impact</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                  98%
                </p>
                <p className="text-sm text-gray-600">Client Retention</p>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>

      {/* CSS for marquee animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default ClientLogos;
