"use client";

import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { Paragraph } from "@/components/common/Paragraph";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { AnimateOnScroll, StaggerContainer } from "@/hooks/useAnimateOnScroll";
import { m } from "framer-motion";

interface SolutionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  benefits: string[];
}

const SolutionCard = ({ title, description, icon, benefits }: SolutionCardProps) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
    <div className="flex items-center mb-4">
      <div className="mr-4 p-3 bg-primary/10 dark:bg-primary/20 rounded-full">
        {icon}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
    <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Key Benefits</h4>
    <ul className="space-y-2">
      {benefits.map((benefit) => (
        <li key={`${title}-benefit-${benefit}`} className="flex items-start">
          <Check className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
          <span className="text-gray-700 dark:text-gray-200">{benefit}</span>
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
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-primary text-sm mb-4">{client}</p>

    <div className="mb-4">
      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Challenge</h4>
      <p className="text-gray-700 dark:text-gray-200">{challenge}</p>
    </div>

    <div className="mb-4">
      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Solution</h4>
      <p className="text-gray-700 dark:text-gray-200">{solution}</p>
    </div>

    <div>
      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Results</h4>
      <ul className="space-y-1">
        {results.map((result) => (
          <li key={`${title}-result-${result}`} className="flex items-start">
            <Check className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
            <span className="text-gray-700 dark:text-gray-200">{result}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

interface EnergyClientProps {
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

export default function EnergyClient({
  solutions,
  caseStudies,
  stats,
}: EnergyClientProps) {
  return (
    <Container className="py-16 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-40 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-40 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl -z-10" />

      <AnimateOnScroll variant="fadeInUp" className="text-center mb-16">
        <div className="inline-block rounded-full bg-primary/10 dark:bg-primary/20 px-4 py-1.5 text-sm font-medium text-primary mb-4">
          Energy &amp; Utilities
        </div>
        <Heading className="text-4xl md:text-5xl mb-4">AI Solutions for Energy &amp; Utilities</Heading>
        <Paragraph className="max-w-3xl mx-auto text-lg">
          Optimize grid management, predict asset failures, and improve demand forecasting with AI solutions for energy and utility operations.
        </Paragraph>
      </AnimateOnScroll>

      <div className="flex flex-col md:flex-row gap-12 mb-20">
        <AnimateOnScroll variant="fadeInLeft" className="w-full md:w-1/2">
          <div className="aspect-video rounded-xl shadow-xl overflow-hidden bg-slate-900 p-6 md:p-8 flex flex-col">
            <div className="text-primary/60 text-xs font-mono mb-4">Grid &amp; Asset Intelligence</div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-white/40 text-xs mb-1">Grid Anomalies Detected</div>
                <div className="text-2xl font-bold text-primary">↑ 3×</div>
                <div className="text-white/30 text-xs">vs. rule-based system</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-white/40 text-xs mb-1">Maintenance Cost</div>
                <div className="text-2xl font-bold text-blue-400">↓ 22%</div>
                <div className="text-white/30 text-xs">pilot asset class</div>
              </div>
            </div>
            <div className="space-y-2">
              {[
                { label: "Real-time grid anomaly detection", color: "bg-primary" },
                { label: "Renewable generation forecasting", color: "bg-yellow-400" },
                { label: "Asset health scoring and alerting", color: "bg-blue-400" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${item.color} flex-shrink-0`} />
                  <span className="text-white/60 text-xs">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll variant="fadeInRight" className="w-full md:w-1/2 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Transforming Energy &amp; Utilities with AI</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Energy and utility operators face growing complexity — aging infrastructure, increasing renewable penetration, and rising customer expectations. AI is transforming how grid operators, asset managers, and operations teams detect problems and optimize performance.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            At VivanceData, we design AI workflows for energy that integrate with existing SCADA and asset management systems — focused on reliability, safety, and measurable operational improvement.
          </p>
          <m.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Button asChild className="self-start group" variant="outline">
              <Link href="/contact">
                <span>Discuss Your Energy AI Needs</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </m.div>
        </AnimateOnScroll>
      </div>

      <AnimateOnScroll variant="fadeInUp" className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Our Energy &amp; Utilities AI Solutions</h2>
      </AnimateOnScroll>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {solutions.slice(0, 3).map((solution) => (
          <m.div
            key={`solution-primary-${solution.title}`}
            whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <SolutionCard
              title={solution.title}
              description={solution.description}
              icon={solution.icon}
              benefits={solution.benefits}
            />
          </m.div>
        ))}
      </StaggerContainer>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
        {solutions.slice(3, 5).map((solution) => (
          <m.div
            key={`solution-secondary-${solution.title}`}
            whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <SolutionCard
              title={solution.title}
              description={solution.description}
              icon={solution.icon}
              benefits={solution.benefits}
            />
          </m.div>
        ))}
      </StaggerContainer>

      <AnimateOnScroll variant="fadeIn" className="mb-20 bg-primary/5 dark:bg-primary/10 rounded-xl p-8 md:p-12 shadow-lg">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Measurable Results for Energy &amp; Utility Teams</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <AnimateOnScroll key={stat.label} variant="scaleIn" delay={index * 0.1} className="text-center">
              <m.div
                className="text-4xl md:text-5xl font-bold text-primary mb-2"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {stat.value}
              </m.div>
              <p className="text-gray-700 dark:text-gray-200">{stat.label}</p>
            </AnimateOnScroll>
          ))}
        </div>
      </AnimateOnScroll>

      <AnimateOnScroll variant="fadeInUp" className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Case Studies</h2>
      </AnimateOnScroll>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {caseStudies.map((study) => (
          <m.div
            key={`${study.client}-${study.title}`}
            whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <CaseStudy
              title={study.title}
              client={study.client}
              challenge={study.challenge}
              solution={study.solution}
              results={study.results}
            />
          </m.div>
        ))}
      </StaggerContainer>

      <AnimateOnScroll variant="fadeInUp" className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Energy &amp; Utilities AI Implementation Process</h2>
      </AnimateOnScroll>

      <div className="mb-20 relative">
        {/* Vertical line connecting phases */}
        <div className="absolute left-6 top-6 bottom-0 w-0.5 bg-primary/20 dark:bg-primary/30 hidden md:block"></div>

        <div className="space-y-12">
          {[
            {
              number: "1",
              title: "Operational Assessment & Strategy",
              description: "We analyze your operations team's specific challenges, data landscape, and objectives to develop a tailored AI strategy.",
              checks: [
                "Review of existing SCADA, historian, and asset management systems",
                "Identification of high-value AI use cases for your asset mix",
                "Safety and regulatory considerations for AI deployment",
                "ROI and business case development",
              ],
            },
            {
              number: "2",
              title: "Solution Design & Development",
              description: "We design and develop AI solutions tailored to your grid, asset, and operational requirements.",
              checks: [
                "Data integration from operational and sensor systems",
                "Model selection and development for your use cases",
                "Safety and reliability by design",
                "Integration with existing operational workflows",
              ],
            },
            {
              number: "3",
              title: "Testing & Validation",
              description: "We rigorously test and validate AI solutions against historical operational data before live deployment.",
              checks: [
                "Backtesting against historical grid and asset events",
                "Safety and reliability validation",
                "Operator acceptance testing and feedback loops",
                "Performance benchmarking vs. existing systems",
              ],
            },
            {
              number: "4",
              title: "Deployment & Monitoring",
              description: "We deploy AI solutions with minimal disruption and implement continuous monitoring to ensure sustained performance.",
              checks: [
                "Phased rollout aligned with operational schedules",
                "Real-time performance monitoring and alerting",
                "Continuous model improvement as new data arrives",
                "Ongoing operator training and support",
              ],
            },
          ].map((phase, index) => (
            <AnimateOnScroll key={phase.number} variant="fadeInLeft" delay={index * 0.2} className="relative">
              <div className="flex items-center mb-4">
                <m.div
                  className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg mr-4 flex-shrink-0"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {phase.number}
                </m.div>
                <h3 className="text-xl font-semibold">{phase.title}</h3>
              </div>
              <div className="pl-16">
                <p className="text-gray-600 dark:text-gray-300 mb-4">{phase.description}</p>
                <ul className="space-y-2">
                  {phase.checks.map((check, i) => (
                    <m.li
                      key={`${phase.number}-${check}`}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.2 + i * 0.1 }}
                    >
                      <Check className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-200">{check}</span>
                    </m.li>
                  ))}
                </ul>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>

      <AnimateOnScroll variant="scaleIn" className="bg-primary/5 dark:bg-primary/10 rounded-xl p-8 md:p-12 text-center shadow-xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Transform Your Energy Operations?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Let&apos;s discuss how our AI solutions can help your operations team improve grid reliability, optimize asset maintenance, and better integrate renewable generation.
        </p>
        <m.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Button asChild size="lg">
            <Link href="/contact">Schedule a Consultation</Link>
          </Button>
        </m.div>
      </AnimateOnScroll>
    </Container>
  );
}
