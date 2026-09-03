/**
 * Copy for /responsible-ai.
 *
 * These arrays used to be declared inside the page component, so a wording
 * change meant editing JSX-adjacent code -- against this repo's own rule that
 * page content lives in src/constants. Icons are stored as keys rather than
 * rendered elements, the way `caseStudies.ts` already does it, so this file
 * stays free of JSX and the page owns presentation.
 */

export type PrincipleIcon = "bar-chart-3" | "eye" | "file-text" | "scale" | "shield" | "users";

export interface Principle {
  iconType: PrincipleIcon;
  title: string;
  description: string;
}

export interface Phase {
  number: string;
  title: string;
  description: string;
  checks: string[];
}

export interface DesignExample {
  title: string;
  challenge: string;
  approach: string;
  outcome: string;
}

export const principles: Principle[] = [
  {
    iconType: "users",
    title: "Human-Centered & Inclusive",
    description: "We design AI systems that augment human capabilities, respect human autonomy, and consider the needs of all stakeholders, including underrepresented groups."
  },
  {
    iconType: "eye",
    title: "Transparent & Explainable",
    description: "We ensure AI systems are understandable, with clear documentation of how decisions are made and the ability to explain outcomes in human terms."
  },
  {
    iconType: "shield",
    title: "Fair & Unbiased",
    description: "We actively identify and mitigate biases in data and algorithms to ensure equitable outcomes across different demographic groups."
  },
  {
    iconType: "bar-chart-3",
    title: "Robust & Reliable",
    description: "We build AI systems that perform consistently, handle edge cases gracefully, and maintain accuracy over time with changing conditions."
  },
  {
    iconType: "scale",
    title: "Accountable & Governed",
    description: "We establish clear lines of responsibility for AI systems, with appropriate oversight and governance throughout the lifecycle."
  },
  {
    iconType: "file-text",
    title: "Privacy & Security",
    description: "We implement strong data protection measures and ensure AI systems respect privacy rights while maintaining security against threats."
  }
];

export const phases: Phase[] = [
  {
    number: "1",
    title: "Assessment & Planning",
    description: "Before any AI development begins, we conduct a thorough assessment of potential ethical implications and establish clear guidelines.",
    checks: [
      "Stakeholder impact analysis to identify affected groups",
      "Risk assessment for potential harms or unintended consequences",
      "Data privacy and security evaluation",
      "Establishment of ethical boundaries and success metrics"
    ]
  },
  {
    number: "2",
    title: "Design & Development",
    description: "During the design and development phase, we incorporate ethical considerations into the technical implementation.",
    checks: [
      "Diverse and representative data collection and curation",
      "Bias detection and mitigation in training data",
      "Explainability mechanisms built into model architecture",
      "Regular ethical reviews throughout development"
    ]
  },
  {
    number: "3",
    title: "Testing & Validation",
    description: "We rigorously test AI systems to ensure they meet our ethical standards before deployment.",
    checks: [
      "Fairness testing across different demographic groups",
      "Adversarial testing to identify potential vulnerabilities",
      "User testing with diverse participants",
      "Documentation of model limitations and edge cases"
    ]
  },
  {
    number: "4",
    title: "Deployment & Monitoring",
    description: "After deployment, we continuously monitor AI systems to ensure they maintain ethical performance.",
    checks: [
      "Ongoing performance monitoring for drift or degradation",
      "Regular audits for fairness and bias",
      "Feedback mechanisms for users to report concerns",
      "Incident response plan for addressing ethical issues"
    ]
  },
  {
    number: "5",
    title: "Governance & Improvement",
    description: "We maintain oversight and continuously improve our AI systems based on real-world performance.",
    checks: [
      "Regular review by ethics committee or board",
      "Continuous learning and improvement based on feedback",
      "Transparency reporting on system performance",
      "Version control and responsible updates"
    ]
  }
];

export const designExamples: DesignExample[] = [
  {
    title: "Construction: Document Extraction You Can Audit",
    challenge: "A contractor wants submittals and invoices read automatically, but a wrong figure filed into the project record is worse than a slow one, and an auditor later has to see where each value came from.",
    approach: "Extract with a confidence threshold rather than a best guess, keep every value linked to the page and region it was read from, hold anything below the threshold for a person, and log who approved each record.",
    outcome: "The design goal is a project record where every extracted field can be traced back to the document it came from, and nothing enters it without a named approval."
  },
  {
    title: "HVAC & Trades: Call Triage That Escalates Honestly",
    challenge: "A service business wants after-hours calls answered, but a system that misreads an emergency as routine leaves someone without heat overnight, and one that escalates everything is just a pager.",
    approach: "Bias the urgency rules toward escalation, state plainly to the caller that they are speaking to an automated intake, keep a human escalation path open at every point, and review the misclassified calls weekly.",
    outcome: "The design goal is triage whose failure mode is waking an on-call technician unnecessarily, never leaving a genuine emergency in a queue."
  },
  {
    title: "Logistics: Monitoring Loads Without Monitoring Drivers",
    challenge: "A carrier wants late and off-plan loads surfaced early, and the same telematics data would also support scoring individual drivers on behaviour they were never told was being measured.",
    approach: "Scope the data to the load rather than the person, agree in advance what the signals may and may not be used for, tell drivers what is collected, and keep an access trail on the underlying records.",
    outcome: "The design goal is exception visibility for dispatch that does not quietly become a performance surveillance system."
  }
];
