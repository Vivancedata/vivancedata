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
    title: "Inventory Planning Optimization",
    client: "Illustrative Retail Operator",
    industry: "Retail",
    challenge: "Teams were balancing frequent stockouts with excess inventory and lacked confidence in planning decisions across locations.",
    solution: "Implemented demand forecasting workflows that combine historical transactions, seasonality, and external signals to improve planning accuracy.",
    results: [
      "Lower stockout frequency in pilot categories",
      "Reduced excess inventory carrying pressure",
      "Improved replenishment confidence for planners",
      "Clear KPI tracking for ongoing iteration"
    ],
    technologies: ["Predictive Analytics", "Machine Learning", "Computer Vision", "Cloud Computing"],
    iconType: "database",
    image: aiSolutionsImage
  },
  {
    id: "healthcare-nlp",
    title: "Clinical Notes Summarization Support",
    client: "Illustrative Healthcare Network",
    industry: "Healthcare",
    challenge: "Clinical teams were spending significant time navigating fragmented records and repetitive note review.",
    solution: "Built NLP-assisted summarization and extraction workflows to surface relevant context faster while keeping human review in the loop.",
    results: [
      "Faster retrieval of relevant patient context",
      "Reduced repetitive documentation effort",
      "Higher consistency in structured data capture",
      "Improved clinician workflow satisfaction"
    ],
    technologies: ["Natural Language Processing", "Machine Learning", "Healthcare AI", "HIPAA-Compliant Cloud"],
    iconType: "brain",
    image: aiSolutionsImage
  },
  {
    id: "finance-fraud",
    title: "Transaction Risk Prioritization",
    client: "Illustrative Financial Institution",
    industry: "Finance",
    challenge: "Existing rule sets generated large alert volumes, making it difficult for risk teams to prioritize true positives quickly.",
    solution: "Introduced anomaly scoring and behavioral signals to rank transaction risk and improve investigator triage workflows.",
    results: [
      "Higher precision in alert triage",
      "Faster investigator response time",
      "Reduced noise from low-confidence alerts",
      "Improved explainability for analyst review"
    ],
    technologies: ["Anomaly Detection", "Behavioral Analytics", "Real-time Processing", "Secure API Integration"],
    iconType: "shield-check",
    image: aiSolutionsImage
  },
  {
    id: "customer-service",
    title: "Customer Support Workflow Automation",
    client: "Illustrative Commerce Platform",
    industry: "E-commerce",
    challenge: "Support teams were overloaded by repetitive requests, causing long queue times and inconsistent handoffs.",
    solution: "Implemented intent routing and guided response automation for routine requests with explicit escalation paths to human agents.",
    results: [
      "Faster first-response handling for common requests",
      "More consistent escalation to specialist teams",
      "Reduced manual queue pressure",
      "Improved support quality visibility"
    ],
    technologies: ["Natural Language Understanding", "Conversational AI", "Sentiment Analysis", "Integration APIs"],
    iconType: "message-square",
    image: aiSolutionsImage
  }
];
