export interface PricingFeature {
  name: string;
  included: boolean;
  tooltip?: string;
}

export interface PricingTier {
  name: string;
  description: string;
  price: {
    /** One-off cost to scope and build. */
    setup: string;
    /** What it costs to keep running afterwards, or why there is nothing ongoing. */
    ongoing: string;
  };
  features: PricingFeature[];
  cta: string;
  popular?: boolean;
}

/**
 * Setup fee plus a monthly retainer, not project-only pricing.
 *
 * An automation is not a deliverable that stays delivered -- upstream APIs
 * change, document formats drift, and a workflow left unattended degrades
 * within a few months. Pricing the build without the running cost sets the
 * expectation that it is finished when it ships, which is the failure this
 * shape exists to avoid. Keep both fields honest: if a tier genuinely has no
 * ongoing cost, say so in `ongoing` rather than leaving it blank.
 */
export const pricingTiers: PricingTier[] = [
  {
    name: "Assessment",
    description: "For deciding which workflow is worth automating first, and which ones are not worth touching yet.",
    price: {
      setup: "From $2,500",
      ongoing: "One-off, nothing ongoing",
    },
    features: [
      { name: "Readiness assessment against your actual systems", included: true },
      { name: "Use-case prioritization by effort and payback", included: true },
      { name: "Tooling and vendor evaluation", included: true },
      { name: "Implementation roadmap with a defined first build", included: true },
      { name: "Written recommendations report", included: true, tooltip: "Yours to keep and act on, with or without us" },
      { name: "Hands-on build", included: false },
      { name: "Monitoring and upkeep", included: false },
      { name: "Direct support channel", included: false },
      { name: "Ongoing improvement cycles", included: false },
    ],
    cta: "Book an Assessment",
  },
  {
    name: "Build & Run",
    description: "For one workflow taken from scoping to production, then kept working as the systems around it change.",
    price: {
      setup: "From $8,000 to build",
      ongoing: "then from $750/month to run",
    },
    features: [
      { name: "Readiness assessment against your actual systems", included: true },
      { name: "Use-case prioritization by effort and payback", included: true },
      { name: "Tooling and vendor evaluation", included: true },
      { name: "Implementation roadmap with a defined first build", included: true },
      { name: "Written recommendations report", included: true },
      { name: "Hands-on build", included: true, tooltip: "Typically 2-8 weeks depending on the workflow" },
      { name: "Monitoring and upkeep", included: true, tooltip: "Covers upstream API changes, format drift and accuracy checks" },
      { name: "Direct support channel", included: true },
      { name: "Ongoing improvement cycles", included: false },
    ],
    cta: "Scope a Build",
    popular: true,
  },
  {
    name: "Ongoing Partner",
    description: "For operations automating several workflows over time, with a standing relationship rather than repeat projects.",
    price: {
      setup: "Custom",
      ongoing: "Custom monthly",
    },
    features: [
      { name: "Readiness assessment against your actual systems", included: true },
      { name: "Use-case prioritization by effort and payback", included: true },
      { name: "Tooling and vendor evaluation", included: true },
      { name: "Implementation roadmap with a defined first build", included: true },
      { name: "Written recommendations report", included: true },
      { name: "Hands-on build", included: true },
      { name: "Monitoring and upkeep", included: true },
      { name: "Direct support channel", included: true },
      { name: "Ongoing improvement cycles", included: true, tooltip: "Regular reviews, new workflows scoped as they surface" },
    ],
    cta: "Talk It Through",
  },
];

export const pricingPageContent = {
  eyebrow: "Pricing",
  title: "What this costs",
  description:
    "A build has two costs: getting it working, and keeping it working. Both are listed, because only quoting the first one sets a false expectation.",
  whyRetainer: {
    title: "Why there is a monthly cost at all",
    body: "An automation is not finished when it ships. The APIs it talks to change, the documents it reads drift in format, and accuracy quietly degrades if nobody is watching. The monthly fee covers monitoring, fixing those breakages, and the small adjustments that keep a workflow trustworthy. If you would rather run it yourself, the build tier can be taken as handover-only. Say so during scoping and we will price it that way.",
  },
  note:
    "Every figure here is a starting point, not a quote. Scope drives the number, and you get a fixed price in writing before anything begins.",
};
