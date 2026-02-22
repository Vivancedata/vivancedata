import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { Paragraph } from "@/components/common/Paragraph";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Generative AI Solutions - VivanceData",
  description: "Leverage the power of generative AI to create content, designs, and solutions that drive innovation for your business. Custom LLM fine-tuning, image generation, and multimodal AI.",
  keywords: ["generative AI", "AI content creation", "LLM fine-tuning", "image generation", "voice synthesis", "multimodal AI"],
  openGraph: {
    title: "Generative AI Solutions - VivanceData",
    description: "Harness the power of generative AI for content creation, design, and innovation. Custom LLM fine-tuning and multimodal AI applications.",
    type: "website",
    url: "https://vivancedata.com/services/generative-ai",
    images: [
      {
        url: "https://vivancedata.com/images/ai-solutions.png",
        width: 1200,
        height: 630,
        alt: "VivanceData Generative AI Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Generative AI Solutions - VivanceData",
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
    icon: <Check className="h-5 w-5 text-primary" />,
  },
  {
    title: "Content Generation & Optimization",
    description: "Automate the creation of high-quality, SEO-optimized content at scale while maintaining your brand voice and standards.",
    icon: <Check className="h-5 w-5 text-primary" />,
  },
  {
    title: "Image & Design Generation",
    description: "Create professional visuals, product mockups, and design variations that align with your brand guidelines.",
    icon: <Check className="h-5 w-5 text-primary" />,
  },
  {
    title: "Voice & Audio Synthesis",
    description: "Develop custom voice assistants, audio content, and multilingual voice solutions for your products and services.",
    icon: <Check className="h-5 w-5 text-primary" />,
  },
  {
    title: "Multimodal AI Applications",
    description: "Build applications that seamlessly combine text, image, audio, and video understanding for comprehensive solutions.",
    icon: <Check className="h-5 w-5 text-primary" />,
  },
  {
    title: "Responsible AI Implementation",
    description: "Ensure your generative AI solutions are ethical, unbiased, and aligned with your organization's values and compliance requirements.",
    icon: <Check className="h-5 w-5 text-primary" />,
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
      <div className="text-center mb-16">
        <Heading className="text-4xl md:text-5xl mb-4">Generative AI Solutions</Heading>
        <Paragraph className="max-w-2xl mx-auto text-lg">
          Leverage the power of generative AI to create content, designs, and solutions that drive innovation for your business.
        </Paragraph>
      </div>

      <div className="flex flex-col md:flex-row gap-12 mb-20">
        <div className="w-full md:w-1/2">
          <div className="aspect-video rounded-xl shadow-xl overflow-hidden bg-slate-950 p-4 md:p-6 flex flex-col font-mono text-sm">
            <div className="flex gap-1.5 mb-4 flex-shrink-0">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <div className="space-y-3 overflow-hidden">
              <div>
                <div className="text-purple-400/60 text-xs mb-1">› PROMPT</div>
                <div className="text-slate-300 text-xs bg-white/5 rounded-lg p-2.5 leading-relaxed">
                  &quot;Summarize customer feedback and extract key product improvement opportunities...&quot;
                </div>
              </div>
              <div>
                <div className="text-green-400/60 text-xs mb-1">← RESPONSE</div>
                <div className="text-slate-300 text-xs bg-white/5 rounded-lg p-2.5 space-y-1.5">
                  <div><span className="text-primary">1.</span> Checkout friction is top complaint (38%)</div>
                  <div><span className="text-primary">2.</span> Return policy unclear (24%)</div>
                  <div><span className="text-primary">3.</span> Mobile payment failures (19%)</div>
                </div>
              </div>
              <div className="flex items-center justify-between text-slate-600 text-xs pt-1">
                <span className="text-primary/50">fine-tuned LLM</span>
                <span>latency: 1.2s</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Transform Your Business with Generative AI</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Generative AI is revolutionizing how businesses create content, design products, and engage with customers. Our solutions help you harness this technology to automate creative processes, personalize experiences, and drive innovation across your organization.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We work with you to identify the right generative AI applications for your specific business challenges, then develop and implement custom solutions that deliver measurable results.
          </p>
          <Button asChild className="self-start group" variant="outline">
            <Link href="/contact">
              <span>Schedule a Consultation</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="mb-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Our Generative AI Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div key={feature.title} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-4">
                {feature.icon}
                <h3 className="text-xl font-semibold ml-2">{feature.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Popular Use Cases</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {useCases.map((useCase) => (
            <div key={useCase.title} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/20 text-primary text-sm font-medium mb-4">
                {useCase.industry}
              </div>
              <h3 className="text-xl font-semibold mb-3">{useCase.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{useCase.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Harness the Power of Generative AI?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Let&apos;s discuss how our generative AI solutions can help your business create better content, designs, and experiences.
        </p>
        <Button asChild size="lg">
          <Link href="/contact">Get Started</Link>
        </Button>
      </div>
    </Container>
  );
}
