export interface Client {
  id: string;
  name: string;
  logo: string;
  industry: string;
}

export const clients: Client[] = [
  {
    id: "techcorp",
    name: "TechCorp",
    logo: "/images/clients/techcorp.svg",
    industry: "Technology",
  },
  {
    id: "dataflow",
    name: "DataFlow Inc",
    logo: "/images/clients/dataflow.svg",
    industry: "Data Analytics",
  },
  {
    id: "ai-ventures",
    name: "AI Ventures",
    logo: "/images/clients/ai-ventures.svg",
    industry: "Venture Capital",
  },
  {
    id: "nexus-finance",
    name: "Nexus Finance",
    logo: "/images/clients/nexus-finance.svg",
    industry: "Financial Services",
  },
  {
    id: "cloudscale",
    name: "CloudScale",
    logo: "/images/clients/cloudscale.svg",
    industry: "Cloud Infrastructure",
  },
  {
    id: "quantum-systems",
    name: "Quantum Systems",
    logo: "/images/clients/quantum-systems.svg",
    industry: "Enterprise Software",
  },
  {
    id: "innovate-health",
    name: "InnovateHealth",
    logo: "/images/clients/innovate-health.svg",
    industry: "Healthcare Technology",
  },
  {
    id: "global-dynamics",
    name: "Global Dynamics",
    logo: "/images/clients/global-dynamics.svg",
    industry: "Manufacturing",
  },
];
