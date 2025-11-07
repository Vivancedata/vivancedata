import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { Paragraph } from "@/components/common/Paragraph";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Industry Solutions - VivanceData",
  description: "Discover our specialized AI solutions tailored to the unique challenges and opportunities in your industry. Solutions for finance, healthcare, retail, and more.",
  keywords: ["industry solutions", "vertical AI", "industry-specific AI", "AI for finance", "AI for healthcare", "AI for retail", "AI for manufacturing"],
  openGraph: {
    title: "Industry-Specific AI Solutions - VivanceData",
    description: "Specialized AI solutions tailored to your industry. Financial services, healthcare, retail, manufacturing, energy, and public sector.",
    type: "website",
    url: "https://vivancedata.com/industries",
    images: [
      {
        url: "https://vivancedata.com/images/ai-solutions.png",
        width: 1200,
        height: 630,
        alt: "VivanceData Industry Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Industry-Specific AI Solutions - VivanceData",
    description: "Specialized AI solutions tailored to your industry.",
    images: ["https://vivancedata.com/images/ai-solutions.png"],
  },
};

interface IndustryCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
}

const IndustryCard = ({ title, description, image, href }: IndustryCardProps) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden group">
    <div className="relative aspect-video">
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">{title}</h3>
    </div>
    <div className="p-6">
      <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      <Button asChild variant="outline" className="group">
        <Link href={href}>
          <span>Explore Solutions</span>
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Button>
    </div>
  </div>
);

export default function IndustriesPage() {
  const industries = [
    {
      title: "Financial Services",
      description: "AI solutions for risk management, fraud detection, customer experience, and regulatory compliance in banking, insurance, and investment.",
      image: "/images/ai-solutions.png",
      href: "/industries/financial-services"
    },
    {
      title: "Healthcare",
      description: "Transformative AI applications for patient care, clinical decision support, operational efficiency, and medical research.",
      image: "/images/ai-solutions.png",
      href: "/industries/healthcare"
    },
    {
      title: "Retail & E-commerce",
      description: "Intelligent solutions for personalization, inventory management, demand forecasting, and enhanced customer experiences.",
      image: "/images/ai-solutions.png",
      href: "/industries/retail"
    },
    {
      title: "Manufacturing",
      description: "AI-powered systems for predictive maintenance, quality control, supply chain optimization, and smart factory operations.",
      image: "/images/ai-solutions.png",
      href: "/industries/manufacturing"
    },
    {
      title: "Energy & Utilities",
      description: "Advanced AI for grid management, energy optimization, predictive maintenance, and sustainable resource planning.",
      image: "/images/ai-solutions.png",
      href: "/industries/energy"
    },
    {
      title: "Public Sector",
      description: "AI solutions for citizen services, public safety, infrastructure management, and policy analysis.",
      image: "/images/ai-solutions.png",
      href: "/industries/public-sector"
    }
  ];

  return (
    <Container className="py-16">
      <div className="text-center mb-16">
        <Heading className="text-4xl md:text-5xl mb-4">Industry-Specific AI Solutions</Heading>
        <Paragraph className="max-w-3xl mx-auto text-lg">
          Discover our specialized AI solutions tailored to the unique challenges and opportunities in your industry.
        </Paragraph>
      </div>

      <div className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => (
            <IndustryCard
              key={index}
              title={industry.title}
              description={industry.description}
              image={industry.image}
              href={industry.href}
            />
          ))}
        </div>
      </div>

      <div className="mb-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Why Choose Industry-Specific AI Solutions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Domain Expertise",
              description: "Our solutions are built with deep understanding of industry-specific processes, regulations, and challenges."
            },
            {
              title: "Faster Time-to-Value",
              description: "Pre-built industry components and accelerators reduce implementation time and speed up ROI."
            },
            {
              title: "Tailored Outcomes",
              description: "Solutions designed to address the specific KPIs and metrics that matter most in your industry."
            }
          ].map((benefit, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Our Industry Approach</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { number: "01", title: "Industry Assessment", description: "We analyze your specific industry context, challenges, and opportunities." },
            { number: "02", title: "Solution Design", description: "We design AI solutions tailored to your industry's unique requirements and regulations." },
            { number: "03", title: "Implementation", description: "We deploy industry-optimized AI systems with minimal disruption to your operations." },
            { number: "04", title: "Continuous Improvement", description: "We continuously refine and enhance your solutions based on industry developments." }
          ].map((step, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 dark:text-blue-300 font-bold">{step.number}</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Transform Your Industry?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Let&apos;s discuss how our industry-specific AI solutions can address your unique challenges and opportunities.
        </p>
        <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
          <Link href="/contact">Schedule a Consultation</Link>
        </Button>
      </div>
    </Container>
  );
}
