"use client";

import type { ReactNode } from "react";
import { Container } from "@/components/common/Container";
import { DemoLink } from "@/components/common/DemoLink";
import type { Demo } from "@/constants/demos";
import { Heading } from "@/components/common/Heading";
import { Paragraph } from "@/components/common/Paragraph";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { AnimateOnScroll, StaggerContainer } from "@/hooks/useAnimateOnScroll";
import { m } from "framer-motion";

/**
 * The single layout every /industries/* page renders. It was extracted from the
 * manufacturing page, which was the only one that had been through the token
 * conversion:
 *   bg-card                -> bg-card
 *   border-border     -> border-border
 *   text-foreground         -> text-foreground
 *   text-muted-foreground         -> text-muted-foreground
 *   text-muted-foreground (label) -> eyebrow
 *   / /        -> removed (flat is the default)
 *   whileHover y-lift + boxShadow            -> removed (no hover lift)
 * Each light/dark pair collapses into one token that handles both modes.
 *
 * Everything industry-specific arrives through `config`; there is deliberately
 * no per-industry client component, because six near-identical copies of this
 * file is what this component exists to delete.
 */

interface SolutionCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  benefits: string[];
}

const SolutionCard = ({ title, description, icon, benefits }: SolutionCardProps) => (
  <div className="h-full rounded-md border border-border bg-card p-lg transition-colors duration-default hover:border-brand/40">
    <div className="mb-md flex items-center">
      <div className="mr-md rounded-sm border border-border bg-muted p-3">{icon}</div>
      <h3 className="text-heading-3">{title}</h3>
    </div>
    <p className="mb-md text-body-sm text-muted-foreground">{description}</p>
    <h4 className="eyebrow mb-sm">Key Benefits</h4>
    <ul className="space-y-2">
      {benefits.map((benefit) => (
        <li key={`${title}-benefit-${benefit}`} className="flex items-start">
          <Check className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-brand" />
          <span className="text-body-sm text-foreground">{benefit}</span>
        </li>
      ))}
    </ul>
  </div>
);

/**
 * A scenario, not a case study. These describe the shape of a build this
 * practice does, and every card used to carry a `client` line reading
 * "Illustrative Residential HVAC Contractor" -- a coy reference to a customer
 * that does not exist, which reads to a buyer as a redacted real one. The line
 * is gone. Where the workflow has a live demo, the card links it instead: the
 * only proof on this page that a visitor can check for themselves.
 */
interface ScenarioProps {
  title: string;
  challenge: string;
  solution: string;
  results: string[];
  demo?: Demo;
}

const Scenario = ({ title, challenge, solution, results, demo }: ScenarioProps) => (
  <div className="flex h-full flex-col rounded-md border border-border bg-card p-lg transition-colors duration-default hover:border-brand/40">
    <h3 className="mb-md text-heading-3">{title}</h3>

    <div className="mb-md">
      <h4 className="eyebrow mb-1">Challenge</h4>
      <p className="text-body-sm text-foreground">{challenge}</p>
    </div>

    <div className="mb-md">
      <h4 className="eyebrow mb-1">Solution</h4>
      <p className="text-body-sm text-foreground">{solution}</p>
    </div>

    <div>
      <h4 className="eyebrow mb-1">What changes</h4>
      <ul className="space-y-1">
        {results.map((result) => (
          <li key={`${title}-result-${result}`} className="flex items-start">
            <Check className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-brand" />
            <span className="text-body-sm text-foreground">{result}</span>
          </li>
        ))}
      </ul>
    </div>

    {demo ? <DemoLink demo={demo} className="mt-auto pt-md" /> : null}
  </div>
);

/**
 * The hero mock. Ink on white, hairline bordered -- the system renders mocks in
 * the same palette as the page, not as a dark panel. It shows the *shape* of the
 * workflow and never a result, which is why it takes steps rather than tiles.
 */
