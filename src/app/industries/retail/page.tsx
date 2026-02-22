import { Metadata } from "next";
import { BarChart3, ShoppingCart, Tag, Users, Truck } from "lucide-react";
import RetailClient from "./client";

export const metadata: Metadata = {
  title: "AI Solutions for Retail & E-commerce - VivanceData",
  description: "Improve inventory planning, demand forecasting, and customer personalization with AI solutions built for retail and commerce teams.",
  keywords: ["retail AI", "e-commerce AI", "demand forecasting", "inventory optimization", "personalization AI", "merchandising AI"],
  openGraph: {
    title: "AI Solutions for Retail & E-commerce - VivanceData",
    description: "AI-powered inventory planning, demand forecasting, and personalized customer experiences for retail teams.",
    type: "website",
    url: "https://vivancedata.com/industries/retail",
  },
};

export default function RetailPage() {
  const solutions = [
    {
      title: "Demand Forecasting",
      description: "Forecasting workflows that combine historical sales, seasonality, promotions, and external signals to improve planning confidence.",
      icon: <BarChart3 className="h-6 w-6 text-primary" />,
      benefits: ["Lower stockout frequency in pilot categories", "Reduced excess inventory carrying pressure", "Improved replenishment confidence", "Clear KPI tracking for ongoing iteration"],
    },
    {
      title: "Inventory Decision Support",
      description: "AI-assisted dashboards that surface inventory risk, replenishment signals, and category-level anomalies for planning teams.",
      icon: <ShoppingCart className="h-6 w-6 text-primary" />,
      benefits: ["Unified view of inventory risk by category", "Automated replenishment signals", "Cross-location visibility and alerts", "Planner-friendly explanation of recommendations"],
    },
    {
      title: "Promotion & Pricing Optimization",
      description: "ML-driven promotion and markdown optimization that balances revenue, margin, and inventory clearance goals.",
      icon: <Tag className="h-6 w-6 text-primary" />,
      benefits: ["Higher promotion ROI through better targeting", "Faster markdown decision cycles", "Margin-aware pricing recommendations", "A/B testing framework for price experiments"],
    },
    {
      title: "Customer Personalization",
      description: "Recommendation and segmentation models that personalize the shopping experience at scale across channels.",
      icon: <Users className="h-6 w-6 text-primary" />,
      benefits: ["Higher conversion from personalized recommendations", "Improved repeat purchase rates", "Cross-channel consistency", "Real-time behavioral signal integration"],
    },
    {
      title: "Supply Chain Visibility",
      description: "AI-powered supply chain analytics that improve lead time accuracy and vendor performance tracking.",
      icon: <Truck className="h-6 w-6 text-primary" />,
      benefits: ["Better lead time prediction and buffer planning", "Vendor performance scorecards", "Early warning on supply disruptions", "Integrated view across suppliers and DCs"],
    },
  ];

  const caseStudies = [
    {
      title: "Inventory Planning Optimization",
      client: "Illustrative Retail Operator",
      challenge: "Teams were balancing frequent stockouts with excess inventory and lacked confidence in planning decisions across locations.",
      solution: "Implemented demand forecasting workflows that combine historical transactions, seasonality, and external signals to improve planning accuracy.",
      results: ["Lower stockout frequency in pilot categories", "Reduced excess inventory carrying pressure", "Improved replenishment confidence for planners", "Clear KPI tracking for ongoing iteration"],
    },
    {
      title: "Promotion Performance Analytics",
      client: "Illustrative Multi-Channel Retailer",
      challenge: "Promotion decisions were driven by intuition and lagging reports, making it difficult to optimize spend or learn quickly across campaigns.",
      solution: "Built a promotion analytics dashboard with near-real-time performance tracking and cross-campaign attribution modeling.",
      results: ["Faster campaign performance feedback loops", "Improved targeting for future promotions", "Reduced waste on underperforming segments", "Better budget allocation across channels"],
    },
    {
      title: "Customer Segment Intelligence",
      client: "Illustrative E-commerce Platform",
      challenge: "Marketing and merchandising teams lacked a shared view of customer segments, leading to disconnected personalization efforts.",
      solution: "Developed a unified customer data layer with behavioral segmentation and next-best-action recommendations.",
      results: ["Higher conversion on personalized recommendations", "Improved repeat purchase rates", "Shared segment definitions across teams", "Faster experiment-to-insight cycles"],
    },
  ];

  const stats = [
    { value: "28%", label: "Average reduction in stockout risk" },
    { value: "35%", label: "Improvement in planning speed" },
    { value: "2×", label: "Faster promotion feedback loops" },
    { value: "15%", label: "Lift in recommendation conversion" },
  ];

  return <RetailClient solutions={solutions} caseStudies={caseStudies} stats={stats} />;
}
