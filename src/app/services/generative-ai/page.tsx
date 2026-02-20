import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { Paragraph } from "@/components/common/Paragraph";
import { Metadata } from "next";
import Image from "next/image";
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
    icon: <Check className="h-5 w-5 text-blue-500" />,
  },
  {
    title: "Content Generation & Optimization",
    description: "Automate the creation of high-quality, SEO-optimized content at scale while maintaining your brand voice and standards.",
    icon: <Check className="h-5 w-5 text-blue-500" />,
  },
  {
    title: "Image & Design Generation",
    description: "Create professional visuals, product mockups, and design variations that align with your brand guidelines.",
    icon: <Check className="h-5 w-5 text-blue-500" />,
  },
  {
    title: "Voice & Audio Synthesis",
    description: "Develop custom voice assistants, audio content, and multilingual voice solutions for your products and services.",
    icon: <Check className="h-5 w-5 text-blue-500" />,
  },
  {
    title: "Multimodal AI Applications",
    description: "Build applications that seamlessly combine text, image, audio, and video understanding for comprehensive solutions.",
    icon: <Check className="h-5 w-5 text-blue-500" />,
  },
  {
    title: "Responsible AI Implementation",
    description: "Ensure your generative AI solutions are ethical, unbiased, and aligned with your organization's values and compliance requirements.",
    icon: <Check className="h-5 w-5 text-blue-500" />,
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
          <div className="relative aspect-video overflow-hidden rounded-xl bg-blue-100 dark:bg-blue-900/20">
            <Image
              src="/images/ai-solutions.png"
              alt="Generative AI Solutions"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
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
              <div className="inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-medium mb-4">
                {useCase.industry}
              </div>
              <h3 className="text-xl font-semibold mb-3">{useCase.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{useCase.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Harness the Power of Generative AI?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Let&apos;s discuss how our generative AI solutions can help your business create better content, designs, and experiences.
        </p>
        <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
          <Link href="/contact">Get Started</Link>
        </Button>
      </div>
    </Container>
  );
}
