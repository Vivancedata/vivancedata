export type ClientIcon = "hard-hat" | "wrench" | "truck" | "factory";

export interface Client {
  id: string;
  name: string;
  icon: ClientIcon;
  blurb: string;
}

// These represent the industries and sectors where Vivancedata delivers AI strategy
// and implementation work — not named client companies. Each blurb states what we
// actually build there, so the grid reads as substance rather than a logo wall.
export const clients: Client[] = [
  {
    id: "construction",
    name: "Construction",
    icon: "hard-hat",
    blurb: "Submittals, RFIs and daily reports drafted instead of typed.",
  },
  {
    id: "hvac-trades",
    name: "HVAC & Trades",
    icon: "wrench",
    blurb: "After-hours calls answered, triaged and booked.",
  },
  {
    id: "logistics",
    name: "Logistics & Fleet",
    icon: "truck",
    blurb: "Delivery paperwork read, and problem loads surfaced early.",
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    icon: "factory",
    blurb: "Predictive maintenance and quality inspection on the line.",
  },
];
