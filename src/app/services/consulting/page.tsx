import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { Paragraph } from "@/components/common/Paragraph";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

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
    icon: <Check className="h-5 w-5 text-blue-500" />,
  },
  {
    title: "Strategic AI Roadmap",
    description: "Develop a comprehensive plan for AI implementation that aligns with your business objectives and provides a clear path forward.",
    icon: <Check className="h-5 w-5 text-blue-500" />,
  },
  {
    title: "Use Case Identification",
    description: "Identify high-value AI applications specific to your industry and business that will deliver the greatest ROI.",
    icon: <Check className="h-5 w-5 text-blue-500" />,
  },
  {
    title: "AI Governance Framework",
    description: "Establish policies, procedures, and oversight mechanisms to ensure responsible and compliant AI implementation.",
    icon: <Check className="h-5 w-5 text-blue-500" />,
  },
  {
    title: "Vendor Selection & Management",
    description: "Navigate the complex AI vendor landscape and select the right partners for your specific needs and objectives.",
    icon: <Check className="h-5 w-5 text-blue-500" />,
  },
  {
    title: "Change Management",
    description: "Prepare your organization for AI adoption with strategies to address cultural shifts, skill gaps, and process changes.",
    icon: <Check className="h-5 w-5 text-blue-500" />,
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
          <div className="relative aspect-video overflow-hidden rounded-xl bg-blue-100 dark:bg-blue-900/20">
            <Image
              src="/images/ai-solutions.png"
              alt="AI Strategy Consulting"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
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
          {services.map((service, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
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
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
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
          ].map((phase, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 dark:text-blue-300 font-bold">{phase.step}</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">{phase.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{phase.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Develop Your AI Strategy?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Let&apos;s discuss how our consulting services can help you navigate the AI landscape and develop a strategy that drives business value.
        </p>
        <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
          <Link href="/contact">Book a Consultation</Link>
        </Button>
      </div>
    </Container>
  );
}
