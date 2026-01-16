export type Industry =
  | "Financial Services"
  | "Healthcare"
  | "Retail"
  | "Manufacturing"
  | "Technology"
  | "Energy"
  | "Logistics"
  | "Professional Services";

export type BusinessFunction =
  | "Customer Service"
  | "Operations"
  | "Marketing"
  | "Finance"
  | "HR"
  | "Sales"
  | "IT"
  | "Research & Development";

export type Complexity = "Low" | "Medium" | "High";

export interface UseCase {
  id: string;
  title: string;
  description: string;
  industry: Industry;
  function: BusinessFunction;
  technologies: string[];
  complexity: Complexity;
  estimatedROI: string;
  implementationTime: string;
  keyBenefits: string[];
}

export const industries: Industry[] = [
  "Financial Services",
  "Healthcare",
  "Retail",
  "Manufacturing",
  "Technology",
  "Energy",
  "Logistics",
  "Professional Services",
];

export const businessFunctions: BusinessFunction[] = [
  "Customer Service",
  "Operations",
  "Marketing",
  "Finance",
  "HR",
  "Sales",
  "IT",
  "Research & Development",
];

export const complexityLevels: Complexity[] = ["Low", "Medium", "High"];

export const useCases: UseCase[] = [
  {
    id: "chatbot-customer-support",
    title: "AI-Powered Customer Support Chatbot",
    description:
      "Deploy intelligent chatbots that handle customer inquiries 24/7, reducing wait times and freeing human agents for complex issues. Uses natural language processing to understand intent and provide accurate responses.",
    industry: "Retail",
    function: "Customer Service",
    technologies: ["Natural Language Processing", "Large Language Models", "Sentiment Analysis"],
    complexity: "Medium",
    estimatedROI: "150-300%",
    implementationTime: "2-4 months",
    keyBenefits: [
      "24/7 customer support availability",
      "60-80% reduction in response time",
      "40% decrease in support costs",
    ],
  },
  {
    id: "fraud-detection",
    title: "Real-Time Fraud Detection System",
    description:
      "Machine learning models that analyze transaction patterns in real-time to identify and prevent fraudulent activities before they impact your business. Continuously learns from new fraud patterns.",
    industry: "Financial Services",
    function: "Finance",
    technologies: ["Anomaly Detection", "Machine Learning", "Real-time Analytics"],
    complexity: "High",
    estimatedROI: "400-800%",
    implementationTime: "4-8 months",
    keyBenefits: [
      "99.5% fraud detection accuracy",
      "80% reduction in false positives",
      "Real-time transaction monitoring",
    ],
  },
  {
    id: "predictive-maintenance",
    title: "Predictive Equipment Maintenance",
    description:
      "IoT sensors combined with machine learning predict equipment failures before they occur, enabling proactive maintenance scheduling and minimizing costly downtime.",
    industry: "Manufacturing",
    function: "Operations",
    technologies: ["IoT", "Machine Learning", "Time Series Analysis", "Edge Computing"],
    complexity: "High",
    estimatedROI: "200-400%",
    implementationTime: "6-12 months",
    keyBenefits: [
      "45% reduction in downtime",
      "25% decrease in maintenance costs",
      "Extend equipment lifespan by 20%",
    ],
  },
  {
    id: "personalized-marketing",
    title: "AI-Driven Personalization Engine",
    description:
      "Leverage customer data and behavior patterns to deliver highly personalized marketing messages, product recommendations, and content that drive engagement and conversions.",
    industry: "Retail",
    function: "Marketing",
    technologies: ["Recommendation Systems", "Customer Segmentation", "Predictive Analytics"],
    complexity: "Medium",
    estimatedROI: "200-350%",
    implementationTime: "3-6 months",
    keyBenefits: [
      "35% increase in conversion rates",
      "25% higher customer lifetime value",
      "Reduced customer acquisition costs",
    ],
  },
  {
    id: "medical-image-analysis",
    title: "Medical Image Analysis & Diagnostics",
    description:
      "Computer vision systems that assist radiologists in analyzing medical images, identifying anomalies, and supporting faster, more accurate diagnoses across X-rays, MRIs, and CT scans.",
    industry: "Healthcare",
    function: "Operations",
    technologies: ["Computer Vision", "Deep Learning", "Medical Imaging AI"],
    complexity: "High",
    estimatedROI: "150-250%",
    implementationTime: "8-14 months",
    keyBenefits: [
      "40% faster diagnosis times",
      "Improved detection accuracy",
      "Reduced radiologist workload",
    ],
  },
  {
    id: "intelligent-document-processing",
    title: "Intelligent Document Processing",
    description:
      "Automatically extract, classify, and process information from documents including invoices, contracts, and forms. Eliminates manual data entry and reduces processing errors.",
    industry: "Financial Services",
    function: "Operations",
    technologies: ["OCR", "Natural Language Processing", "Document AI"],
    complexity: "Medium",
    estimatedROI: "250-400%",
    implementationTime: "2-5 months",
    keyBenefits: [
      "90% reduction in manual data entry",
      "85% faster document processing",
      "99% data accuracy",
    ],
  },
  {
    id: "demand-forecasting",
    title: "AI-Powered Demand Forecasting",
    description:
      "Machine learning models that analyze historical sales, market trends, and external factors to predict future demand with high accuracy, optimizing inventory and supply chain decisions.",
    industry: "Retail",
    function: "Operations",
    technologies: ["Machine Learning", "Time Series Analysis", "Predictive Analytics"],
    complexity: "Medium",
    estimatedROI: "150-300%",
    implementationTime: "3-6 months",
    keyBenefits: [
      "30% reduction in inventory costs",
      "25% fewer stockouts",
      "Improved supplier planning",
    ],
  },
  {
    id: "candidate-screening",
    title: "AI Resume Screening & Candidate Matching",
    description:
      "Natural language processing analyzes resumes and job descriptions to identify the best-fit candidates, reducing time-to-hire while maintaining fairness and reducing bias.",
    industry: "Professional Services",
    function: "HR",
    technologies: ["Natural Language Processing", "Machine Learning", "Matching Algorithms"],
    complexity: "Low",
    estimatedROI: "100-200%",
    implementationTime: "1-3 months",
    keyBenefits: [
      "75% reduction in screening time",
      "Improved candidate quality",
      "Reduced hiring bias",
    ],
  },
  {
    id: "energy-optimization",
    title: "Smart Energy Management System",
    description:
      "AI algorithms optimize energy consumption in buildings and industrial facilities by learning usage patterns and automatically adjusting systems for efficiency without compromising comfort.",
    industry: "Energy",
    function: "Operations",
    technologies: ["Machine Learning", "IoT", "Reinforcement Learning"],
    complexity: "Medium",
    estimatedROI: "100-200%",
    implementationTime: "4-8 months",
    keyBenefits: [
      "20-30% energy cost reduction",
      "Reduced carbon footprint",
      "Automated building management",
    ],
  },
  {
    id: "sales-forecasting",
    title: "Intelligent Sales Pipeline Prediction",
    description:
      "Machine learning analyzes deal characteristics, sales rep activities, and market signals to predict which opportunities will close, enabling better resource allocation and accurate revenue forecasting.",
    industry: "Technology",
    function: "Sales",
    technologies: ["Predictive Analytics", "Machine Learning", "CRM Integration"],
    complexity: "Medium",
    estimatedROI: "150-250%",
    implementationTime: "2-4 months",
    keyBenefits: [
      "30% improvement in forecast accuracy",
      "20% increase in win rates",
      "Better pipeline visibility",
    ],
  },
  {
    id: "route-optimization",
    title: "Dynamic Route Optimization",
    description:
      "AI-powered logistics solution that optimizes delivery routes in real-time based on traffic, weather, delivery windows, and vehicle capacity, reducing fuel costs and improving on-time delivery.",
    industry: "Logistics",
    function: "Operations",
    technologies: ["Optimization Algorithms", "Machine Learning", "Geospatial Analytics"],
    complexity: "High",
    estimatedROI: "200-350%",
    implementationTime: "4-7 months",
    keyBenefits: [
      "25% reduction in fuel costs",
      "15% more deliveries per day",
      "98% on-time delivery rate",
    ],
  },
  {
    id: "sentiment-analysis",
    title: "Social Media Sentiment Intelligence",
    description:
      "Monitor and analyze customer sentiment across social media, reviews, and support channels in real-time. Identify emerging issues, track brand perception, and measure campaign effectiveness.",
    industry: "Retail",
    function: "Marketing",
    technologies: ["Natural Language Processing", "Sentiment Analysis", "Social Listening"],
    complexity: "Low",
    estimatedROI: "100-200%",
    implementationTime: "1-3 months",
    keyBenefits: [
      "Real-time brand monitoring",
      "Early issue detection",
      "Competitive intelligence",
    ],
  },
  {
    id: "credit-scoring",
    title: "AI-Enhanced Credit Risk Assessment",
    description:
      "Machine learning models that incorporate alternative data sources and advanced patterns to provide more accurate credit risk assessments, expanding access to credit while maintaining portfolio quality.",
    industry: "Financial Services",
    function: "Finance",
    technologies: ["Machine Learning", "Alternative Data Analysis", "Risk Modeling"],
    complexity: "High",
    estimatedROI: "200-400%",
    implementationTime: "6-10 months",
    keyBenefits: [
      "20% improvement in default prediction",
      "Expanded credit access",
      "Faster approval decisions",
    ],
  },
  {
    id: "quality-inspection",
    title: "Visual Quality Inspection Automation",
    description:
      "Computer vision systems inspect products on production lines, identifying defects with superhuman accuracy and speed, ensuring consistent quality and reducing waste.",
    industry: "Manufacturing",
    function: "Operations",
    technologies: ["Computer Vision", "Deep Learning", "Edge Computing"],
    complexity: "Medium",
    estimatedROI: "200-350%",
    implementationTime: "3-6 months",
    keyBenefits: [
      "99.9% defect detection rate",
      "50% reduction in quality costs",
      "Real-time quality monitoring",
    ],
  },
  {
    id: "patient-flow-optimization",
    title: "Hospital Patient Flow Optimization",
    description:
      "AI predicts patient volumes, optimizes bed allocation, and manages staff scheduling to reduce wait times and improve resource utilization in healthcare facilities.",
    industry: "Healthcare",
    function: "Operations",
    technologies: ["Predictive Analytics", "Optimization Algorithms", "Healthcare AI"],
    complexity: "High",
    estimatedROI: "150-250%",
    implementationTime: "6-10 months",
    keyBenefits: [
      "30% reduction in wait times",
      "20% improvement in bed utilization",
      "Better staff scheduling",
    ],
  },
  {
    id: "contract-analysis",
    title: "AI Contract Review & Analysis",
    description:
      "Natural language processing automatically reviews contracts, identifies key terms, flags risks, and extracts obligations, dramatically reducing legal review time while improving accuracy.",
    industry: "Professional Services",
    function: "Operations",
    technologies: ["Natural Language Processing", "Legal AI", "Document Intelligence"],
    complexity: "Medium",
    estimatedROI: "200-300%",
    implementationTime: "3-5 months",
    keyBenefits: [
      "80% faster contract review",
      "Consistent risk identification",
      "Reduced legal costs",
    ],
  },
  {
    id: "knowledge-assistant",
    title: "Enterprise Knowledge Assistant",
    description:
      "AI-powered assistant that helps employees find information across enterprise systems, answer questions using company knowledge, and automate routine IT support tasks.",
    industry: "Technology",
    function: "IT",
    technologies: ["Large Language Models", "Knowledge Graphs", "Enterprise Search"],
    complexity: "Medium",
    estimatedROI: "150-250%",
    implementationTime: "3-6 months",
    keyBenefits: [
      "50% reduction in IT tickets",
      "Faster employee onboarding",
      "Improved knowledge sharing",
    ],
  },
  {
    id: "drug-discovery",
    title: "AI-Accelerated Drug Discovery",
    description:
      "Machine learning models analyze molecular structures and biological data to identify promising drug candidates, significantly reducing the time and cost of early-stage drug discovery.",
    industry: "Healthcare",
    function: "Research & Development",
    technologies: ["Deep Learning", "Molecular Modeling", "Bioinformatics"],
    complexity: "High",
    estimatedROI: "500-1000%",
    implementationTime: "12-24 months",
    keyBenefits: [
      "60% faster candidate identification",
      "Reduced clinical trial failures",
      "Novel compound discovery",
    ],
  },
  {
    id: "dynamic-pricing",
    title: "AI Dynamic Pricing Engine",
    description:
      "Machine learning algorithms optimize pricing in real-time based on demand, competition, inventory levels, and customer segments to maximize revenue and margins.",
    industry: "Retail",
    function: "Sales",
    technologies: ["Machine Learning", "Price Optimization", "Real-time Analytics"],
    complexity: "High",
    estimatedROI: "150-300%",
    implementationTime: "4-8 months",
    keyBenefits: [
      "5-15% revenue increase",
      "Improved margin management",
      "Competitive pricing intelligence",
    ],
  },
  {
    id: "employee-engagement",
    title: "AI Employee Engagement Analytics",
    description:
      "Analyze employee surveys, communication patterns, and feedback to predict engagement levels, identify at-risk employees, and recommend interventions to improve retention.",
    industry: "Professional Services",
    function: "HR",
    technologies: ["Natural Language Processing", "Predictive Analytics", "People Analytics"],
    complexity: "Low",
    estimatedROI: "100-200%",
    implementationTime: "2-4 months",
    keyBenefits: [
      "25% reduction in turnover",
      "Early attrition warning",
      "Data-driven HR decisions",
    ],
  },
];
