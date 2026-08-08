export type ClientIcon =
  | "landmark"
  | "heart-pulse"
  | "shopping-bag"
  | "app-window"
  | "factory"
  | "truck"
  | "briefcase"
  | "clapperboard";

export interface Client {
  id: string;
  name: string;
  icon: ClientIcon;
  blurb: string;
}

// These represent the industries and sectors where VivanceData delivers AI strategy
// and implementation work — not named client companies. Each blurb states what we
// actually build there, so the grid reads as substance rather than a logo wall.
export const clients: Client[] = [
  {
    id: "financial-services",
    name: "Financial Services",
    icon: "landmark",
    blurb: "Risk triage, fraud signals, and compliant automation.",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    icon: "heart-pulse",
    blurb: "Clinical documentation support with human review in the loop.",
  },
  {
    id: "retail",
    name: "Retail & Commerce",
    icon: "shopping-bag",
    blurb: "Demand forecasting and personalization that move margins.",
  },
  {
    id: "enterprise-software",
    name: "Enterprise Software",
    icon: "app-window",
    blurb: "AI features shipped inside existing product surfaces.",
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    icon: "factory",
    blurb: "Predictive maintenance and quality inspection on the line.",
  },
  {
    id: "logistics",
    name: "Logistics & Supply Chain",
    icon: "truck",
    blurb: "Routing, ETAs, and inventory intelligence end to end.",
  },
  {
    id: "professional-services",
    name: "Professional Services",
    icon: "briefcase",
    blurb: "Document intelligence that compounds billable expertise.",
  },
  {
    id: "media-content",
    name: "Media & Content",
    icon: "clapperboard",
    blurb: "Generation and moderation pipelines with editorial control.",
  },
];
