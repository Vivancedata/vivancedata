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
  /**
   * How far along a thing is, in this practice's own terms.
   *
   * "Pilot" was a fourth value here and it is deliberately gone. A pilot means
   * somebody else is running the thing on their own work, and this practice is
   * pre-first-client -- so two entries carrying it were claiming a client trial
   * that does not exist. Do not add it back until a named client has agreed in
   * writing that theirs can be described, which is the same bar `caseStudies.ts`
   * sets for a number.
   */
  status: "Concept" | "Research" | "Prototype";
}

export const emergingTechnologies: EmergingTechnology[] = [
  {
    title: "Multimodal Foundation Models",
    description: "One model that reads text, images and audio together. It is why a photographed delivery slip and the voicemail about the same job can go through one system instead of two.",
    iconType: "brain",
    maturity: "Growing" as const,
    timeframe: "1-2 years"
  },
  {
    title: "Neuromorphic Computing",
    description: "Chips built more like a brain than a processor, aimed at running models on a fraction of the power. Interesting for the day inspection runs on the machine rather than in a data centre. Not yet something to plan around.",
    iconType: "atom",
    maturity: "Emerging" as const,
    timeframe: "3-5 years"
  },
  {
    title: "Federated Learning",
    description: "Training a model across many devices without the data leaving any of them. The appeal here is plain: a system that gets better without your job records being pooled somewhere you cannot see.",
    iconType: "zap",
    maturity: "Growing" as const,
    timeframe: "Now-1 year"
  },
  {
    title: "Quantum Machine Learning",
    description: "Quantum hardware pointed at problems like routing and scheduling. The theory is strong; the machines are not there. It is on this list so the timescale is stated honestly rather than sold.",
    iconType: "sparkles",
    maturity: "Emerging" as const,
    timeframe: "5+ years"
  },
  {
    title: "Autonomous AI Agents",
    description: "Systems that plan several steps and act without being prompted at each one. Fine when the steps are dull and reversible, dangerous the moment one of them books a truck. Scope narrowly or not at all.",
    iconType: "rocket",
    maturity: "Emerging" as const,
    timeframe: "2-3 years"
  },
  {
    title: "Explainable AI (XAI)",
    description: "Making a system show what it read and why it decided. Not an academic concern in this work: an extracted invoice figure nobody can trace is a figure nobody should file.",
    iconType: "lightbulb",
    maturity: "Maturing" as const,
    timeframe: "Now"
  }
];

export const innovationProjects: InnovationProject[] = [
  {
    title: "Adaptive Multimodal Assistant",
    description: "One intake that takes the phone call, the photograph and the typed note about a job and files all three against it, instead of three systems each holding a third of the story.",
    technologies: ["Multimodal AI", "NLP", "Computer Vision", "Reinforcement Learning"],
    status: "Prototype"
  },
  {
    title: "Privacy-Preserving Analytics Platform",
    description: "Answering questions across several sites' records without those records being copied into one pile first.",
    technologies: ["Federated Learning", "Differential Privacy", "Secure Computing", "Analytics"],
    status: "Research"
  },
  {
    title: "Autonomous Decision Support System",
    description: "Watching live data — loads, sensor readings, calls — and putting the exceptions in front of whoever is on the board, ranked, rather than waiting to be asked.",
    technologies: ["Reinforcement Learning", "Time Series Analysis", "Causal Inference", "Decision Theory"],
    status: "Research"
  },
  {
    title: "Quantum Routing and Scheduling",
    description: "Routing and scheduling on hybrid classical-quantum hardware. Years away, and on the list because the problem underneath it — a day's work for a yard full of vans — is one I run into constantly.",
    technologies: ["Quantum Computing", "Optimization Algorithms", "Hybrid Computing", "Operations Research"],
    status: "Concept"
  },
  {
    title: "Generative Design Collaborator",
    description: "Drafting design options for a person to throw out quickly, rather than producing one answer that arrives looking finished.",
    technologies: ["Generative AI", "3D Modeling", "Human-AI Collaboration", "Design Theory"],
    status: "Prototype"
  },
  {
    title: "Field Document Understanding",
    description: "An extraction system for the photographed and scanned paperwork that field work produces, which reports what it could not read instead of guessing at it.",
    technologies: ["Document Intelligence", "Optical Character Recognition", "Uncertainty Estimation", "Natural Language Generation"],
    status: "Prototype"
  }
];
