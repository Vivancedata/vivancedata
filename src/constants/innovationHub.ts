/**
 * Copy for /innovation-hub.
 *
 * These arrays used to be declared inside the page component, so a wording
 * change meant editing JSX-adjacent code -- against this repo's own rule that
 * page content lives in src/constants. Icons are stored as keys rather than
 * rendered elements, the way `caseStudies.ts` already does it, so this file
 * stays free of JSX and the page owns presentation.
 */

export type TechnologyIcon = "atom" | "brain" | "lightbulb" | "rocket" | "sparkles" | "zap";

export interface EmergingTechnology {
  title: string;
  description: string;
  iconType: TechnologyIcon;
  maturity: "Emerging" | "Growing" | "Maturing";
  timeframe: string;
}

export interface InnovationProject {
  title: string;
  description: string;
  technologies: string[];
  status: "Concept" | "Research" | "Prototype" | "Pilot";
}

export const emergingTechnologies: EmergingTechnology[] = [
  {
    title: "Multimodal Foundation Models",
    description: "AI systems that can process and generate multiple types of data (text, images, audio, video) with a single model architecture.",
    iconType: "brain",
    maturity: "Growing" as const,
    timeframe: "1-2 years"
  },
  {
    title: "Neuromorphic Computing",
    description: "Computing architectures inspired by the human brain that enable more efficient AI processing and learning capabilities.",
    iconType: "atom",
    maturity: "Emerging" as const,
    timeframe: "3-5 years"
  },
  {
    title: "Federated Learning",
    description: "Machine learning technique that trains algorithms across multiple devices while keeping data localized, enhancing privacy and security.",
    iconType: "zap",
    maturity: "Growing" as const,
    timeframe: "Now-1 year"
  },
  {
    title: "Quantum Machine Learning",
    description: "Intersection of quantum computing and machine learning that promises exponential speedups for certain AI algorithms and problems.",
    iconType: "sparkles",
    maturity: "Emerging" as const,
    timeframe: "5+ years"
  },
  {
    title: "Autonomous AI Agents",
    description: "Self-directed AI systems that can perform complex tasks with minimal human intervention through planning and reasoning capabilities.",
    iconType: "rocket",
    maturity: "Emerging" as const,
    timeframe: "2-3 years"
  },
  {
    title: "Explainable AI (XAI)",
    description: "Techniques and methods that make AI decision-making processes transparent and interpretable to humans.",
    iconType: "lightbulb",
    maturity: "Maturing" as const,
    timeframe: "Now"
  }
];

export const innovationProjects: InnovationProject[] = [
  {
    title: "Adaptive Multimodal Assistant",
    description: "An AI assistant that seamlessly combines text, voice, and visual understanding to provide context-aware support across multiple domains.",
    technologies: ["Multimodal AI", "NLP", "Computer Vision", "Reinforcement Learning"],
    status: "Prototype"
  },
  {
    title: "Privacy-Preserving Analytics Platform",
    description: "A data analytics system that enables powerful insights while maintaining strict privacy guarantees through federated learning and differential privacy.",
    technologies: ["Federated Learning", "Differential Privacy", "Secure Computing", "Analytics"],
    status: "Pilot"
  },
  {
    title: "Autonomous Decision Support System",
    description: "An AI system that provides real-time decision recommendations by continuously monitoring data streams and adapting to changing conditions.",
    technologies: ["Reinforcement Learning", "Time Series Analysis", "Causal Inference", "Decision Theory"],
    status: "Research"
  },
  {
    title: "Quantum-Enhanced Optimization Engine",
    description: "A hybrid classical-quantum system for solving complex optimization problems in routing, scheduling, and resource allocation.",
    technologies: ["Quantum Computing", "Optimization Algorithms", "Hybrid Computing", "Operations Research"],
    status: "Concept"
  },
  {
    title: "Generative Design Collaborator",
    description: "An AI system that works alongside human designers to generate and refine creative solutions for product design, architecture, and visual arts.",
    technologies: ["Generative AI", "3D Modeling", "Human-AI Collaboration", "Design Theory"],
    status: "Prototype"
  },
  {
    title: "Field Document Understanding",
    description: "An extraction system for the photographed and scanned paperwork that field work produces, which reports what it could not read instead of guessing at it.",
    technologies: ["Document Intelligence", "Optical Character Recognition", "Uncertainty Estimation", "Natural Language Generation"],
    status: "Pilot"
  }
];
