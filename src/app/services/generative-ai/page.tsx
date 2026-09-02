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
  title: "Generative AI Solutions - Vivancedata",
  description: "Leverage the power of generative AI to create content, designs, and solutions that drive innovation for your business. Custom LLM fine-tuning, image generation, and multimodal AI.",
  keywords: ["generative AI", "AI content creation", "LLM fine-tuning", "image generation", "voice synthesis", "multimodal AI"],
  openGraph: {
    title: "Generative AI Solutions - Vivancedata",
    description: "Harness the power of generative AI for content creation, design, and innovation. Custom LLM fine-tuning and multimodal AI applications.",
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
    title: "Generative AI Solutions - Vivancedata",
    description: "Harness the power of generative AI for content creation, design, and innovation.",
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
    title: "Custom LLM Fine-Tuning",
    description: "Tailor large language models to your specific business domain, terminology, and use cases for more accurate and relevant outputs.",
    icon: <Check className="h-5 w-5 text-brand" />,
  },
  {
    title: "Content Generation & Optimization",
    description: "Automate the creation of high-quality, SEO-optimized content at scale while maintaining your brand voice and standards.",
    icon: <Check className="h-5 w-5 text-brand" />,
  },
  {
    title: "Image & Design Generation",
    description: "Create professional visuals, product mockups, and design variations that align with your brand guidelines.",
    icon: <Check className="h-5 w-5 text-brand" />,
  },
  {
    title: "Voice & Audio Synthesis",
    description: "Develop custom voice assistants, audio content, and multilingual voice solutions for your products and services.",
    icon: <Check className="h-5 w-5 text-brand" />,
  },
  {
    title: "Multimodal AI Applications",
    description: "Build applications that seamlessly combine text, image, audio, and video understanding for comprehensive solutions.",
    icon: <Check className="h-5 w-5 text-brand" />,
  },
  {
    title: "Responsible AI Implementation",
    description: "Ensure your generative AI solutions are ethical, unbiased, and aligned with your organization's values and compliance requirements.",
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
    title: "Automated Customer Support",
    description: "AI-powered chatbots and virtual assistants that understand complex queries and provide helpful, contextual responses.",
    industry: "Customer Service",
  },
  {
    title: "Personalized Marketing Content",
    description: "Generate tailored marketing materials for different audience segments, products, and campaigns at scale.",
    industry: "Marketing",
  },
  {
    title: "Product Design Iteration",
    description: "Rapidly create and test multiple design variations to accelerate the product development cycle.",
    industry: "Product Development",
  },
  {
    title: "Multilingual Content Creation",
    description: "Efficiently produce and localize content across multiple languages while maintaining brand consistency.",
    industry: "Global Business",
  },
];

export default function GenerativeAIPage() {
  return (
    <Container className="py-16">
      <ServicePageHeader
        title="Generative AI Solutions"
        intro="Leverage the power of generative AI to create content, designs, and solutions that drive innovation for your business."
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
                  &quot;Summarize customer feedback and extract key product improvement opportunities...&quot;
                </div>
              </div>
              <div>
                <div className="eyebrow mb-1">← RESPONSE</div>
                <div className="text-foreground text-xs bg-muted rounded-sm p-2.5 space-y-1.5">
                  <div><span className="text-brand">1.</span> Checkout friction is top complaint (38%)</div>
                  <div><span className="text-brand">2.</span> Return policy unclear (24%)</div>
                  <div><span className="text-brand">3.</span> Mobile payment failures (19%)</div>
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
        <h2 className="text-heading-1 mb-4">Transform Your Business with Generative AI</h2>
        <p className="text-muted-foreground mb-6">
          Generative AI is revolutionizing how businesses create content, design products, and engage with customers. Our solutions help you harness this technology to automate creative processes, personalize experiences, and drive innovation across your organization.
        </p>
        <p className="text-muted-foreground mb-6">
          We work with you to identify the right generative AI applications for your specific business challenges, then develop and implement custom solutions that deliver measurable results.
        </p>
        <Button asChild className="self-start group" variant="outline">
          <Link href="/contact">
            <span>Book a call</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </ServiceHeroSplit>

      <ServiceSection heading="Our Generative AI Services">
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

      <ServiceSection heading="Popular Use Cases">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {useCases.map((useCase) => (
            <div key={useCase.title} className="bg-card p-6 rounded-xl border border-border">
              <div className="inline-block px-3 py-1 rounded-full bg-muted text-brand text-sm font-medium mb-4">
                {useCase.industry}
              </div>
              <h3 className="text-heading-3 mb-3">{useCase.title}</h3>
              <p className="text-muted-foreground">{useCase.description}</p>
            </div>
          ))}
        </div>
      </ServiceSection>
      
      <ServiceCTA
        heading="Ready to Harness the Power of Generative AI?"
        body="Let&apos;s discuss how our generative AI solutions can help your business create better content, designs, and experiences."
        actionLabel="Book a call"
      />
    </Container>
  );
}
