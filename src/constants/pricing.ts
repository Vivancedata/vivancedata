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
    name: "Starter",
    description: "Perfect for small businesses just beginning their AI journey.",
    price: {
      monthly: "$1,499",
      annually: "$14,990",
    },
    features: [
      { name: "AI Readiness Assessment", included: true },
      { name: "Basic Data Analysis", included: true },
      { name: "1 Pre-built AI Solution", included: true },
      { name: "5 User Licenses", included: true },
      { name: "Email Support", included: true },
      { name: "Custom AI Development", included: false },
      { name: "Advanced Analytics Dashboard", included: false },
      { name: "API Access", included: false },
      { name: "Dedicated Account Manager", included: false },
    ],
    cta: "Get Started",
  },
  {
    name: "Professional",
    description: "Ideal for growing businesses looking to scale their AI capabilities.",
    price: {
      monthly: "$3,999",
      annually: "$39,990",
    },
    features: [
      { name: "AI Readiness Assessment", included: true },
      { name: "Advanced Data Analysis", included: true },
      { name: "3 Pre-built AI Solutions", included: true },
      { name: "20 User Licenses", included: true },
      { name: "Priority Support", included: true },
      { name: "Basic Custom AI Development", included: true, tooltip: "Up to 100 hours of custom development" },
      { name: "Advanced Analytics Dashboard", included: true },
      { name: "API Access", included: true },
      { name: "Dedicated Account Manager", included: false },
    ],
    cta: "Upgrade Now",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For organizations requiring comprehensive AI solutions and support.",
    price: {
      monthly: "Custom",
      annually: "Custom",
    },
    features: [
      { name: "AI Readiness Assessment", included: true },
      { name: "Comprehensive Data Analysis", included: true },
      { name: "Unlimited Pre-built AI Solutions", included: true },
      { name: "Unlimited User Licenses", included: true },
      { name: "24/7 Premium Support", included: true },
      { name: "Advanced Custom AI Development", included: true, tooltip: "Unlimited custom development hours" },
      { name: "Advanced Analytics Dashboard", included: true },
      { name: "Full API Access & Integration", included: true },
      { name: "Dedicated Account Manager", included: true },
    ],
    cta: "Contact Sales",
  },
];
