"use client";

import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { Paragraph } from "@/components/common/Paragraph";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { AnimateOnScroll, StaggerContainer } from "@/hooks/useAnimateOnScroll";
import { m } from "framer-motion";

/**
 * Conversion recipe for the remaining industry pages:
 *   bg-white dark:bg-gray-800                -> bg-card
 *   border-gray-100 dark:border-gray-700     -> border-border
 *   text-gray-700 dark:text-gray-200         -> text-foreground
 *   text-gray-600 dark:text-gray-300         -> text-muted-foreground
 *   text-gray-500 dark:text-gray-400 (label) -> eyebrow
 *   shadow-sm / shadow-lg / shadow-xl        -> removed (flat is the default)
 *   whileHover y-lift + boxShadow            -> removed (no hover lift)
 * Each light/dark pair collapses into one token that handles both modes.
 */

interface SolutionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
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

interface CaseStudyProps {
  title: string;
  client: string;
  challenge: string;
  solution: string;
  results: string[];
}

const CaseStudy = ({ title, client, challenge, solution, results }: CaseStudyProps) => (
  <div className="h-full rounded-md border border-border bg-card p-lg transition-colors duration-default hover:border-brand/40">
    <h3 className="mb-1 text-heading-3">{title}</h3>
    <p className="mb-md text-body-sm text-brand">{client}</p>

    <div className="mb-md">
      <h4 className="eyebrow mb-1">Challenge</h4>
      <p className="text-body-sm text-foreground">{challenge}</p>
    </div>

    <div className="mb-md">
      <h4 className="eyebrow mb-1">Solution</h4>
      <p className="text-body-sm text-foreground">{solution}</p>
    </div>

    <div>
      <h4 className="eyebrow mb-1">Results</h4>
      <ul className="space-y-1">
        {results.map((result) => (
          <li key={`${title}-result-${result}`} className="flex items-start">
            <Check className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-brand" />
            <span className="text-body-sm text-foreground">{result}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

interface ManufacturingClientProps {
  solutions: Array<{
    title: string;
    description: string;
    icon: React.ReactNode;
    benefits: string[];
  }>;
  caseStudies: Array<{
    title: string;
    client: string;
    challenge: string;
    solution: string;
    results: string[];
  }>;
  stats: Array<{
    value: string;
    label: string;
  }>;
}

export default function ManufacturingClient({
  solutions,
  caseStudies,
  stats,
}: ManufacturingClientProps) {
  return (
    <Container className="py-4xl">
      <AnimateOnScroll variant="fadeInUp" className="mb-3xl text-center">
        <p className="eyebrow mb-md">Manufacturing</p>
        <Heading className="mb-md text-display">AI Solutions for Manufacturing</Heading>
        <Paragraph className="mx-auto max-w-3xl text-body-lg text-muted-foreground">
          Reduce unplanned downtime, improve quality control, and optimize
          production with AI solutions built for manufacturing operations.
        </Paragraph>
      </AnimateOnScroll>

      <div className="mb-3xl flex flex-col gap-xl md:flex-row">
        <AnimateOnScroll variant="fadeInLeft" className="w-full md:w-1/2">
          {/* Product illustration: ink on white, hairline bordered -- the system
            * renders mocks in the same palette as the page, not as a dark panel. */}
          <div className="flex aspect-video flex-col overflow-hidden rounded-md border border-border bg-card p-lg">
            <div className="eyebrow mb-md">Predictive Maintenance Monitor</div>
            <div className="mb-md grid grid-cols-2 gap-3">
              <div className="rounded-sm border border-border bg-muted p-3">
                <div className="mb-1 text-caption text-mute">Unplanned Downtime</div>
                <div className="text-heading-2 text-brand">↓ 32%</div>
                <div className="text-caption text-mute">vs. prior year</div>
              </div>
              <div className="rounded-sm border border-border bg-muted p-3">
                <div className="mb-1 text-caption text-mute">OEE Score</div>
                <div className="text-heading-2 text-brand">↑ 18%</div>
                <div className="text-caption text-mute">pilot lines</div>
              </div>
            </div>
            <div className="space-y-2">
              {[
                { label: "Sensor anomaly detection in real-time", color: "bg-chart-1" },
                { label: "Maintenance schedule optimization", color: "bg-chart-2" },
                { label: "Quality defect prediction pipeline", color: "bg-chart-3" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <div className={`h-2 w-2 flex-shrink-0 rounded-full ${item.color}`} />
                  <span className="text-caption text-muted-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll
          variant="fadeInRight"
          className="flex w-full flex-col justify-center md:w-1/2"
        >
          <h2 className="mb-md text-heading-1">Transforming Manufacturing with AI</h2>
          <p className="mb-lg text-body text-muted-foreground">
            Manufacturing teams face relentless pressure to reduce downtime,
            improve quality, and optimize throughput. AI is changing how
            maintenance, quality, and operations teams detect problems, plan
            interventions, and measure performance.
          </p>
          <p className="mb-lg text-body text-muted-foreground">
            At VivanceData, we design AI workflows for manufacturing that
            integrate with existing systems — from sensor data pipelines to
            quality dashboards — with a focus on reducing unplanned downtime and
            improving operational efficiency.
          </p>
          <Button asChild variant="secondary" shape="pill" className="group self-start">
            <Link href="/contact">
              <span>Discuss Your Manufacturing AI Needs</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </AnimateOnScroll>
      </div>

      <AnimateOnScroll variant="fadeInUp" className="mb-lg">
        <h2 className="mb-xl text-center text-heading-1">
          Our Manufacturing AI Solutions
        </h2>
      </AnimateOnScroll>

      <StaggerContainer className="mb-3xl grid grid-cols-1 gap-lg md:grid-cols-2 lg:grid-cols-3">
        {solutions.slice(0, 3).map((solution) => (
          <SolutionCard
            key={`solution-primary-${solution.title}`}
            title={solution.title}
            description={solution.description}
            icon={solution.icon}
            benefits={solution.benefits}
          />
        ))}
      </StaggerContainer>

      <StaggerContainer className="mb-3xl grid grid-cols-1 gap-lg md:grid-cols-2">
        {solutions.slice(3, 5).map((solution) => (
          <SolutionCard
            key={`solution-secondary-${solution.title}`}
            title={solution.title}
            description={solution.description}
            icon={solution.icon}
            benefits={solution.benefits}
          />
        ))}
      </StaggerContainer>

      <AnimateOnScroll
        variant="fadeIn"
        className="mb-3xl rounded-lg border border-border bg-muted p-xl md:p-2xl"
      >
        <h2 className="mb-xl text-center text-heading-1">
          Measurable Results for Manufacturing Teams
        </h2>
        <div className="grid grid-cols-2 gap-lg md:grid-cols-4">
          {stats.map((stat, index) => (
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
        <h2 className="mb-xl text-center text-heading-1">Case Studies</h2>
      </AnimateOnScroll>

      <StaggerContainer className="mb-3xl grid grid-cols-1 gap-lg md:grid-cols-3">
        {caseStudies.map((study) => (
          <CaseStudy
            key={`${study.client}-${study.title}`}
            title={study.title}
            client={study.client}
            challenge={study.challenge}
            solution={study.solution}
            results={study.results}
          />
        ))}
      </StaggerContainer>

      <AnimateOnScroll variant="fadeInUp" className="mb-lg">
        <h2 className="mb-xl text-center text-heading-1">
          Manufacturing AI Implementation Process
        </h2>
      </AnimateOnScroll>

      <div className="relative mb-3xl">
        {/* Hairline connecting the phases. */}
        <div className="absolute bottom-0 left-6 top-6 hidden w-px bg-border md:block" />

        <div className="space-y-xl">
          {[
            {
              number: "1",
              title: "Operations Assessment & Strategy",
              description:
                "We analyze your manufacturing environment's specific challenges, data sources, and objectives to develop a targeted AI strategy.",
              checks: [
                "Comprehensive review of current maintenance and quality processes",
                "Identification of high-value AI use cases by line and function",
                "Data availability and sensor infrastructure assessment",
                "ROI and business case development",
              ],
            },
            {
              number: "2",
              title: "Solution Design & Integration",
              description:
                "We design AI solutions that integrate with your existing SCADA, MES, and ERP systems without requiring wholesale infrastructure changes.",
              checks: [
                "Sensor data ingestion and pipeline design",
                "Model selection and development for your equipment profiles",
                "Integration with existing operational systems",
                "Pilot line scoping and deployment planning",
              ],
            },
            {
              number: "3",
              title: "Pilot Deployment & Validation",
              description:
                "We deploy on a defined pilot scope, validate model performance against real production conditions, and refine before broader rollout.",
              checks: [
                "Controlled pilot deployment on target lines",
                "Model performance validation against known failure events",
                "Operator and maintenance team feedback loops",
                "Success criteria evaluation before scale-up",
              ],
            },
            {
              number: "4",
              title: "Scale-Out & Continuous Improvement",
              description:
                "We support broader rollout across lines and sites, with ongoing monitoring and model retraining as equipment and conditions evolve.",
              checks: [
                "Phased scale-out across additional lines and facilities",
                "Continuous model monitoring and drift detection",
                "Ongoing model retraining as production conditions change",
                "Performance reporting and improvement tracking",
              ],
            },
          ].map((phase, index) => (
            <AnimateOnScroll
              key={phase.number}
              variant="fadeInLeft"
              delay={index * 0.2}
              className="relative"
            >
              <div className="mb-md flex items-center">
                <div className="mr-md flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-body font-medium text-primary-foreground">
                  {phase.number}
                </div>
                <h3 className="text-heading-3">{phase.title}</h3>
              </div>
              <div className="pl-16">
                <p className="mb-md text-body-sm text-muted-foreground">
                  {phase.description}
                </p>
                <ul className="space-y-2">
                  {phase.checks.map((check) => (
                    <li key={`${phase.number}-${check}`} className="flex items-start">
                      <Check className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-brand" />
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
        <h2 className="mb-md text-heading-1">
          Ready to Transform Your Manufacturing Operations?
        </h2>
        <p className="mx-auto mb-xl max-w-2xl text-body-lg text-muted-foreground">
          Let&apos;s discuss how our AI solutions can help your manufacturing team
          reduce downtime, improve quality, and optimize production throughput.
        </p>
        <m.div whileTap={{ scale: 0.98 }}>
          <Button asChild size="lg" shape="pill">
            <Link href="/contact">Schedule a Consultation</Link>
          </Button>
        </m.div>
      </AnimateOnScroll>
    </Container>
  );
}
