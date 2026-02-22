import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { Paragraph } from "@/components/common/Paragraph";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Target } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Strategy Consulting - VivanceData",
  description: "Expert guidance to help you develop and implement an effective AI strategy that aligns with your business goals and delivers measurable results.",
  keywords: ["AI strategy", "AI consulting", "digital transformation", "AI roadmap", "AI implementation", "AI governance"],
  openGraph: {
    title: "AI Strategy Consulting - VivanceData",
    description: "Expert guidance for developing and implementing effective AI strategies. From readiness assessment to implementation.",
    type: "website",
    url: "https://vivancedata.com/services/consulting",
    images: [
      {
        url: "https://vivancedata.com/images/ai-solutions.png",
        width: 1200,
        height: 630,
        alt: "VivanceData AI Strategy Consulting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Strategy Consulting - VivanceData",
    description: "Expert guidance for developing and implementing effective AI strategies.",
    images: ["https://vivancedata.com/images/ai-solutions.png"],
  },
};

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const services: Service[] = [
  {
    title: "AI Readiness Assessment",
    description: "Evaluate your organization's current capabilities, data infrastructure, and processes to determine your readiness for AI adoption.",
    icon: <Check className="h-5 w-5 text-primary" />,
  },
  {
    title: "Strategic AI Roadmap",
    description: "Develop a comprehensive plan for AI implementation that aligns with your business objectives and provides a clear path forward.",
    icon: <Check className="h-5 w-5 text-primary" />,
  },
  {
    title: "Use Case Identification",
    description: "Identify high-value AI applications specific to your industry and business that will deliver the greatest ROI.",
    icon: <Check className="h-5 w-5 text-primary" />,
  },
  {
    title: "AI Governance Framework",
    description: "Establish policies, procedures, and oversight mechanisms to ensure responsible and compliant AI implementation.",
    icon: <Check className="h-5 w-5 text-primary" />,
  },
  {
    title: "Vendor Selection & Management",
    description: "Navigate the complex AI vendor landscape and select the right partners for your specific needs and objectives.",
    icon: <Check className="h-5 w-5 text-primary" />,
  },
  {
    title: "Change Management",
    description: "Prepare your organization for AI adoption with strategies to address cultural shifts, skill gaps, and process changes.",
    icon: <Check className="h-5 w-5 text-primary" />,
  },
];

interface Benefit {
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    title: "Accelerated Time-to-Value",
    description: "Avoid costly mistakes and implementation delays with expert guidance that helps you focus on the right AI initiatives from the start.",
  },
  {
    title: "Competitive Advantage",
    description: "Stay ahead of industry trends with strategic AI applications that differentiate your business and create sustainable advantages.",
  },
  {
    title: "Risk Mitigation",
    description: "Navigate the complex ethical, legal, and regulatory landscape of AI with confidence and compliance.",
  },
  {
    title: "Optimized Investment",
    description: "Maximize ROI by prioritizing AI initiatives with the highest potential impact and avoiding unnecessary expenditures.",
  },
];

export default function ConsultingPage() {
  return (
    <Container className="py-16">
      <div className="text-center mb-16">
        <Heading className="text-4xl md:text-5xl mb-4">AI Strategy Consulting</Heading>
        <Paragraph className="max-w-2xl mx-auto text-lg">
          Expert guidance to help you develop and implement an effective AI strategy that aligns with your business goals and delivers measurable results.
        </Paragraph>
      </div>

      <div className="flex flex-col md:flex-row gap-12 mb-20">
        <div className="w-full md:w-1/2">
          <div className="aspect-video rounded-xl shadow-xl overflow-hidden bg-slate-900 p-6 md:p-8 flex flex-col">
            <div className="text-primary/60 text-xs font-mono mb-5 flex items-center gap-2">
              <Target className="w-3 h-3" /> AI Strategy Framework
            </div>
            <div className="flex justify-between gap-2 mb-6">
              {[
                { n: "1", label: "Assess" },
                { n: "2", label: "Strategize" },
                { n: "3", label: "Plan" },
                { n: "4", label: "Execute" },
              ].map(({ n, label }) => (
                <div key={n} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 text-primary text-sm font-bold flex items-center justify-center">
                    {n}
                  </div>
                  <span className="text-white/60 text-xs">{label}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {[
                "AI Readiness Assessment",
                "Strategic AI Roadmap",
                "Use Case Prioritization",
                "ROI Measurement Framework",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/70 flex-shrink-0" />
                  <span className="text-white/60 text-xs">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Strategic AI Guidance for Business Leaders</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Navigating the complex landscape of artificial intelligence can be challenging. Our consulting services provide the strategic guidance you need to make informed decisions about AI adoption and implementation.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We work closely with your leadership team to understand your business objectives, assess your current capabilities, and develop a tailored AI strategy that delivers tangible results and competitive advantages.
          </p>
          <Button asChild className="self-start group" variant="outline">
            <Link href="/contact">
              <span>Schedule a Strategy Session</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="mb-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Our Consulting Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.title} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-4">
                {service.icon}
                <h3 className="text-xl font-semibold ml-2">{service.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Why Choose Our Consulting Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Our Consulting Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: "1", title: "Discovery", description: "We begin by understanding your business objectives, challenges, and current capabilities." },
            { step: "2", title: "Assessment", description: "We evaluate your organization's AI readiness and identify potential high-value use cases." },
            { step: "3", title: "Strategy", description: "We develop a comprehensive AI roadmap tailored to your specific business needs." },
            { step: "4", title: "Implementation", description: "We provide ongoing guidance and support as you execute your AI strategy." }
          ].map((phase) => (
            <div key={phase.step} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold">{phase.step}</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">{phase.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{phase.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Develop Your AI Strategy?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Let&apos;s discuss how our consulting services can help you navigate the AI landscape and develop a strategy that drives business value.
        </p>
        <Button asChild size="lg">
          <Link href="/contact">Book a Consultation</Link>
        </Button>
      </div>
    </Container>
  );
}
