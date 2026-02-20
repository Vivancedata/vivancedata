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
  description: "Explore real-world examples of how our AI solutions have transformed businesses across various industries. See measurable results in financial services, healthcare, and retail.",
  keywords: ["AI case studies", "business transformation", "AI implementation", "success stories", "ROI", "AI solutions", "machine learning results"],
  openGraph: {
    title: "AI Case Studies - VivanceData",
    description: "See how AI solutions transform businesses across industries. Real results in fraud detection, healthcare analytics, and personalized recommendations.",
    type: "website",
    url: "https://vivancedata.com/case-studies",
    images: [
      {
        url: "https://vivancedata.com/images/ai-solutions.png",
        width: 1200,
        height: 630,
        alt: "VivanceData Case Studies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Case Studies - VivanceData",
    description: "See how AI solutions transform businesses across industries.",
    images: ["https://vivancedata.com/images/ai-solutions.png"],
  },
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
    title: "Transaction Risk Prioritization Workflow",
    industry: "Financial Services",
    challenge: "Risk teams were spending too much effort reviewing low-confidence alerts and missing opportunities to prioritize high-risk cases faster.",
    solution: "We designed a scored triage workflow using anomaly signals and behavior patterns to improve review prioritization and explainability.",
    results: [
      "Higher precision in alert triage",
      "Faster analyst response on high-risk events",
      "Reduced low-value manual investigations",
      "Improved auditability of risk decisions"
    ],
    image: "/images/ai-solutions.png"
  },
  {
    id: "healthcare",
    title: "Clinical Notes Summarization Support",
    industry: "Healthcare",
    challenge: "Clinical staff needed quicker access to relevant chart history without increasing documentation burden.",
    solution: "We implemented NLP-assisted extraction and summarization patterns integrated into existing review workflows.",
    results: [
      "Faster retrieval of key patient context",
      "Reduced repetitive note review effort",
      "More consistent documentation structure",
      "Improved clinician workflow satisfaction"
    ],
    image: "/images/ai-solutions.png"
  },
  {
    id: "retail",
    title: "Merchandising & Inventory Decision Support",
    industry: "Retail",
    challenge: "Merchandising and planning teams lacked a unified view for demand shifts and category-level risk.",
    solution: "We built decision support dashboards and forecast signals to improve replenishment and promotion planning.",
    results: [
      "Reduced category-level stock pressure",
      "Improved forecast-driven planning confidence",
      "Better cross-team visibility on inventory risk",
      "Faster promotion planning cycles"
    ],
    image: "/images/ai-solutions.png"
  }
];

export default function CaseStudiesPage() {
  return (
    <Container className="py-16">
      <div className="text-center mb-16">
        <Heading className="text-4xl md:text-5xl mb-4">Example AI Solutions</Heading>
        <Paragraph className="max-w-2xl mx-auto text-lg">
          Explore representative examples of how AI solutions can transform businesses across various industries and deliver measurable results.
        </Paragraph>
        <div className="mt-6 max-w-3xl mx-auto">
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 text-sm text-amber-800 dark:text-amber-200">
            <p className="font-medium">Note: These are composite examples based on typical AI implementations across multiple organizations. Metrics shown represent realistic outcomes from similar projects in each industry.</p>
          </div>
        </div>
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
                  {study.results.map((result) => (
                    <li key={`${study.id}-${result}`}>{result}</li>
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
