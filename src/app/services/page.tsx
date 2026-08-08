import React from "react";
import { PageHero } from "@/components/common/PageHero";
import { ServicesStack } from "@/components/services/ServicesStack";
import { ServicesList } from "@/components/services/ServicesList";
import { ServicesCases } from "@/components/services/ServicesCases";
import { FAQSection } from "@/components/home/FAQSection";
import { CTASection } from "@/components/home/CTASection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Services - VivanceData",
  description: "Comprehensive AI solutions including LLM engineering, AI implementation, data platform engineering, and team upskilling. Transform your business with our expert services.",
  keywords: ["AI services", "LLM engineering", "AI implementation", "data platform", "machine learning services", "AI consulting", "team upskilling"],
  openGraph: {
    title: "AI Services - VivanceData",
    description: "Comprehensive AI solutions from strategy to implementation. Expert services in LLM engineering, data platforms, and team upskilling.",
    type: "website",
    url: "https://vivancedata.com/services",
    images: [
      {
        url: "https://vivancedata.com/images/ai-solutions.png",
        width: 1200,
        height: 630,
        alt: "VivanceData AI Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Services - VivanceData",
    description: "Comprehensive AI solutions from strategy to implementation.",
    images: ["https://vivancedata.com/images/ai-solutions.png"],
  },
};

const ServicesPage = () => {
  const services = [
    {
      id: "1",
      title: "LLM Engineering",
      description: "Our expertise in LLMs allows us to create and optimize powerful AI-driven systems tailored to your needs."
    },
    {
      id: "2",
      title: "AI Implementation",
      description: "We guide you through the entire process, from prototyping to full-scale production, ensuring your AI initiatives are successful and sustainable."
    },
    {
      id: "3",
      title: "Data Platform Engineering",
      description: "We design and build scalable, robust data platforms on Azure to support your AI initiatives."
    },
    {
      id: "4",
      title: "Deploying AI Applications",
      description: "We ensure your data-centric and AI applications are deployed seamlessly, with reliability and scalability in mind."
    },
    {
      id: "5",
      title: "Upskilling Your Engineering Team",
      description: "We provide hands-on training to elevate your team's AI skills, ensuring they're equipped to handle the latest technologies and best practices."
    },
    {
      id: "6",
      title: "Integrating AI into Your Stack",
      description: "We help you incorporate AI into your current systems to enhance their capabilities without disrupting your operations."
    }
  ];

  const technologies = [
    { id: "1", name: "Python", shortLabel: "Py", tone: "bg-muted text-muted-foreground", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
    { id: "2", name: "TensorFlow", shortLabel: "TF", tone: "bg-muted text-muted-foreground", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg" },
    { id: "3", name: "PyTorch", shortLabel: "PT", tone: "bg-muted text-muted-foreground", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg" },
    { id: "4", name: "Azure", shortLabel: "Az", tone: "bg-muted text-muted-foreground", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg" },
    { id: "5", name: "AWS", shortLabel: "AWS", tone: "bg-muted text-muted-foreground", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
    { id: "6", name: "Docker", shortLabel: "DK", tone: "bg-muted text-muted-foreground", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
    { id: "7", name: "Kubernetes", shortLabel: "K8s", tone: "bg-muted text-muted-foreground", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg" },
  ];

  // Scoped offers, not client history. These describe what a build covers and
  // roughly how long it takes -- they deliberately claim no past engagements and
  // no outcome metrics. Real numbers belong here only once a named client has
  // agreed to them being published.
  const engagements = [
    {
      id: "1",
      title: "Document Intake",
      category: "Document Processing",
      description: "Pull structured fields out of invoices, forms, permits and reports, validate them against your rules, and write them into the system you already use.",
      impact: "Typical build: 3-6 weeks",
      link: "/contact"
    },
    {
      id: "2",
      title: "Answers From Your Own Files",
      category: "Knowledge & Retrieval",
      description: "A private question-answering system grounded in your internal documents, answering with citations back to the source file so replies can be checked.",
      impact: "Typical build: 4-8 weeks",
      link: "/services/generative-ai"
    },
    {
      id: "3",
      title: "Workflow Automation",
      category: "Workflow Automation",
      description: "Connect the handoffs that currently run on email and copy-paste: intake, routing, follow-up and scheduling. Then keep them running as the tools underneath change.",
      impact: "Typical build: 2-6 weeks",
      link: "/contact"
    }
  ];

  return (
    <main className="flex min-h-screen flex-col">
      <PageHero
        eyebrow="Our Services"
        title={
          <>
            VivanceData <span className="text-brand">Solutions</span>
          </>
        }
        description="These days, staying ahead often means turning data and AI into business value. But with countless solutions and approaches available, how do you identify and implement what truly matters for your organization?"
      />
      
      <ServicesStack 
        title="We tackle data challenges across the full stack"
        technologies={technologies}
      />
      
      <ServicesList services={services} />
      
      <ServicesCases
        title="What a build looks like"
        description="Three shapes of work that come up most often. Each is a fixed scope with a defined deliverable, so you know what you are getting before it starts."
        cases={engagements}
        ctaLabel="Discuss scope"
      />
      
      <FAQSection 
        title="Common Questions About Our Services"
        description="Find answers to the most common questions about our services and how we can help your business."
      />
      
      <CTASection 
        title="Ready to Transform Your Business?"
        description="Let's discuss how our AI solutions can address your specific challenges."
        buttonText="Contact Us"
        buttonLink="/contact"
      />
    </main>
  );
};

export default ServicesPage;
