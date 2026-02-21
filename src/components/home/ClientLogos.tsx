"use client";

import React from "react";
import Image from "next/image";
import { AnimateOnScroll } from "@/hooks/useAnimateOnScroll";
import { clients, Client } from "@/constants/clients";
import { Building2 } from "lucide-react";

interface ClientLogoItemProps {
  client: Client;
}

const ClientLogoItem: React.FC<ClientLogoItemProps> = ({ client }) => {
  const [logoLoadFailed, setLogoLoadFailed] = React.useState(false);

  return (
    <div
      className="flex-shrink-0 px-2 md:px-12"
      role="listitem"
      aria-label={`${client.name} - ${client.industry}`}
    >
      <div className="flex flex-col items-center justify-center h-20 w-32 md:w-40 group">
        <div className="flex flex-col items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 ease-out">
          <div className="flex items-center justify-center h-12 md:h-14 px-2 rounded-xl bg-muted/60 group-hover:bg-primary/10 dark:bg-muted/40 transition-all duration-500 shadow-sm group-hover:shadow-md">
            {logoLoadFailed ? (
              <Building2 className="w-6 h-6 md:w-7 md:h-7 text-muted-foreground group-hover:text-primary transition-colors duration-500" />
            ) : (
              <Image
                src={client.logo}
                alt={`${client.name} logo`}
                width={140}
                height={56}
                className="h-7 w-auto md:h-8"
                onError={() => setLogoLoadFailed(true)}
                unoptimized
              />
            )}
          </div>
          <span className="mt-2 text-xs md:text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors duration-500 whitespace-nowrap">
            {client.name}
          </span>
        </div>
      </div>
    </div>
  );
};

const ClientLogos: React.FC = () => {
  // Duplicate clients for seamless infinite scroll
  const duplicatedClients: Client[] = [
    ...clients.map((client) => ({ ...client, id: `${client.id}-a` })),
    ...clients.map((client) => ({ ...client, id: `${client.id}-b` })),
  ];

  return (
    <section
      className="w-full py-16 md:py-24 bg-muted/20 overflow-hidden"
      aria-label="Our clients"
    >
      <div className="container mx-auto px-4">
        <AnimateOnScroll variant="fadeInUp" className="text-center mb-12 md:mb-16">
          <div className="inline-block rounded-full bg-primary/10 dark:bg-primary/20 px-3 py-1 text-sm font-medium text-primary mb-4">
            Industries We Support
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            Teams We Build With
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            Representative sectors where we deliver AI strategy and implementation support.
          </p>
        </AnimateOnScroll>

        {/* Desktop: Animated marquee */}
        <AnimateOnScroll variant="fadeIn" delay={0.2}>
          <div className="relative hidden md:block">
            {/* Gradient overlays for fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-muted/40 z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-background/80 z-10 pointer-events-none" />

            {/* Marquee container */}
            <div
              className="flex animate-marquee"
              role="list"
              aria-label="Client logos scrolling"
            >
              {duplicatedClients.map((client) => (
                <ClientLogoItem key={client.id} client={client} />
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
              <ClientLogoItem key={client.id} client={client} />
            ))}
          </div>
        </AnimateOnScroll>

        {/* Context */}
        <AnimateOnScroll variant="fadeInUp" delay={0.4}>
          <div className="mt-12 md:mt-16 pt-8 border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center">
              <div className="space-y-1">
                <p className="text-sm md:text-base font-semibold text-foreground">Advisory + Delivery</p>
                <p className="text-sm text-muted-foreground">From strategy through implementation support.</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm md:text-base font-semibold text-foreground">Cross-Functional Enablement</p>
                <p className="text-sm text-muted-foreground">Product, engineering, operations, and governance stakeholders.</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm md:text-base font-semibold text-foreground">Industry-Aware Workflows</p>
                <p className="text-sm text-muted-foreground">Use-case design tailored to domain and compliance constraints.</p>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>

      {/* CSS for marquee animation */}
      <style>{`
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
