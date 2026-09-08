import { Container } from "@/components/common/Container";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import {
  ServiceCTA,
  ServiceHeroSplit,
  ServicePageHeader,
  ServiceSection,
} from "@/components/services/ServicePageLayout";

export const metadata: Metadata = {
  title: "Generative AI - Vivancedata",
  description: "Language models put to work on your own material: reading the documents that arrive as PDFs, answering the phone after hours, drafting the routine writing. Fine-tuning and multimodal where they earn it.",
  keywords: ["generative AI", "AI content creation", "LLM fine-tuning", "image generation", "voice synthesis", "multimodal AI"],
  openGraph: {
    title: "Generative AI - Vivancedata",
    description: "Language models put to work on your own documents, calls and routine writing. Fine-tuning and multimodal where they earn it.",
    type: "website",
    url: "https://vivancedata.com/services/generative-ai",
    images: [
      {
        url: "https://vivancedata.com/images/ai-solutions.png",
        width: 1200,
        height: 630,
        alt: "Vivancedata Generative AI Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Generative AI - Vivancedata",
    description: "Language models put to work on your own documents, calls and routine writing.",
    images: ["https://vivancedata.com/images/ai-solutions.png"],
  },
};

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const features: Feature[] = [
  {
    title: "Fine-tuning on your own material",
    description: "A model that has read the words your trade actually uses: the part numbers, the abbreviations on a scrawled slip, the way your crews write up a job.",
    icon: <Check className="h-5 w-5 text-brand" />,
  },
  {
    title: "Drafting the routine writing",
    description: "Quotes, follow-up emails and service reports drafted from what is already in the job record, for a person to check and send.",
    icon: <Check className="h-5 w-5 text-brand" />,
  },
  {
    title: "Images and mockups",
    description: "Visuals generated to a consistent look, so a one-off flyer or a vehicle wrap does not need a whole design cycle.",
    icon: <Check className="h-5 w-5 text-brand" />,
  },
  {
    title: "Voice",
    description: "A line that answers in a voice rather than a menu, takes the address and the fault, and books the slot or escalates it.",
    icon: <Check className="h-5 w-5 text-brand" />,
  },
  {
    title: "Text, photo and audio together",
    description: "A voicemail, a photo of the panel and a typed note about the same job, read as one record instead of three.",
    icon: <Check className="h-5 w-5 text-brand" />,
  },
  {
    title: "Knowing when it is wrong",
    description: "Confidence thresholds, a person in the loop where a mistake is expensive, and a record of what the system decided and on what basis.",
    icon: <Check className="h-5 w-5 text-brand" />,
  },
];

interface UseCase {
  title: string;
  description: string;
  industry: string;
}

const useCases: UseCase[] = [
  {
    title: "The call that comes in after hours",
    description: "Takes the address, the fault and how urgent it sounds. Books what it can, and puts through what it should not be deciding.",
    industry: "Customer service",
  },
  {
    title: "Quotes and follow-ups",
    description: "The routine outbound writing drafted from what is already in the job record, so it goes out the same day instead of on Friday.",
    industry: "Sales admin",
  },
  {
    title: "Seeing a variation before committing to it",
    description: "Several versions produced quickly, so the choice gets made on something you can look at rather than a description of it.",
    industry: "Design",
  },
  {
    title: "Two languages on the same crew",
    description: "Safety notices, work orders and shift instructions produced in both languages your people read, from one source.",
    industry: "Field operations",
  },
];

export default function GenerativeAIPage() {
  return (
    <Container className="py-16">
      <ServicePageHeader
        title="Generative AI"
        intro="Language models put to work on your own material \u2014 the documents that arrive as PDFs, the calls that come in after hours, the writing nobody wants to do twice."
      />

      <ServiceHeroSplit
        visual={
          <div className="aspect-video rounded-md overflow-hidden border border-border bg-card p-4 md:p-6 flex flex-col font-mono text-sm">
            <div className="flex gap-1.5 mb-4 flex-shrink-0">
              <div className="w-3 h-3 rounded-full border border-border bg-muted" />
              <div className="w-3 h-3 rounded-full border border-border bg-muted" />
              <div className="w-3 h-3 rounded-full border border-border bg-muted" />
            </div>
            <div className="space-y-3 overflow-hidden">
              <div>
                <div className="eyebrow mb-1">› PROMPT</div>
                <div className="text-foreground text-xs bg-muted rounded-sm p-2.5 leading-relaxed">
                  &quot;Read this delivery slip and pull out the fields we post to the job record...&quot;
                </div>
              </div>
              <div>
                <div className="eyebrow mb-1">← RESPONSE</div>
                <div className="text-foreground text-xs bg-muted rounded-sm p-2.5 space-y-1.5">
                  <div><span className="text-brand">1.</span> job_ref: matched to open job</div>
                  <div><span className="text-brand">2.</span> quantity: short by two pallets</div>
                  <div><span className="text-brand">3.</span> signature: unreadable, flagged for a person</div>
                </div>
              </div>
              {/* "latency: 1.2s" sat here: a performance figure for a system
                  that has not been benchmarked. */}
              <div className="flex items-center justify-between text-mute text-xs pt-1">
                <span className="text-brand/50">fine-tuned LLM</span>
                <span>illustrative output</span>
              </div>
            </div>
          </div>
        }
      >
        <h2 className="mb-4 font-display text-serif-lg">What a language model is actually good at</h2>
        <p className="text-muted-foreground mb-6">
          A language model is very good at reading messy text and turning it into something structured, and at drafting the writing nobody wants to do twice. It is bad at anything where being confidently wrong is expensive. Most of the work is deciding which of those two a job is.
        </p>
        <p className="text-muted-foreground mb-6">
          So it starts on material you can already judge: your slips, your voicemails, the PDFs sitting in your inbox, where you know what the right answer is. If it cannot get those right, there is no point going further, and I would rather find that out in week one.
        </p>
        <Button asChild className="self-start group" variant="outline">
          <Link href="/contact">
            <span>Book a call</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </ServiceHeroSplit>

      <ServiceSection heading="What this covers">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div key={feature.title} className="bg-card p-6 rounded-xl border border-border">
              <div className="flex items-center mb-4">
                {feature.icon}
                <h3 className="text-heading-3 ml-2">{feature.title}</h3>
              </div>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </ServiceSection>

      <ServiceSection heading="Where it gets used">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {useCases.map((useCase) => (
            <div key={useCase.title} className="bg-card p-6 rounded-xl border border-border">
              <div className="mb-4 inline-block rounded-pill border border-rule px-3 py-1 text-label uppercase text-mute">
                {useCase.industry}
              </div>
              <h3 className="text-heading-3 mb-3">{useCase.title}</h3>
              <p className="text-muted-foreground">{useCase.description}</p>
            </div>
          ))}
        </div>
      </ServiceSection>
      
      <ServiceCTA
        heading="Sitting on a pile of text nobody has time to read?"
        body="Tell me the shape of it \u2014 the slips, the voicemails, the emailed PDFs \u2014 and I will tell you whether a model handles it well enough to be worth building."
        actionLabel="Book a call"
      />
    </Container>
  );
}
