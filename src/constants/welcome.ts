export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    icon: "brain",
    title: "AI-Powered Solutions",
    description: "Cutting-edge artificial intelligence tailored to your specific business challenges."
  },
  {
    icon: "barChart",
    title: "Data-Driven Insights",
    description: "Transform your raw data into actionable business intelligence."
  },
  {
    icon: "zap",
    title: "Rapid Implementation",
    description: "Get up and running quickly with our streamlined deployment process."
  },
  {
    icon: "checkCircle",
    title: "Proven Results",
    description: "Join hundreds of businesses that have achieved measurable ROI with our solutions."
  }
];

export interface Statistic {
  end: number;
  label: string;
  prefix?: string;
  suffix?: string;
}

export const statistics: Statistic[] = [
  { end: 500, label: "Clients Worldwide", suffix: "+" },
  { end: 95, label: "Implementation Success Rate", suffix: "%" },
  { end: 40, label: "Average Efficiency Gain", suffix: "%" },
  { end: 12, label: "Industry Awards" }
];
