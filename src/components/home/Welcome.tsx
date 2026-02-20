"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { AnimateOnScroll, StaggerContainer } from "@/hooks/useAnimateOnScroll";
import { features } from "@/constants/welcome";
import { prefersReducedMotion } from "@/lib/performance";
import Link from "next/link";

export default function Welcome() {
  const [reducedMotion] = useState(() => prefersReducedMotion());

  // reducedMotion is available for future animation enhancements
  void reducedMotion;

  return (
    <section className="container mx-auto py-20 px-4 md:py-32 overflow-hidden">
      <div className="relative">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[140px] -z-10" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/10 rounded-full blur-[140px] -z-10" aria-hidden="true" />
        <div className="absolute inset-x-0 top-32 h-32 bg-primary/5 blur-3xl -z-10" aria-hidden="true" />

        <AnimateOnScroll variant="fadeInUp" className="flex flex-col items-center justify-center text-center space-y-6 mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/70 px-4 py-1.5 text-sm font-medium text-foreground backdrop-blur dark:border-white/10 dark:bg-white/10">
            Why Choose VivanceData
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight text-foreground">
            Transforming Businesses Through <span className="text-primary">Intelligent Automation</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-4 leading-relaxed">
            We combine cutting-edge AI technology with deep industry expertise to deliver solutions that drive real business outcomes.
          </p>
        </AnimateOnScroll>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="glass-card flex flex-col p-8 transition-all duration-500 group hover:-translate-y-2 hover:shadow-[0_35px_80px_-50px_rgba(13,148,136,0.45)]"
            >
              <div className="rounded-2xl bg-white/70 dark:bg-white/10 p-4 w-fit mb-6 border border-white/40 dark:border-white/10 group-hover:border-primary/40 transition-colors duration-300">
                {/* Icon placeholder */}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
              <p className="text-muted-foreground text-lg">{feature.description}</p>
            </div>
          ))}
        </StaggerContainer>

        <AnimateOnScroll variant="fadeInUp" className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
          <Button
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-7 h-auto text-lg font-medium rounded-xl shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl group"
            asChild
          >
            <Link href="/services">
              <span>Explore Our Services</span>
              <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10 px-8 py-7 h-auto text-lg font-medium rounded-xl transition-all duration-300"
            asChild
          >
            <Link href="/contact">Schedule a Consultation</Link>
          </Button>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
