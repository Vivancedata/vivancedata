import aiSolutionsImage from "@/public/images/ai-solutions.png";
import { StaticImageData } from "next/image";

export type IconType = "database" | "brain" | "shield-check" | "message-square";

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  iconType: IconType;
  image: StaticImageData;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "retail-analytics",
    title: "AI-Powered Inventory Optimization",
    client: "Global Retail Chain",
    industry: "Retail",
    challenge: "The client was struggling with inventory management across 500+ stores, leading to frequent stockouts and overstock situations that were costing millions annually.",
    solution: "We implemented a predictive analytics solution that uses machine learning to forecast demand patterns based on historical data, seasonal trends, and external factors like weather and local events.",
    results: [
      "30% reduction in stockouts",
      "25% decrease in excess inventory",
      "$4.2M annual savings in inventory costs",
      "15% improvement in customer satisfaction scores"
    ],
    technologies: ["Predictive Analytics", "Machine Learning", "Computer Vision", "Cloud Computing"],
    iconType: "database",
    image: aiSolutionsImage
  },
  {
    id: "healthcare-nlp",
    title: "Medical Records Analysis System",
    client: "National Healthcare Provider",
    industry: "Healthcare",
    challenge: "Physicians were spending 40% of their time on documentation and manual review of patient records, reducing patient care time and causing burnout.",
    solution: "We developed an NLP-based system that automatically extracts and categorizes key information from medical records, providing physicians with instant access to relevant patient data and insights.",
    results: [
      "60% reduction in documentation time",
      "35% increase in patient consultation time",
      "93% accuracy in information extraction",
      "Significant improvement in physician satisfaction"
    ],
    technologies: ["Natural Language Processing", "Machine Learning", "Healthcare AI", "HIPAA-Compliant Cloud"],
    iconType: "brain",
    image: aiSolutionsImage
  },
  {
    id: "finance-fraud",
    title: "Real-time Fraud Detection System",
    client: "International Financial Institution",
    industry: "Finance",
    challenge: "The client was experiencing increasing fraud losses despite existing rule-based detection systems, with fraudulent transactions often being identified too late.",
    solution: "We implemented an advanced AI fraud detection system that analyzes transaction patterns in real-time, using anomaly detection and behavioral analysis to identify suspicious activities instantly.",
    results: [
      "82% reduction in fraud losses",
      "95% accuracy in fraud detection",
      "Reduced false positives by 67%",
      "Real-time alerts for suspicious activities"
    ],
    technologies: ["Anomaly Detection", "Behavioral Analytics", "Real-time Processing", "Secure API Integration"],
    iconType: "shield-check",
    image: aiSolutionsImage
  },
  {
    id: "customer-service",
    title: "AI Customer Service Automation",
    client: "E-commerce Platform",
    industry: "E-commerce",
    challenge: "The client's customer service team was overwhelmed with repetitive inquiries, leading to long response times and customer dissatisfaction.",
    solution: "We developed an AI-powered customer service solution with intelligent chatbots and automated response systems that handle routine inquiries while seamlessly escalating complex issues to human agents.",
    results: [
      "75% of customer inquiries resolved automatically",
      "Average response time reduced from hours to seconds",
      "40% reduction in customer service costs",
      "Customer satisfaction increased by 35%"
    ],
    technologies: ["Natural Language Understanding", "Conversational AI", "Sentiment Analysis", "Integration APIs"],
    iconType: "message-square",
    image: aiSolutionsImage
  }
];
