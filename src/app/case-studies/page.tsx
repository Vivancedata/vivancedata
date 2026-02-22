import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { Paragraph } from "@/components/common/Paragraph";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const CaseStudyIllustration = ({ industry }: { industry: string }) => {
  if (industry === "Financial Services") {
    return (
      <div className="bg-slate-900 h-full w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/30 to-slate-900" />
        <div className="absolute inset-0 p-8 flex flex-col justify-center">
          <div className="text-amber-400/40 font-mono text-xs mb-4">// Risk Triage Dashboard</div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 rounded-lg p-3">
              <div className="text-amber-400 text-2xl font-bold font-mono">↑ 68%</div>
              <div className="text-white/30 text-xs mt-1">Alert Precision</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <div className="text-amber-400 text-2xl font-bold font-mono">↓ 41%</div>
              <div className="text-white/30 text-xs mt-1">False Positives</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (industry === "Healthcare") {
    return (
      <div className="bg-slate-900 h-full w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-slate-900" />
        <div className="absolute inset-0 p-8 flex flex-col justify-center">
          <div className="text-blue-400/40 font-mono text-xs mb-4">// Clinical NLP Pipeline</div>
          <div className="space-y-3">
            {["Chart History", "NLP Extraction", "Summarization", "Review"].map((step, i) => (
              <div key={step} className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full shrink-0 ${i < 3 ? "bg-blue-400/60" : "bg-blue-400/20"}`} />
                <div className={`h-0.5 flex-1 rounded ${i < 3 ? "bg-blue-400/30" : "bg-white/10"}`} />
                <span className="text-white/30 text-xs w-24 text-right">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (industry === "Retail") {
    return (
      <div className="bg-slate-900 h-full w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/30 to-slate-900" />
        <div className="absolute inset-0 p-8 flex flex-col justify-center">
          <div className="text-orange-400/40 font-mono text-xs mb-4">// Inventory Intelligence</div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 rounded-lg p-3">
              <div className="text-orange-400 text-2xl font-bold font-mono">↓ 23%</div>
              <div className="text-white/30 text-xs mt-1">Overstock Risk</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <div className="text-orange-400 text-2xl font-bold font-mono">↑ 31%</div>
              <div className="text-white/30 text-xs mt-1">Planning Speed</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <div className="bg-slate-900 h-full w-full" />;
};

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
              <div className="relative aspect-video overflow-hidden rounded-xl">
                <CaseStudyIllustration industry={study.industry} />
              </div>
            </div>
            
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary/80 text-sm font-medium mb-4">
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

            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-24 text-center bg-primary/5 dark:bg-primary/10 rounded-xl p-8 md:p-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Achieve Similar Results?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Let&apos;s discuss how our AI solutions can help your business overcome challenges and drive measurable outcomes.
        </p>
        <Button asChild size="lg" >
          <Link href="/contact">Schedule a Consultation</Link>
        </Button>
      </div>
    </Container>
  );
}
