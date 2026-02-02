"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, CheckCircle } from "lucide-react"
import { AnimateOnScroll, StaggerContainer } from "@/hooks/useAnimateOnScroll"
import {
  certifications,
  securityFeatures,
  trustSectionContent,
  type TrustCertification,
} from "@/constants/trust"

interface CertificationCardProps {
  certification: TrustCertification
}

const CertificationCard = ({ certification }: CertificationCardProps): React.ReactElement => {
  const Icon = certification.icon

  return (
    <Card className="border border-border bg-card/80 dark:bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-lg dark:hover:shadow-primary/5 transition-all duration-300 h-full">
      <CardContent className="p-6 flex flex-col items-center text-center h-full">
        <div className="rounded-full bg-primary/10 dark:bg-primary/20 p-4 mb-4">
          <Icon className="h-8 w-8 text-primary" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">{certification.name}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{certification.description}</p>
      </CardContent>
    </Card>
  )
}

export function TrustSection(): React.ReactElement {
  return (
    <section
      className="w-full py-16 md:py-24 bg-gradient-to-b from-muted/30 to-background overflow-hidden"
      aria-labelledby="trust-section-title"
    >
      <div className="container mx-auto px-4 relative">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl -z-10" />

        <AnimateOnScroll variant="fadeInUp" className="text-center mb-12 md:mb-16">
          <div className="inline-block rounded-full bg-primary/10 dark:bg-primary/20 px-3 py-1 text-sm font-medium text-primary mb-4">
            {trustSectionContent.badge}
          </div>
          <h2
            id="trust-section-title"
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"
          >
            {trustSectionContent.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {trustSectionContent.description}
          </p>
        </AnimateOnScroll>

        <StaggerContainer
          staggerDelay={0.1}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6"
          threshold={0.1}
        >
          {certifications.map((certification) => (
            <CertificationCard key={certification.id} certification={certification} />
          ))}
        </StaggerContainer>

        <AnimateOnScroll variant="fadeInUp" delay={0.4} className="mt-12 md:mt-16">
          <div className="bg-card/80 dark:bg-card/50 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-border">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3">
                  <Shield
                    className="h-6 w-6 text-green-600 dark:text-green-400"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {trustSectionContent.secureByDesign.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {trustSectionContent.secureByDesign.description}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                {securityFeatures.map((feature) => (
                  <div
                    key={feature.label}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle className="h-4 w-4 text-primary" aria-hidden="true" />
                    <span>{feature.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}

export default TrustSection
