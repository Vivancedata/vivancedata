export type IntegrationCategory = "Cloud" | "CRM" | "Data" | "Communication" | "AI";

export interface Integration {
  id: string;
  name: string;
  category: IntegrationCategory;
  description: string;
}

export const integrationCategories: IntegrationCategory[] = [
  "Cloud",
  "CRM",
  "Data",
  "Communication",
  "AI",
];

export const integrations: Integration[] = [
  // Cloud Platforms
  {
    id: "aws",
    name: "Amazon Web Services",
    category: "Cloud",
    description: "Comprehensive cloud computing platform with AI/ML services like SageMaker and Bedrock.",
  },
  {
    id: "azure",
    name: "Microsoft Azure",
    category: "Cloud",
    description: "Enterprise cloud platform with Azure AI and Cognitive Services integration.",
  },
  {
    id: "gcp",
    name: "Google Cloud",
    category: "Cloud",
    description: "Cloud infrastructure with Vertex AI and BigQuery ML capabilities.",
  },
  {
    id: "vercel",
    name: "Vercel",
    category: "Cloud",
    description: "Frontend cloud platform for deploying AI-powered web applications.",
  },

  // CRM Platforms
  {
    id: "salesforce",
    name: "Salesforce",
    category: "CRM",
    description: "Leading CRM platform with Einstein AI for predictive analytics and automation.",
  },
  {
    id: "hubspot",
    name: "HubSpot",
    category: "CRM",
    description: "Inbound marketing and sales platform with AI-powered lead scoring.",
  },
  {
    id: "dynamics",
    name: "Microsoft Dynamics",
    category: "CRM",
    description: "Business applications suite with Copilot AI assistance.",
  },
  {
    id: "zoho",
    name: "Zoho CRM",
    category: "CRM",
    description: "Comprehensive CRM with Zia AI assistant for sales intelligence.",
  },

  // Data Platforms
  {
    id: "snowflake",
    name: "Snowflake",
    category: "Data",
    description: "Cloud data warehouse with native ML capabilities and data sharing.",
  },
  {
    id: "databricks",
    name: "Databricks",
    category: "Data",
    description: "Unified analytics platform for data engineering and machine learning.",
  },
  {
    id: "bigquery",
    name: "BigQuery",
    category: "Data",
    description: "Serverless data warehouse with built-in ML and analytics.",
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "Data",
    description: "Document database with Atlas Vector Search for AI applications.",
  },

  // Communication Platforms
  {
    id: "slack",
    name: "Slack",
    category: "Communication",
    description: "Collaboration hub with AI-powered workflows and integrations.",
  },
  {
    id: "teams",
    name: "Microsoft Teams",
    category: "Communication",
    description: "Enterprise communication with Copilot AI assistance.",
  },
  {
    id: "zoom",
    name: "Zoom",
    category: "Communication",
    description: "Video communications with AI Companion for meeting summaries.",
  },
  {
    id: "discord",
    name: "Discord",
    category: "Communication",
    description: "Community platform with bot integrations for AI assistants.",
  },

  // AI Platforms
  {
    id: "openai",
    name: "OpenAI",
    category: "AI",
    description: "Leading AI research lab providing GPT-4 and DALL-E APIs.",
  },
  {
    id: "anthropic",
    name: "Anthropic",
    category: "AI",
    description: "AI safety company providing Claude for enterprise applications.",
  },
  {
    id: "huggingface",
    name: "Hugging Face",
    category: "AI",
    description: "Open-source AI community with thousands of pretrained models.",
  },
  {
    id: "cohere",
    name: "Cohere",
    category: "AI",
    description: "Enterprise AI platform for natural language understanding.",
  },
];

// Helper function to get integrations by category
export const getIntegrationsByCategory = (category: IntegrationCategory): Integration[] => {
  return integrations.filter((integration) => integration.category === category);
};

// Category colors for visual distinction (using design tokens)
export const categoryColors: Record<IntegrationCategory, { bg: string; text: string; border: string }> = {
  Cloud: {
    bg: "bg-blue-500/10 dark:bg-blue-500/20",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-500/30",
  },
  CRM: {
    bg: "bg-green-500/10 dark:bg-green-500/20",
    text: "text-green-600 dark:text-green-400",
    border: "border-green-500/30",
  },
  Data: {
    bg: "bg-purple-500/10 dark:bg-purple-500/20",
    text: "text-purple-600 dark:text-purple-400",
    border: "border-purple-500/30",
  },
  Communication: {
    bg: "bg-orange-500/10 dark:bg-orange-500/20",
    text: "text-orange-600 dark:text-orange-400",
    border: "border-orange-500/30",
  },
  AI: {
    bg: "bg-primary/10 dark:bg-primary/20",
    text: "text-primary",
    border: "border-primary/30",
  },
};
