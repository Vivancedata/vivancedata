import React from "react";
import { PageHero } from "@/components/common/PageHero";
import { ServicesStack } from "@/components/services/ServicesStack";
import { ServicesList } from "@/components/services/ServicesList";
import { ServicesCases } from "@/components/services/ServicesCases";
import { FAQSection } from "@/components/home/FAQSection";
import { CTASection } from "@/components/home/CTASection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Services - Vivancedata",
  description: "What I build for trade and industrial businesses: document intake, private question-answering over your own files, and workflow automation. Scoped, built on your documents, and run afterwards.",
  keywords: ["AI services", "LLM engineering", "AI implementation", "data platform", "machine learning services", "AI consulting", "team upskilling"],
  openGraph: {
    title: "AI Services - Vivancedata",
    description: "Document intake, answers from your own files, and workflow automation. Scoped, built on your documents, and run afterwards.",
    type: "website",
    url: "https://vivancedata.com/services",
    images: [
      {
        url: "https://vivancedata.com/images/ai-solutions.png",
        width: 1200,
        height: 630,
        alt: "Vivancedata AI Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Services - Vivancedata",
    description: "Document intake, answers from your own files, and workflow automation.",
    images: ["https://vivancedata.com/images/ai-solutions.png"],
  },
};

const ServicesPage = () => {
  const services = [
    {
      id: "1",
      title: "LLM engineering",
      description: "The language-model part: what the model gets asked, what it is allowed to read, and how its answer is checked before anything acts on it."
    },
    {
      id: "2",
      title: "From prototype to something that runs",
      description: "A first version on your own documents, then the unglamorous work that makes it survive a Monday: retries, error handling, an alert when a source file changes shape."
    },
    {
      id: "3",
      title: "Data plumbing",
      description: "Where documents land, how they are stored, and what feeds the model. Built on Azure, and boring on purpose."
    },
    {
      id: "4",
      title: "Getting it live, keeping it live",
      description: "Deployment, monitoring, and someone to call. An automation nobody is watching quietly stops matching reality within months."
    },
    {
      id: "5",
      title: "Training whoever runs it next",
      description: "Hands-on sessions with the people who will own this after handover, using your workflows rather than a slide deck."
    },
    {
      id: "6",
      title: "Fitting it to what you already run",
      description: "Your project system, dispatch board or MES stays where it is. The new piece reads from it and writes back to it instead of replacing it."
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
      title: "Answers from your own files",
      category: "Knowledge & Retrieval",
      description: "A private question-answering system grounded in your internal documents, answering with citations back to the source file so replies can be checked.",
      impact: "Typical build: 4-8 weeks",
      link: "/services/generative-ai",
      ctaLabel: "See what this looks like"
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
        title="Services"
        description="Most of this comes down to one question: which job in your week repeats often enough, and goes wrong clearly enough, to be worth automating first? That is where I start, and sometimes the honest answer is that nothing does yet."
      />
      
      <ServicesStack 
        title="What I build with"
        technologies={technologies}
      />
      
      <ServicesList services={services} />
      
      <ServicesCases
        title="What a build looks like"
        description="Three shapes of work I take on. Each has a fixed scope and a named deliverable, so you know what you are getting before it starts."
        cases={engagements}
      />
      
      <FAQSection 
        title="Common questions"
        description="Worth asking before you hire anyone for this, me included."
      />
      
      <CTASection 
        title="Not sure which job to start with?"
        description="Tell me which part of the week goes wrong most, and I will tell you whether it is worth building for."
        buttonText="Book a call"
        buttonLink="/contact"
      />
    </main>
  );
};

export default ServicesPage;
