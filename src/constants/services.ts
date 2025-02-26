export interface Service {
  id: string;
  title: string;
  icon: string;
  description: string;
  features: string[];
  cta: string;
}

export const services: Service[] = [
  {
    id: "generative-ai",
    title: "Generative AI Solutions",
    icon: "bot",
    description: "Leverage the power of generative AI to create content, designs, and solutions that drive innovation.",
    features: [
      "Custom large language model fine-tuning",
      "Content generation and optimization",
      "Image and design generation",
      "Voice and audio synthesis",
      "Multimodal AI applications"
    ],
    cta: "Explore Generative AI"
  },
  {
    id: "consulting",
    title: "AI Strategy Consulting",
    icon: "lightbulb",
    description: "Strategic guidance to help you identify, implement, and scale AI opportunities across your organization.",
    features: [
      "AI readiness assessment",
      "Technology selection and vendor evaluation",
      "Implementation roadmap development",
      "Change management and training",
      "ROI measurement frameworks"
    ],
    cta: "Get Strategic Guidance"
  },
  {
    id: "solutions",
    title: "Pre-built AI Solutions",
    icon: "code",
    description: "Ready-to-deploy AI solutions for common business challenges, customized to your specific needs.",
    features: [
      "Customer service automation",
      "Predictive analytics dashboards",
      "Document processing and analysis",
      "Sales forecasting and optimization",
      "Supply chain intelligence"
    ],
    cta: "View Solutions"
  }
];
