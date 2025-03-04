import React from "react";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServicesStack } from "@/components/services/ServicesStack";
import { ServicesList } from "@/components/services/ServicesList";
import { ServicesCases } from "@/components/services/ServicesCases";
import { FAQSection } from "@/components/home/FAQSection";
import { CTASection } from "@/components/home/CTASection";

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
    { id: "1", name: "Python", icon: "/images/ai-solutions.png" },
    { id: "2", name: "TensorFlow", icon: "/images/ai-solutions.png" },
    { id: "3", name: "PyTorch", icon: "/images/ai-solutions.png" },
    { id: "4", name: "Azure", icon: "/images/ai-solutions.png" },
    { id: "5", name: "AWS", icon: "/images/ai-solutions.png" },
    { id: "6", name: "Docker", icon: "/images/ai-solutions.png" },
    { id: "7", name: "Kubernetes", icon: "/images/ai-solutions.png" }
  ];

  const caseStudies = [
    {
      id: "1",
      title: "Financial Services AI Transformation",
      category: "Software Development",
      description: "Helped a major bank implement AI-driven fraud detection, reducing false positives by 35%.",
      imageSrc: "/images/ai-solutions.png",
      link: "/case-studies/financial-services"
    },
    {
      id: "2",
      title: "Healthcare Data Platform",
      category: "AI Engineering",
      description: "Built a HIPAA-compliant data platform for a healthcare provider, enabling ML-driven patient insights.",
      imageSrc: "/images/ai-solutions.png",
      link: "/case-studies/healthcare"
    },
    {
      id: "3",
      title: "Retail Recommendation Engine",
      category: "Machine Learning",
      description: "Developed a personalized recommendation system that increased conversion rates by 28%.",
      imageSrc: "/images/ai-solutions.png",
      link: "/case-studies/retail"
    }
  ];

  return (
    <main className="flex min-h-screen flex-col">
      <ServicesHero 
        title="VivanceData Solutions"
        description="These days, staying ahead often means turning data and AI into business value. But with countless solutions and approaches available, how do you identify and implement what truly matters for your organization?"
      />
      
      <ServicesStack 
        title="We tackle data challenges across the full stack"
        technologies={technologies}
      />
      
      <ServicesList services={services} />
      
      <ServicesCases 
        title="Cases"
        description="Our track record spans from initial strategy development to full implementation, always focusing on practical outcomes that drive solid business value."
        cases={caseStudies}
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
