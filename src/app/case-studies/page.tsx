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

const ILLUSTRATIONS: Record<string, { label: string; steps: string[] }> = {
  Construction: {
    label: "// Submittal Intake",
    steps: ["Emailed PDF", "Field Extraction", "Validation", "Project System"],
  },
  "HVAC & Trades": {
    label: "// After-Hours Call Capture",
    steps: ["Missed Call", "Transcribed Intake", "Triaged Urgency", "Booked or Escalated"],
  },
  "Logistics & Fleet": {
    label: "// Proof of Delivery",
    steps: ["Driver Photo", "Field Extraction", "Match to Load", "Billing"],
  },
};

const CaseStudyIllustration = ({ industry }: { industry: string }) => {
  const illustration = ILLUSTRATIONS[industry];
  if (!illustration) {
    return <div className="bg-muted h-full w-full" />;
  }
  return <PipelineIllustration label={illustration.label} steps={illustration.steps} />;
};

export const metadata: Metadata = {
  title: "Example Engagements - VivanceData AI Solutions",
  description: "Composite examples showing how AI engagements are scoped and delivered in construction, the trades and logistics -- the problem, the approach, and what gets handed over.",
  keywords: ["AI engagements", "AI implementation", "AI scoping", "AI delivery", "AI solutions", "machine learning projects"],
  openGraph: {
    title: "Example Engagements - VivanceData",
    description: "Composite examples of how AI work is scoped and delivered across document intake, call capture and dispatch exceptions.",
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
    id: "construction",
    title: "Submittal and RFI Intake Workflow",
    industry: "Construction",
    challenge: "Submittals and RFIs arrived as emailed PDFs in no consistent format, and a project engineer was re-keying them into the project system by hand.",
    solution: "We built an intake workflow that extracts the fields from each document, checks them against the project's own requirements, and stages the record for a human to approve.",
    results: [
      "Re-keying replaced by review",
      "Consistent capture regardless of subcontractor format",
      "Mismatches against the spec surfaced at intake",
      "Records land in the existing project system"
    ],
  },
  {
    id: "hvac-trades",
    title: "After-Hours Call Capture",
    industry: "HVAC & Trades",
    challenge: "Calls placed after the office closed went to voicemail, and by morning the customer had usually booked whoever answered first.",
    solution: "We answered the out-of-hours calls, recorded the fault and access details in a fixed format, booked routine work, and paged the on-call technician for genuine emergencies.",
    results: [
      "Overnight calls answered rather than queued",
      "Job details captured in one consistent format",
      "Emergencies escalated, routine work booked",
      "Every call logged whether or not it converted"
    ],
  },
  {
    id: "logistics",
    title: "Load Exception Triage for Dispatch",
    industry: "Logistics & Fleet",
    challenge: "Late, short-delivered and mis-scanned loads were found when the customer phoned, because nobody was watching the board for the ones drifting off plan.",
    solution: "We monitored load status against plan, raised the loads that had gone off track, ranked them by customer impact, and wrote them to the dispatch board the team already watched.",
    results: [
      "Problem loads raised before the customer call",
      "Ranked so dispatch works the worst ones first",
      "Visible in the system dispatch already uses",
      "Fewer exceptions discovered after the fact"
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
