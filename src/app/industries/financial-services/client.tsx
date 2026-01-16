"use client";

import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { Paragraph } from "@/components/common/Paragraph";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { AnimateOnScroll, StaggerContainer } from "@/hooks/useAnimateOnScroll";
import { motion } from "framer-motion";

interface SolutionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  benefits: string[];
}

const SolutionCard = ({ title, description, icon, benefits }: SolutionCardProps) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
    <div className="flex items-center mb-4">
      <div className="mr-4 p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
        {icon}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
    <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Key Benefits</h4>
    <ul className="space-y-2">
      {benefits.map((benefit, index) => (
        <li key={index} className="flex items-start">
          <Check className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
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
    <p className="text-blue-600 dark:text-blue-400 text-sm mb-4">{client}</p>
    
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
        {results.map((result, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
            <span className="text-gray-700 dark:text-gray-200">{result}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

interface FinancialServicesClientProps {
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

export default function FinancialServicesClient({
  solutions,
  caseStudies,
  stats
}: FinancialServicesClientProps) {
  return (
    <Container className="py-16 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-40 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-40 left-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl -z-10" />
      
      <AnimateOnScroll variant="fadeInUp" className="text-center mb-16">
        <div className="inline-block rounded-full bg-blue-100 dark:bg-blue-900/30 px-4 py-1.5 text-sm font-medium text-blue-800 dark:text-blue-300 mb-4">
          Financial Services
        </div>
        <Heading className="text-4xl md:text-5xl mb-4">AI Solutions for Financial Services</Heading>
        <Paragraph className="max-w-3xl mx-auto text-lg">
          Transform your financial institution with our AI solutions for risk management, fraud detection, customer experience, and regulatory compliance.
        </Paragraph>
      </AnimateOnScroll>

      <div className="flex flex-col md:flex-row gap-12 mb-20">
        <AnimateOnScroll variant="fadeInLeft" className="w-full md:w-1/2">
          <div className="relative aspect-video overflow-hidden rounded-xl bg-blue-100 dark:bg-blue-900/20 shadow-xl">
            <Image
              src="/images/ai-solutions.png"
              alt="AI Solutions for Financial Services"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </AnimateOnScroll>
        
        <AnimateOnScroll variant="fadeInRight" className="w-full md:w-1/2 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Transforming Financial Services with AI</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The financial services industry is undergoing a profound transformation driven by artificial intelligence. From risk management and fraud detection to customer experience and regulatory compliance, AI is reshaping how financial institutions operate and compete.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            At VivanceData, we combine deep financial domain expertise with cutting-edge AI capabilities to help banks, insurers, investment firms, and fintechs harness the power of artificial intelligence to drive efficiency, reduce risk, enhance customer experiences, and create competitive advantages.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Button asChild className="self-start group" variant="outline">
              <Link href="/contact">
                <span>Discuss Your Financial AI Needs</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </AnimateOnScroll>
      </div>

      <AnimateOnScroll variant="fadeInUp" className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Our Financial Services AI Solutions</h2>
      </AnimateOnScroll>
      
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {solutions.slice(0, 3).map((solution, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <SolutionCard
              title={solution.title}
              description={solution.description}
              icon={solution.icon}
              benefits={solution.benefits}
            />
          </motion.div>
        ))}
      </StaggerContainer>
      
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
        {solutions.slice(3, 5).map((solution, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <SolutionCard
              title={solution.title}
              description={solution.description}
              icon={solution.icon}
              benefits={solution.benefits}
            />
          </motion.div>
        ))}
      </StaggerContainer>

      <AnimateOnScroll variant="fadeIn" className="mb-20 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 md:p-12 shadow-lg">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Measurable Results for Financial Institutions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <AnimateOnScroll key={index} variant="scaleIn" delay={index * 0.1} className="text-center">
              <motion.div 
                className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {stat.value}
              </motion.div>
              <p className="text-gray-700 dark:text-gray-200">{stat.label}</p>
            </AnimateOnScroll>
          ))}
        </div>
      </AnimateOnScroll>

      <AnimateOnScroll variant="fadeInUp" className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Case Studies</h2>
      </AnimateOnScroll>
      
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {caseStudies.map((study, index) => (
          <motion.div
            key={index}
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
          </motion.div>
        ))}
      </StaggerContainer>

      <AnimateOnScroll variant="fadeInUp" className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Financial Services AI Implementation Process</h2>
      </AnimateOnScroll>
      
      <div className="mb-20 relative">
        {/* Vertical line connecting phases */}
        <div className="absolute left-6 top-6 bottom-0 w-0.5 bg-blue-200 dark:bg-blue-900/50 hidden md:block"></div>
        
        <div className="space-y-12">
          {[
            {
              number: "1",
              title: "Financial Assessment & Strategy",
              description: "We analyze your financial institution's specific challenges, opportunities, and objectives to develop a tailored AI strategy.",
              checks: [
                "Comprehensive analysis of current processes and systems",
                "Identification of high-value AI use cases",
                "Regulatory and compliance considerations",
                "ROI and business case development"
              ]
            },
            {
              number: "2",
              title: "Solution Design & Development",
              description: "We design and develop AI solutions tailored to your specific financial services requirements and constraints.",
              checks: [
                "Data integration and preparation",
                "Model selection and development",
                "Security and compliance by design",
                "Integration with existing systems"
              ]
            },
            {
              number: "3",
              title: "Testing & Validation",
              description: "We rigorously test and validate AI solutions to ensure accuracy, reliability, and compliance before deployment.",
              checks: [
                "Model performance validation",
                "Regulatory compliance verification",
                "Security and privacy testing",
                "User acceptance testing"
              ]
            },
            {
              number: "4",
              title: "Deployment & Monitoring",
              description: "We deploy AI solutions with minimal disruption and implement continuous monitoring to ensure optimal performance.",
              checks: [
                "Phased implementation approach",
                "Performance monitoring and alerting",
                "Continuous model improvement",
                "Ongoing regulatory compliance"
              ]
            }
          ].map((phase, index) => (
            <AnimateOnScroll key={index} variant="fadeInLeft" delay={index * 0.2} className="relative">
              <div className="flex items-center mb-4">
                <motion.div 
                  className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg mr-4 flex-shrink-0"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {phase.number}
                </motion.div>
                <h3 className="text-xl font-semibold">{phase.title}</h3>
              </div>
              <div className="pl-16">
                <p className="text-gray-600 dark:text-gray-300 mb-4">{phase.description}</p>
                <ul className="space-y-2">
                  {phase.checks.map((check, i) => (
                    <motion.li 
                      key={i} 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: (index * 0.2) + (i * 0.1) }}
                    >
                      <Check className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-200">{check}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
      
      <AnimateOnScroll variant="scaleIn" className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 md:p-12 text-center shadow-xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Transform Your Financial Institution?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Let&apos;s discuss how our AI solutions can help your financial institution reduce risk, improve efficiency, enhance customer experiences, and ensure regulatory compliance.
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
            <Link href="/contact">Schedule a Consultation</Link>
          </Button>
        </motion.div>
      </AnimateOnScroll>
    </Container>
  );
}
