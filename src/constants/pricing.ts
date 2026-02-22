export interface PricingFeature {
  name: string;
  included: boolean;
  tooltip?: string;
}

export interface PricingTier {
  name: string;
  description: string;
  price: {
    monthly: string;
    annually: string;
  };
  features: PricingFeature[];
  cta: string;
  popular?: boolean;
}

export const pricingTiers: PricingTier[] = [
  {
    name: "Advisory",
    description: "For teams that need senior-level AI strategy and scoping support before committing to a build.",
    price: {
      monthly: "From $2,500",
      annually: "Project-based",
    },
    features: [
      { name: "AI Readiness Assessment", included: true },
      { name: "Use-case prioritization workshop", included: true },
      { name: "Vendor & tooling evaluation", included: true },
      { name: "Implementation roadmap", included: true },
      { name: "Written recommendations report", included: true },
      { name: "Hands-on implementation", included: false },
      { name: "Ongoing delivery support", included: false },
      { name: "Dedicated async support channel", included: false },
      { name: "Embedded team collaboration", included: false },
    ],
    cta: "Start a Conversation",
  },
  {
    name: "Implementation",
    description: "For teams ready to build — from first prototype through production deployment and handoff.",
    price: {
      monthly: "From $8,000",
      annually: "Project-based",
    },
    features: [
      { name: "AI Readiness Assessment", included: true },
      { name: "Use-case prioritization workshop", included: true },
      { name: "Vendor & tooling evaluation", included: true },
      { name: "Implementation roadmap", included: true },
      { name: "Written recommendations report", included: true },
      { name: "Hands-on implementation", included: true },
      { name: "Ongoing delivery support", included: true, tooltip: "Throughout the engagement scope" },
      { name: "Dedicated async support channel", included: true },
      { name: "Embedded team collaboration", included: false },
    ],
    cta: "Scope a Project",
    popular: true,
  },
  {
    name: "Strategic Partnership",
    description: "For organizations that want ongoing AI capability building — embedded, iterative, long-term.",
    price: {
      monthly: "Custom",
      annually: "Custom",
    },
    features: [
      { name: "AI Readiness Assessment", included: true },
      { name: "Use-case prioritization workshop", included: true },
      { name: "Vendor & tooling evaluation", included: true },
      { name: "Implementation roadmap", included: true },
      { name: "Written recommendations report", included: true },
      { name: "Hands-on implementation", included: true },
      { name: "Ongoing delivery support", included: true },
      { name: "Dedicated async support channel", included: true },
      { name: "Embedded team collaboration", included: true, tooltip: "Regular check-ins, reviews, and planning cycles" },
    ],
    cta: "Let's Talk",
  },
];
