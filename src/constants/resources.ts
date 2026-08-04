export type ResourceType = "whitepaper" | "ebook" | "report" | "guide" | "spreadsheet" | "checklist";

export type ResourceFormat = "PDF" | "XLSX" | "DOCX" | "ZIP";

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  format: ResourceFormat;
  image: string;
  downloadUrl: string;
  featured?: boolean;
}

export const resources: Resource[] = [
  {
    id: "ai-implementation-guide",
    title: "AI Implementation Guide",
    description: "A comprehensive step-by-step guide covering strategy, infrastructure, and best practices for successfully implementing AI solutions in your organization.",
    type: "ebook",
    format: "PDF",
    image: "/images/ai-solutions.png",
    downloadUrl: "/contact?resource=ai-implementation-guide",
    featured: true,
  },
  {
    id: "roi-calculator-workbook",
    title: "ROI Calculator Workbook",
    description: "An interactive spreadsheet to calculate and project the return on investment from your AI initiatives, with built-in formulas and scenario planning.",
    type: "spreadsheet",
    format: "XLSX",
    image: "/images/ai-solutions.png",
    downloadUrl: "/contact?resource=roi-calculator-workbook",
    featured: true,
  },
  {
    id: "industry-ai-report-2024",
    title: "Industry AI Report 2024",
    description: "An in-depth analysis of AI adoption trends, emerging use cases, and success stories across industries with insights from 500+ business leaders.",
    type: "whitepaper",
    format: "PDF",
    image: "/images/ai-solutions.png",
    downloadUrl: "/contact?resource=industry-ai-report-2024",
    featured: true,
  },
  {
    id: "getting-started-checklist",
    title: "Getting Started Checklist",
    description: "A practical checklist to help you prepare your organization for AI adoption, covering data readiness, team skills, and infrastructure requirements.",
    type: "checklist",
    format: "PDF",
    image: "/images/ai-solutions.png",
    downloadUrl: "/contact?resource=getting-started-checklist",
    featured: true,
  },
  {
    id: "generative-ai-whitepaper",
    title: "Generative AI in Enterprise: 2025 Outlook",
    description: "Explore the current state and future potential of generative AI in enterprise environments, with insights from industry leaders.",
    type: "whitepaper",
    format: "PDF",
    image: "/images/ai-solutions.png",
    downloadUrl: "/contact?resource=generative-ai-whitepaper",
  },
  {
    id: "ai-ethics-whitepaper",
    title: "Building Ethical AI Systems",
    description: "A framework for developing responsible AI solutions that prioritize fairness, transparency, and accountability.",
    type: "whitepaper",
    format: "PDF",
    image: "/images/ai-solutions.png",
    downloadUrl: "/contact?resource=ai-ethics-whitepaper",
  },
  {
    id: "data-strategy-guide",
    title: "Data Strategy for AI Success",
    description: "Essential strategies for organizing, cleaning, and leveraging your data assets to power effective AI solutions.",
    type: "guide",
    format: "PDF",
    image: "/images/ai-solutions.png",
    downloadUrl: "/contact?resource=data-strategy-guide",
  },
];

// Get only featured resources (for home page display)
export const featuredResources = resources.filter((r) => r.featured);

// Helper function to get display text for resource types
export const getResourceTypeLabel = (type: ResourceType): string => {
  const labels: Record<ResourceType, string> = {
    whitepaper: "Whitepaper",
    ebook: "E-Book",
    report: "Industry Report",
    guide: "Guide",
    spreadsheet: "Spreadsheet",
    checklist: "Checklist",
  };
  return labels[type];
};

// Helper function to get badge color classes for resource types
export const getResourceTypeBadgeClasses = (type: ResourceType): string => {
  // One neutral chip for every type -- the label carries the information.
  // (The old map also hit the DESIGN.md --accent trap: text-accent is the
  // near-invisible hover wash, not a colour.)
  const classes: Record<ResourceType, string> = {
    whitepaper: "bg-muted text-brand",
    ebook: "bg-muted text-muted-foreground",
    report: "bg-muted text-brand",
    guide: "bg-muted text-muted-foreground",
    spreadsheet: "bg-muted text-muted-foreground",
    checklist: "bg-muted text-muted-foreground",
  };
  return classes[type];
};

// Helper function to get format badge classes
export const getFormatBadgeClasses = (format: ResourceFormat): string => {
  const classes: Record<ResourceFormat, string> = {
    PDF: "bg-muted text-muted-foreground",
    XLSX: "bg-muted text-muted-foreground",
    DOCX: "bg-muted text-muted-foreground",
    ZIP: "bg-muted text-muted-foreground",
  };
  return classes[format];
};
