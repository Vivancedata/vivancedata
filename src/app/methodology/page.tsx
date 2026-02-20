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
  title: 'RAPID AI Framework Methodology | VivanceData',
  description:
    'Explore VivanceData’s RAPID AI Framework: a six-phase approach from discovery to scale for reliable, measurable AI implementation.',
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

const getPhaseColor = (number: number): string => {
  const colors = [
    'from-blue-500 to-blue-600',
    'from-indigo-500 to-indigo-600',
    'from-violet-500 to-violet-600',
    'from-purple-500 to-purple-600',
    'from-fuchsia-500 to-fuchsia-600',
    'from-pink-500 to-pink-600',
  ];
  return colors[(number - 1) % colors.length];
};

const getPhaseAccent = (number: number): string => {
  const accents = [
    'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300',
    'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300',
    'bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-300',
    'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300',
    'bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-600 dark:text-fuchsia-300',
    'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-300',
  ];
  return accents[(number - 1) % accents.length];
};

export default function MethodologyPage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-32 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/30 rounded-full filter blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full filter blur-[120px]" />

        <Container className="relative z-10 max-w-6xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white/90 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              Our Proven Methodology
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
              {frameworkName}
            </h1>

            <p className="text-xl md:text-2xl text-blue-200 font-medium mb-6">
              {frameworkTagline}
            </p>

            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-10">
              {frameworkDescription}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-slate-900 hover:bg-white/90 font-semibold"
              >
                <Link href="/contact">
                  Start Your Transformation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                <Link href="/tools/ai-readiness">
                  Take AI Readiness Assessment
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* RAPID Acronym Section */}
      <section className="w-full py-16 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800">
        <Container className="max-w-6xl">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {['Realize', 'AI', 'Potential', 'In', 'Days'].map((word, index) => (
              <div key={word} className="flex items-center gap-2">
                <span className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {word.charAt(0)}
                </span>
                <span className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium">
                  {word.slice(1)}
                </span>
                {index < 4 && (
                  <span className="hidden md:inline text-gray-300 dark:text-gray-600 mx-2">
                    |
                  </span>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Framework Phases - Timeline */}
      <section className="w-full py-20 md:py-28 bg-gray-50 dark:bg-slate-800">
        <Container className="max-w-7xl">
          <div className="text-center mb-16">
            <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-4">
              The 6-Phase Journey
            </div>
            <Heading as="h2" className="text-3xl md:text-4xl mb-4">
              From Discovery to Scale
            </Heading>
            <Paragraph className="max-w-2xl mx-auto text-lg">
              Each phase builds on the previous, creating a foundation for
              sustainable AI success with clear deliverables and measurable
              outcomes.
            </Paragraph>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line - Desktop */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full" />

            {/* Phases */}
            <div className="space-y-12 lg:space-y-24">
              {methodologyPhases.map((phase, index) => (
                <div
                  key={phase.id}
                  className={`flex flex-col lg:flex-row items-center gap-8 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Content Card */}
                  <div className="w-full lg:w-5/12">
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                      <div
                        className={`h-2 bg-gradient-to-r ${getPhaseColor(phase.number)}`}
                      />
                      <CardContent className="p-8">
                        <div className="flex items-start gap-4 mb-4">
                          <div
                            className={`p-3 rounded-xl ${getPhaseAccent(phase.number)}`}
                          >
                            {getPhaseIcon(phase.iconType)}
                          </div>
                          <div>
                            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                              Phase {phase.number}
                            </span>
                            <h3 className="text-2xl font-bold">{phase.title}</h3>
                            <p className="text-primary font-medium">
                              {phase.subtitle}
                            </p>
                          </div>
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                          {phase.description}
                        </p>

                        <div className="space-y-4">
                          <h4 className="font-semibold text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">
                            Key Deliverables
                          </h4>
                          <ul className="space-y-2">
                            {phase.deliverables.map((deliverable) => (
                              <li
                                key={deliverable}
                                className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                              >
                                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                                <span>{deliverable}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="flex items-center gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              Typical Duration:{' '}
                              <span className="font-semibold text-gray-700 dark:text-gray-300">
                                {phase.duration}
                              </span>
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Timeline Node */}
                  <div className="relative z-10 flex items-center justify-center">
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-br ${getPhaseColor(phase.number)} text-white font-bold text-xl flex items-center justify-center shadow-lg border-4 border-white dark:border-slate-800`}
                    >
                      {phase.number}
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="hidden lg:block w-5/12" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="w-full py-20 md:py-28 bg-white dark:bg-slate-900">
        <Container className="max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-block rounded-full bg-green-100 dark:bg-green-900/30 px-4 py-1.5 text-sm font-semibold text-green-700 dark:text-green-300 mb-4">
              Proven Results
            </div>
            <Heading as="h2" className="text-3xl md:text-4xl mb-4">
              Why the RAPID Framework Works
            </Heading>
            <Paragraph className="max-w-2xl mx-auto text-lg">
              Our methodology has been refined through dozens of successful
              implementations across industries, delivering consistent,
              measurable results.
            </Paragraph>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {frameworkBenefits.map((benefit) => (
              <Card
                key={benefit.title}
                className="border-0 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold">{benefit.title}</h3>
                    {benefit.metric && (
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                        {benefit.metric}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Comparison Section */}
      <section className="w-full py-20 md:py-28 bg-gray-50 dark:bg-slate-800">
        <Container className="max-w-5xl">
          <div className="text-center mb-16">
            <Heading as="h2" className="text-3xl md:text-4xl mb-4">
              Traditional AI vs RAPID Framework
            </Heading>
            <Paragraph className="max-w-2xl mx-auto text-lg">
              See how our structured methodology compares to traditional AI
              implementation approaches.
            </Paragraph>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Traditional */}
            <Card className="border-2 border-gray-200 dark:border-gray-700">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-6 text-gray-500 dark:text-gray-400">
                  Traditional Approach
                </h3>
                <ul className="space-y-4">
                  {[
                    'Unclear objectives and scope creep',
                    'Long timelines before seeing results',
                    'High risk of project failure',
                    'Siloed implementation teams',
                    'Knowledge trapped with vendors',
                    'Unpredictable costs and timelines',
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-gray-600 dark:text-gray-400"
                    >
                      <span className="text-red-500 font-bold">x</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* RAPID */}
            <Card className="border-2 border-primary shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-6 text-primary">
                  RAPID Framework
                </h3>
                <ul className="space-y-4">
                  {[
                    'Clear deliverables at every phase',
                    'Working prototypes in weeks',
                    'Validated approach reduces risk',
                    'Cross-functional collaboration',
                    'Knowledge transfer to your team',
                    'Predictable milestones and budget',
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                    >
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-20 md:py-28 bg-white dark:bg-slate-900">
        <Container className="max-w-3xl">
          <div className="text-center mb-12">
            <Heading as="h2" className="text-3xl md:text-4xl mb-4">
              Frequently Asked Questions
            </Heading>
            <Paragraph className="text-lg">
              Common questions about the RAPID AI Framework and our engagement
              process.
            </Paragraph>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {methodologyFAQs.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger className="text-left font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 md:py-28 bg-gradient-to-br from-primary via-blue-600 to-indigo-700 text-white">
        <Container className="max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Accelerate Your AI Journey?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Let our experts guide you through the RAPID Framework and show you
            how to realize AI potential in days, not months.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-semibold"
            >
              <Link href="/contact">
                Schedule a Discovery Call
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              <Link href="/case-studies">View Success Stories</Link>
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
}
