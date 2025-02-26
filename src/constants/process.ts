import { ClipboardCheck, Code, FileSearch, LightbulbIcon, LineChart, Settings, Users } from "lucide-react";

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
  iconType: "fileSearch" | "lightbulb" | "settings" | "code" | "clipboardCheck" | "users" | "lineChart";
}

export const processSteps: ProcessStep[] = [
  {
    number: 1,
    title: "Discovery & Assessment",
    description: "We begin by understanding your business challenges, goals, and current systems through in-depth consultations and technical assessments.",
    iconType: "fileSearch",
  },
  {
    number: 2,
    title: "Strategy Development",
    description: "Our team creates a tailored AI strategy that aligns with your business objectives, including technology selection, implementation roadmap, and ROI projections.",
    iconType: "lightbulb",
  },
  {
    number: 3,
    title: "Solution Design",
    description: "We design a comprehensive solution architecture that integrates with your existing systems and addresses your specific requirements.",
    iconType: "settings",
  },
  {
    number: 4,
    title: "Development & Integration",
    description: "Our engineers develop and integrate the AI solution, ensuring seamless functionality with your existing infrastructure and workflows.",
    iconType: "code",
  },
  {
    number: 5,
    title: "Testing & Optimization",
    description: "We rigorously test the solution and optimize its performance based on real-world data and feedback to ensure it meets all requirements.",
    iconType: "clipboardCheck",
  },
  {
    number: 6,
    title: "Deployment & Training",
    description: "The solution is deployed to your environment, and we provide comprehensive training to ensure your team can effectively utilize the new capabilities.",
    iconType: "users",
  },
  {
    number: 7,
    title: "Monitoring & Continuous Improvement",
    description: "We provide ongoing support, monitoring, and continuous improvement to ensure your AI solution evolves with your business needs and technological advancements.",
    iconType: "lineChart",
  },
];
