export interface Client {
  id: string;
  name: string;
  logo: string;
  industry: string;
}

// These represent the industries and sectors where VivanceData delivers AI strategy
// and implementation work — not named client companies.
export const clients: Client[] = [
  {
    id: "financial-services",
    name: "Financial Services",
    logo: "",
    industry: "Financial Services",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    logo: "",
    industry: "Healthcare",
  },
  {
    id: "retail",
    name: "Retail & Commerce",
    logo: "",
    industry: "Retail",
  },
  {
    id: "enterprise-software",
    name: "Enterprise Software",
    logo: "",
    industry: "Enterprise Software",
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    logo: "",
    industry: "Manufacturing",
  },
  {
    id: "logistics",
    name: "Logistics & Supply Chain",
    logo: "",
    industry: "Logistics",
  },
  {
    id: "professional-services",
    name: "Professional Services",
    logo: "",
    industry: "Professional Services",
  },
  {
    id: "media-content",
    name: "Media & Content",
    logo: "",
    industry: "Media",
  },
];