const HeroVisual = ({ label, steps }: { label: string; steps: string[] }) => (
  <div className="flex aspect-video flex-col justify-center overflow-hidden rounded-md border border-border bg-card p-lg">
    <div className="eyebrow mb-md">{label}</div>
    <div className="space-y-3">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        return (
          <div key={step} className="flex items-center gap-3">
            <div
              className={`h-2 w-2 flex-shrink-0 rounded-full ${isLast ? "bg-border" : "bg-brand"}`}
            />
            <div className={`h-0.5 flex-1 rounded ${isLast ? "bg-border" : "bg-brand/30"}`} />
            <span className="w-28 flex-shrink-0 text-right text-caption text-muted-foreground">
              {step}
            </span>
          </div>
        );
      })}
    </div>
  </div>
);

export interface IndustryPageConfig {
  eyebrow: string;
  title: string;
  heroVisual: { label: string; steps: string[] };
  introHeading: string;
  /**
   * Blank-line separated. The first block is the lead line under the page
   * title; every block after it fills the column beside the hero visual.
   */
  introBody: string;
  introCtaLabel: string;
  /**
   * Rendered beside the intro CTA. Only industries whose workflow has a
   * live demo get one -- see `constants/demos.ts`.
   */
  demo?: Demo;
  solutionsHeading: string;
  solutions: Array<{
    title: string;
    description: string;
    icon: ReactNode;
    benefits: string[];
  }>;
  statsHeading: string;
  stats: Array<{ value: string; label: string }>;
  processHeading: string;
  /**
   * `checks` is what makes a phase concrete rather than a slogan -- it is the
   * list of things actually done in that phase. Keep it populated.
   */
  process: Array<{ title: string; description: string; checks: string[] }>;
  scenariosHeading: string;
  scenarios: Array<{
    title: string;
    challenge: string;
    solution: string;
    results: string[];
    demo?: Demo;
  }>;
  finalCtaHeading: string;
  finalCtaBody: string;
  finalCtaLabel: string;
}

