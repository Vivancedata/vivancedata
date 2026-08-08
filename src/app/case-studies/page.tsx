import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { Paragraph } from "@/components/common/Paragraph";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// These illustrations depict the SHAPE of each system, never its results.
// They previously rendered invented metrics ("↑ 68% Alert Precision") that
// contradicted the composite-example disclaimer further down this page.
const PipelineIllustration = ({ label, steps }: { label: string; steps: string[] }) => (
  <div className="bg-card h-full w-full relative overflow-hidden border-b border-border">
    <div className="absolute inset-0 p-8 flex flex-col justify-center">
      <div className="eyebrow mb-4">{label}</div>
      <div className="space-y-3">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full shrink-0 ${i < steps.length - 1 ? "bg-brand" : "bg-border"}`} />
            <div className={`h-0.5 flex-1 rounded ${i < steps.length - 1 ? "bg-brand/30" : "bg-border"}`} />
            <span className="text-mute text-xs w-24 text-right">{step}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const CaseStudyIllustration = ({ industry }: { industry: string }) => {
  if (industry === "Financial Services") {
    return (
      <PipelineIllustration
        label="// Risk Triage Flow"
        steps={["Transaction Feed", "Risk Scoring", "Case Triage", "Analyst Review"]}
      />
    );
  }
  if (industry === "Healthcare") {
    return (
      <div className="bg-card h-full w-full relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 p-8 flex flex-col justify-center">
          <div className="eyebrow mb-4">// Clinical NLP Pipeline</div>
          <div className="space-y-3">
            {["Chart History", "NLP Extraction", "Summarization", "Review"].map((step, i) => (
              <div key={step} className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full shrink-0 ${i < 3 ? "bg-brand" : "bg-border"}`} />
                <div className={`h-0.5 flex-1 rounded ${i < 3 ? "bg-brand/30" : "bg-border"}`} />
                <span className="text-mute text-xs w-24 text-right">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (industry === "Retail") {
    return (
      <PipelineIllustration
        label="// Inventory Intelligence"
        steps={["Sales History", "Demand Forecast", "Stock Signals", "Planner Review"]}
      />
    );
  }
  return <div className="bg-muted h-full w-full" />;
};

export const metadata: Metadata = {
  title: "Example Engagements - VivanceData AI Solutions",
  description: "Composite examples showing how AI engagements are scoped and delivered in financial services, healthcare and retail -- the problem, the approach, and what gets handed over.",
  keywords: ["AI engagements", "AI implementation", "AI scoping", "AI delivery", "AI solutions", "machine learning projects"],
  openGraph: {
    title: "Example Engagements - VivanceData",
    description: "Composite examples of how AI work is scoped and delivered across fraud triage, clinical documentation and inventory planning.",
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
    title: "Example Engagements - VivanceData",
    description: "Composite examples of how AI work is scoped and delivered.",
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
          <div className="bg-warning/10 border border-warning rounded-md p-4 text-sm text-foreground">
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
              <div className="inline-block px-3 py-1 rounded-full bg-muted text-brand dark:text-brand/80 text-sm font-medium mb-4">
                {study.industry}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{study.title}</h2>
              
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Challenge</h3>
                <p className="text-muted-foreground">{study.challenge}</p>
              </div>
              
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Solution</h3>
                <p className="text-muted-foreground">{study.solution}</p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Results</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  {study.results.map((result) => (
                    <li key={`${study.id}-${result}`}>{result}</li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-24 text-center bg-muted rounded-xl p-8 md:p-12">
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
