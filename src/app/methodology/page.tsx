import React from 'react';
import { Container } from '@/components/common/Container';
import { Heading } from '@/components/common/Heading';
import { Paragraph } from '@/components/common/Paragraph';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';
import { ArrowMark } from '@/components/common/Marks';
import { ctaPrimary, ctaSecondary } from '@/components/common/controls';
import type { Metadata } from 'next';
import {
  ArrowRight,
  Compass,
  Target,
  Layers,
  Rocket,
  Zap,
  TrendingUp,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import {
  frameworkName,
  frameworkTagline,
  frameworkDescription,
  methodologyPhases,
  frameworkBenefits,
  methodologyFAQs,
  type MethodologyPhase,
} from '@/constants/methodology';

export const metadata: Metadata = {
  title: 'How an Engagement Runs | Vivancedata',
  description:
    'The six phases an engagement runs through, from deciding whether a workflow is worth automating at all to keeping it working once it is live.',
};


const getPhaseIcon = (iconType: MethodologyPhase['iconType']) => {
  const iconClass = 'h-8 w-8';
  switch (iconType) {
    case 'compass':
      return <Compass className={iconClass} />;
    case 'target':
      return <Target className={iconClass} />;
    case 'layers':
      return <Layers className={iconClass} />;
    case 'rocket':
      return <Rocket className={iconClass} />;
    case 'zap':
      return <Zap className={iconClass} />;
    case 'trendingUp':
      return <TrendingUp className={iconClass} />;
    default:
      return <Compass className={iconClass} />;
  }
};

// One accent, not six. The per-phase rainbow predates DESIGN.md, which allows
// exactly one accent colour; phases are differentiated by their number, not by
// hue.
const getPhaseColor = (): string => 'bg-primary text-primary-foreground';

const getPhaseAccent = (): string => 'border border-rule text-mute';

function MethodologyHeroSection() {
  // Ink on canvas, per DESIGN.md: no dark panel, no blur orbs, no glass badge.
  // The converted industry pages set the precedent -- eyebrow, display
  // heading, muted supporting copy, stock button variants.
  return (
    <section className="relative w-full py-20 md:py-32 border-b border-border">
      <Container className="max-w-6xl">
        <div>
          {/* The eyebrow here was the literal string `frameworkName` renders
            * one line below it -- the same six words, twice, in two sizes. */}
          <h1 className="mb-4 font-display text-serif-xl">{frameworkName}</h1>

          <p className="mb-6 max-w-[52ch] font-display text-serif-md italic text-muted-foreground">
            {frameworkTagline}
          </p>

          <p className="mb-10 max-w-[62ch] text-body-lg text-muted-foreground">
            {frameworkDescription}
          </p>

          <div className="flex flex-col gap-md sm:flex-row">
            <Link href="/contact" className={ctaPrimary}>
              <span>Book a call</span>
              <ArrowMark />
            </Link>
            <Link href="/tools/ai-readiness" className={ctaSecondary}>
              Take the readiness assessment
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

function PhasesTimelineSection() {
  return (
    <section className="w-full py-20 md:py-28 bg-muted">
      <Container className="max-w-7xl">
        <div className="mb-16">
          <div className="mb-4 inline-block rounded-pill border border-rule px-4 py-1.5 text-label uppercase text-mute">
            Six phases
          </div>
          <Heading as="h2" className="mb-4 font-display text-serif-lg">
            From first look to running system
          </Heading>
          <Paragraph className="max-w-2xl mx-auto text-lg">
            Each phase ends in something you can look at, and any of them can end the engagement.
            The order exists so the expensive decisions come after the cheap evidence, rather
            than the other way round.
          </Paragraph>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-border rounded-full" />

          <div className="space-y-12 lg:space-y-24">
            {methodologyPhases.map((phase, index) => (
              <div
                key={phase.id}
                className={`flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                <div className="w-full lg:w-5/12">
                  <Card className="overflow-hidden">
                    <div
                      className={`h-2 ${getPhaseColor()}`}
                    />
                    <CardContent className="p-8">
                      <div className="flex items-start gap-4 mb-4">
                        <div
                          className={`p-3 rounded-md ${getPhaseAccent()}`}
                        >
                          {getPhaseIcon(phase.iconType)}
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-muted-foreground">
                            Phase {phase.number}
                          </span>
                          <h3 className="font-display text-serif-md">{phase.title}</h3>
                          <p className="text-body-sm text-muted-foreground">{phase.subtitle}</p>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-6">
                        {phase.description}
                      </p>

                      <div className="space-y-4">
                        <h4 className="text-heading-4 text-sm uppercase tracking-wide text-muted-foreground">
                          What you get
                        </h4>
                        <ul className="space-y-2">
                          {phase.deliverables.map((deliverable) => (
                            <li
                              key={deliverable}
                              className="flex items-start gap-2 text-foreground"
                            >
                              <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                              <span>{deliverable}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="flex items-center gap-2 pt-4 border-t border-border">
                          <Clock className="h-4 w-4 text-mute" />
                          <span className="text-sm text-muted-foreground">
                            Typical duration:{' '}
                            <span className="font-semibold text-foreground">
                              {phase.duration}
                            </span>
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="relative z-10 flex items-center justify-center">
                  <div
                    className={`w-16 h-16 rounded-full ${getPhaseColor()} font-bold text-xl flex items-center justify-center border border-border`}
                  >
                    {phase.number}
                  </div>
                </div>

                <div className="hidden lg:block w-5/12" />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function BenefitsSection() {
  return (
    <section className="w-full py-20 md:py-28 bg-card">
      <Container className="max-w-6xl">
        <div className="mb-16">
          <div className="mb-4 inline-block rounded-pill border border-rule px-4 py-1.5 text-label uppercase text-mute">
            The reasoning
          </div>
          <Heading as="h2" className="mb-4 font-display text-serif-lg">
            Why it is shaped this way
          </Heading>
          <Paragraph className="max-w-2xl mx-auto text-lg">
            Each phase exists to make the next decision cheaper to reverse. The
            order is the argument: nothing is built before it has been tried on
            your own documents, and nothing carries weight before it has run
            beside the process it replaces.
          </Paragraph>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {frameworkBenefits.map((benefit) => (
            <Card
              key={benefit.title}
              className="border border-border duration-300"
            >
              <CardContent className="p-8">
                <h3 className="mb-4 font-display text-serif-sm">{benefit.title}</h3>
                <p className="text-muted-foreground">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

function MethodologyFaqSection() {
  return (
    <section className="w-full py-20 md:py-28 bg-card">
      <Container className="max-w-3xl">
        <div className="mb-12">
          <Heading as="h2" className="mb-4 font-display text-serif-lg">
            Common questions
          </Heading>
          <Paragraph className="text-lg">
            How an engagement runs, what happens at each phase, and where it can stop.
          </Paragraph>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {methodologyFAQs.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionTrigger className="text-left font-semibold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}

function MethodologyCtaSection() {
  return (
    <section className="w-full py-20 md:py-28 bg-primary text-primary-foreground">
      <Container className="max-w-4xl text-center">
        <h2 className="mb-6 font-display text-serif-lg">
          Want to know if it is worth automating?
        </h2>
        <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
          Tell me which job goes wrong and how often. I will walk you through
          what the first phase would look like on your own documents, and say
          plainly if it is not worth doing yet.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/85"
          >
            <Link href="/contact">
              Book a call
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10"
          >
            <Link href="/case-studies">See what a build looks like</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}

export default function MethodologyPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <MethodologyHeroSection />
      <PhasesTimelineSection />
      <BenefitsSection />
      <MethodologyFaqSection />
      <MethodologyCtaSection />
    </main>
  );
}