export function IndustryPage({ config }: { config: IndustryPageConfig }) {
  const [leadParagraph, ...bodyParagraphs] = config.introBody
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);

  // Manufacturing carries five solutions and renders them 3 + 2. Four fit a 2x2
  // grid instead; dropping them into a three-column row would strand the fourth
  // card alone on a line.
  const isSplitGrid = config.solutions.length > 4;
  const primarySolutions = isSplitGrid ? config.solutions.slice(0, 3) : config.solutions;
  const secondarySolutions = isSplitGrid ? config.solutions.slice(3) : [];

  return (
    <Container className="py-4xl">
      <AnimateOnScroll variant="fadeInUp" className="mb-3xl text-center">
        <p className="eyebrow mb-md">{config.eyebrow}</p>
        <Heading className="mb-md text-display">{config.title}</Heading>
        <Paragraph className="mx-auto max-w-[60ch] text-body-lg text-muted-foreground">
          {leadParagraph}
        </Paragraph>
      </AnimateOnScroll>

      <div className="mb-3xl flex flex-col gap-xl md:flex-row">
        <AnimateOnScroll variant="fadeInLeft" className="w-full md:w-1/2">
          <HeroVisual label={config.heroVisual.label} steps={config.heroVisual.steps} />
        </AnimateOnScroll>

        <AnimateOnScroll
          variant="fadeInRight"
          className="flex w-full flex-col justify-center md:w-1/2"
        >
          <h2 className="mb-md text-heading-1">{config.introHeading}</h2>
          {bodyParagraphs.map((paragraph) => (
            <p key={paragraph} className="mb-lg max-w-[60ch] text-body text-muted-foreground">
              {paragraph}
            </p>
          ))}
          <div className="flex flex-col gap-md self-start sm:flex-row sm:flex-wrap sm:items-center">
            <Button asChild variant="secondary" shape="pill" className="group">
              <Link href="/contact">
                <span>{config.introCtaLabel}</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            {config.demo ? (
              <DemoLink demo={config.demo} className="whitespace-nowrap" />
            ) : null}
          </div>
        </AnimateOnScroll>
      </div>

      <AnimateOnScroll variant="fadeInUp" className="mb-lg">
        <h2 className="mb-xl text-center text-heading-1">{config.solutionsHeading}</h2>
      </AnimateOnScroll>

      <StaggerContainer
        className={`mb-3xl grid grid-cols-1 gap-lg md:grid-cols-2 ${
          isSplitGrid ? "lg:grid-cols-3" : ""
        }`}
      >
        {primarySolutions.map((solution) => (
          <SolutionCard
            key={`solution-primary-${solution.title}`}
            title={solution.title}
            description={solution.description}
            icon={solution.icon}
            benefits={solution.benefits}
          />
        ))}
      </StaggerContainer>

      {secondarySolutions.length > 0 && (
        <StaggerContainer className="mb-3xl grid grid-cols-1 gap-lg md:grid-cols-2">
          {secondarySolutions.map((solution) => (
            <SolutionCard
              key={`solution-secondary-${solution.title}`}
              title={solution.title}
              description={solution.description}
              icon={solution.icon}
              benefits={solution.benefits}
            />
          ))}
        </StaggerContainer>
      )}

      <AnimateOnScroll
        variant="fadeIn"
        className="mb-3xl rounded-lg border border-border bg-muted p-xl md:p-2xl"
      >
        <h2 className="mb-xl text-center text-heading-1">{config.statsHeading}</h2>
        <div className="grid grid-cols-2 gap-lg md:grid-cols-4">
          {config.stats.map((stat, index) => (
            <AnimateOnScroll
              key={stat.label}
              variant="scaleIn"
              delay={index * 0.1}
              className="text-center"
            >
              <div className="mb-2 text-display text-brand">{stat.value}</div>
              <p className="text-body-sm text-muted-foreground">{stat.label}</p>
            </AnimateOnScroll>
          ))}
        </div>
      </AnimateOnScroll>

      <AnimateOnScroll variant="fadeInUp" className="mb-lg">
        <h2 className="mb-xl text-center text-heading-1">{config.scenariosHeading}</h2>
      </AnimateOnScroll>

      <StaggerContainer className="mb-3xl grid grid-cols-1 gap-lg md:grid-cols-3">
        {config.scenarios.map((scenario) => (
          <Scenario
            key={scenario.title}
            title={scenario.title}
            challenge={scenario.challenge}
            solution={scenario.solution}
            results={scenario.results}
            demo={scenario.demo}
          />
        ))}
      </StaggerContainer>

      <AnimateOnScroll variant="fadeInUp" className="mb-lg">
        <h2 className="mb-xl text-center text-heading-1">{config.processHeading}</h2>
      </AnimateOnScroll>

      <div className="relative mb-3xl">
        {/* Hairline connecting the phases. */}
        <div className="absolute bottom-0 left-6 top-6 hidden w-px bg-border md:block" />

        <div className="space-y-xl">
          {config.process.map((phase, index) => (
            <AnimateOnScroll
              key={phase.title}
              variant="fadeInLeft"
              delay={index * 0.2}
              className="relative"
            >
              <div className="mb-md flex items-center">
                <div className="mr-md flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-body font-medium text-primary-foreground">
                  {index + 1}
                </div>
                <h3 className="text-heading-3">{phase.title}</h3>
              </div>
              <div className="pl-16">
                <p className="mb-md max-w-[60ch] text-body-sm text-muted-foreground">{phase.description}</p>
                <ul className="grid gap-sm sm:grid-cols-2">
                  {phase.checks.map((check) => (
                    <li key={check} className="flex items-start">
                      <Check className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-brand" aria-hidden="true" />
                      <span className="text-body-sm text-foreground">{check}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>

      <AnimateOnScroll
        variant="scaleIn"
        className="rounded-lg border border-border bg-muted p-xl text-center md:p-2xl"
      >
        <h2 className="mb-md text-heading-1">{config.finalCtaHeading}</h2>
        <p className="mx-auto mb-xl max-w-2xl text-body-lg text-muted-foreground">
          {config.finalCtaBody}
        </p>
        <m.div whileTap={{ scale: 0.98 }}>
          <Button asChild size="lg" shape="pill">
            <Link href="/contact">{config.finalCtaLabel}</Link>
          </Button>
        </m.div>
      </AnimateOnScroll>
    </Container>
  );
}
