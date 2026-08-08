export interface Service {
  id: string;
  title: string;
  icon: string;
  description: string;
  features: string[];
  cta: string;
}

/**
 * These three entries must stay in sync with the Services dropdown in
 * `navigation.ts` and with the pages that exist under `src/app/services/`.
 *
 * This list previously carried a third entry, "Pre-built AI Solutions",
 * advertising a product line (predictive dashboards, supply chain
 * intelligence) that had no page behind it and was never built.
 */
export const services: Service[] = [
  {
    id: "generative-ai",
    title: "Generative AI Solutions",
    icon: "bot",
    description: "Put language and vision models to work on the documents, calls and photographs your operation already produces.",
    features: [
      "Document intake from forms, permits and invoices",
      "Question answering over your own files, with citations",
      "Call and field-note transcription into structured records",
      "Photo and scan processing where the paperwork is on paper",
      "Drafting that a person reviews rather than rubber-stamps"
    ],
    cta: "Explore Generative AI"
  },
  {
    id: "consulting",
    title: "AI Strategy Consulting",
    icon: "lightbulb",
    description: "Work out which workflow is worth automating first, and which ones are not worth touching yet.",
    features: [
      "Readiness assessment against your actual systems",
      "Use-case prioritization by effort and payback",
      "Tooling and vendor evaluation",
      "Implementation roadmap with a defined first build",
      "Written recommendations you keep either way"
    ],
    cta: "Get Strategic Guidance"
  },
  {
    id: "training",
    title: "AI Training & Workshops",
    icon: "graduation-cap",
    description: "Get your own team confident enough to run, extend and question the systems we build together.",
    features: [
      "Fundamentals for owners and operations leads",
      "Hands-on sessions for the people using the tools daily",
      "Practical prompting and review technique",
      "Knowing when to trust an output and when not to",
      "Handover documentation written for your team"
    ],
    cta: "See Training Options"
  }
];
