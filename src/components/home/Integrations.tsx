"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { m } from "framer-motion";
import { AnimateOnScroll, StaggerContainer } from "@/hooks/useAnimateOnScroll";
import {
  integrations,
  integrationCategories,
  categoryColors,
  type Integration,
  type IntegrationCategory,
} from "@/constants/integrations";
import { cn } from "@/lib/utils";

// Get the first letter(s) for the icon placeholder
const getIconLetters = (name: string): string => {
  const words = name.split(" ");
  if (words.length === 1) {
    return name.substring(0, 2).toUpperCase();
  }
  return words
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
};

// Integration card component
const IntegrationCard: React.FC<{ integration: Integration; index: number }> = ({
  integration,
  index,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const colors = categoryColors[integration.category];

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card
        className={cn(
          "border border-border hover:border-primary/40 transition-all duration-300 bg-card h-full",
          "hover:shadow-lg dark:hover:shadow-primary/5",
          isHovered && "scale-[1.02]"
        )}
      >
        <CardContent className="flex flex-col items-center p-6 h-full">
          {/* Icon placeholder */}
          <m.div
            className={cn(
              "w-14 h-14 rounded-full flex items-center justify-center mb-4",
              "bg-primary text-primary-foreground",
              "text-lg font-bold shadow-md"
            )}
            animate={{
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? 5 : 0,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            {getIconLetters(integration.name)}
          </m.div>

          {/* Name */}
          <h3 className="font-semibold text-foreground text-center mb-2">
            {integration.name}
          </h3>

          {/* Category badge */}
          <span
            className={cn(
              "text-xs px-2 py-1 rounded-full mb-3",
              colors.bg,
              colors.text
            )}
          >
            {integration.category}
          </span>

          {/* Description - visible on hover or always on mobile */}
          <m.p
            className="text-sm text-muted-foreground text-center leading-relaxed"
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: isHovered ? 1 : 0.7,
              height: "auto",
            }}
            transition={{ duration: 0.2 }}
          >
            {integration.description}
          </m.p>
        </CardContent>
      </Card>
    </m.div>
  );
};

const Integrations: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<IntegrationCategory | "All">("All");

  // Filter integrations based on selected category
  const filteredIntegrations = useMemo(() => {
    if (activeCategory === "All") {
      return integrations;
    }
    return integrations.filter((integration) => integration.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className="w-full py-16 md:py-24 bg-muted/20 overflow-hidden">
      <div className="container mx-auto px-4 relative">
        {/* Background decorative elements */}
        <div className="absolute top-20 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-20 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />

        {/* Header */}
        <AnimateOnScroll variant="fadeInUp" className="text-center mb-12">
          <div className="inline-block rounded-full bg-primary/10 dark:bg-primary/20 px-3 py-1 text-sm font-medium text-primary mb-4">
            Technology Stack
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            Seamless Integrations
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            We connect with your existing technology stack to deliver AI solutions that work
            seamlessly with your business infrastructure.
          </p>
        </AnimateOnScroll>

        {/* Category Filter Tabs */}
        <AnimateOnScroll variant="fadeIn" delay={0.2} className="flex justify-center mb-12">
          <Tabs
            value={activeCategory}
            onValueChange={(value) => setActiveCategory(value as IntegrationCategory | "All")}
            className="w-full max-w-3xl"
          >
            <TabsList className="flex flex-wrap justify-center gap-2 p-2 bg-muted/50 dark:bg-muted/30 backdrop-blur-sm rounded-xl h-auto">
              <TabsTrigger
                value="All"
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                  "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
                  "data-[state=active]:text-primary-foreground data-[state=active]:shadow-md",
                  "hover:bg-primary/10"
                )}
              >
                All
              </TabsTrigger>
              {integrationCategories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                    "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
                    "data-[state=active]:text-primary-foreground data-[state=active]:shadow-md",
                    "hover:bg-primary/10"
                  )}
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </AnimateOnScroll>

        {/* Integration Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredIntegrations.map((integration, index) => (
            <IntegrationCard
              key={integration.id}
              integration={integration}
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <AnimateOnScroll variant="fadeInUp" delay={0.4} className="mt-16">
          <div className="bg-primary/5 dark:bg-primary/10 rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
              Don&apos;t See Your Platform?
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Our team specializes in custom integrations. We can connect your AI solutions
              with virtually any platform, API, or legacy system.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <StaggerContainer
                staggerDelay={0.1}
                className="flex flex-wrap justify-center gap-3"
                direction="up"
              >
                {["REST APIs", "GraphQL", "WebSockets", "SOAP", "Custom Protocols"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium",
                        "bg-background dark:bg-card border border-border",
                        "text-foreground/80"
                      )}
                    >
                      {tech}
                    </span>
                  )
                )}
              </StaggerContainer>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default Integrations;
