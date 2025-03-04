import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { Paragraph } from "@/components/common/Paragraph";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Case Studies - VivanceData AI Solutions",
  description: "Explore real-world examples of how our AI solutions have transformed businesses across various industries.",
  keywords: ["AI case studies", "business transformation", "AI implementation", "success stories", "ROI", "AI solutions"],
};

interface CaseStudy {
  id: string;
  title: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  image: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: "financial-services",
    title: "AI-Powered Fraud Detection for Major Bank",
    industry: "Financial Services",
    challenge: "A leading bank was struggling with high false positive rates in their fraud detection system, causing customer frustration and operational inefficiencies.",
    solution: "We implemented a custom machine learning model that analyzed transaction patterns and customer behavior to more accurately identify fraudulent activities.",
    results: [
      "Reduced false positives by 35%",
      "Improved fraud detection rate by 28%",
      "Saved $2.4M annually in operational costs",
      "Enhanced customer satisfaction scores by 18%"
    ],
    image: "/images/ai-solutions.png"
  },
  {
    id: "healthcare",
    title: "Predictive Analytics Platform for Healthcare Provider",
    industry: "Healthcare",
    challenge: "A healthcare network needed to improve patient outcomes while reducing readmission rates and operational costs.",
    solution: "We developed a HIPAA-compliant data platform that used machine learning to predict patient risks and recommend preventive interventions.",
    results: [
      "Decreased readmission rates by 22%",
      "Reduced average length of stay by 1.5 days",
      "Improved resource allocation efficiency by 15%",
      "Generated $3.2M in annual savings"
    ],
    image: "/images/ai-solutions.png"
  },
  {
    id: "retail",
    title: "Personalized Recommendation Engine for E-commerce",
    industry: "Retail",
    challenge: "An e-commerce retailer wanted to increase conversion rates and average order value through more relevant product recommendations.",
    solution: "We built a sophisticated recommendation system that analyzed browsing behavior, purchase history, and product attributes to deliver highly personalized suggestions.",
    results: [
      "Increased conversion rates by 28%",
      "Boosted average order value by 15%",
      "Improved customer retention by 12%",
      "Generated $5.7M in incremental revenue"
    ],
    image: "/images/ai-solutions.png"
  }
];

export default function CaseStudiesPage() {
  return (
    <Container className="py-16">
      <div className="text-center mb-16">
        <Heading className="text-4xl md:text-5xl mb-4">Our Success Stories</Heading>
        <Paragraph className="max-w-2xl mx-auto text-lg">
          Explore how our AI solutions have helped businesses across various industries achieve measurable results and competitive advantages.
        </Paragraph>
      </div>

      <div className="space-y-24">
        {caseStudies.map((study, index) => (
          <div 
            key={study.id}
            className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-12`}
          >
            <div className="w-full md:w-1/2">
              <div className="relative aspect-video overflow-hidden rounded-xl bg-blue-100 dark:bg-blue-900/20">
                <Image
                  src={study.image}
                  alt={study.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
            
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <div className="inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-medium mb-4">
                {study.industry}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{study.title}</h2>
              
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Challenge</h3>
                <p className="text-gray-600 dark:text-gray-300">{study.challenge}</p>
              </div>
              
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Solution</h3>
                <p className="text-gray-600 dark:text-gray-300">{study.solution}</p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Results</h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                  {study.results.map((result, i) => (
                    <li key={i}>{result}</li>
                  ))}
                </ul>
              </div>
              
              <Button className="self-start group" variant="outline">
                <span>Read Full Case Study</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-24 text-center bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 md:p-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Achieve Similar Results?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Let&apos;s discuss how our AI solutions can help your business overcome challenges and drive measurable outcomes.
        </p>
        <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
          <Link href="/contact">Schedule a Consultation</Link>
        </Button>
      </div>
    </Container>
  );
}
