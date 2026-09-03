export type ReadinessCategory = "data" | "infrastructure" | "culture" | "strategy";

export const CATEGORY_LABELS: Record<ReadinessCategory, string> = {
  data: "Data Readiness",
  infrastructure: "Technical Infrastructure",
  culture: "Organizational Culture",
  strategy: "Strategic Alignment",
};

export interface ReadinessQuestion {
  id: string;
  category: ReadinessCategory;
  question: string;
  options: {
    value: number;
    label: string;
  }[];
}

export const questions: ReadinessQuestion[] = [
  // Data Readiness (4 questions)
  {
    id: "data-1",
    category: "data",
    question: "How would you describe the quality and accessibility of your organization's data?",
    options: [
      { value: 1, label: "Data is siloed, inconsistent, or largely inaccessible" },
      { value: 2, label: "Some data available but requires significant cleanup" },
      { value: 3, label: "Most data is accessible with moderate quality" },
      { value: 4, label: "High-quality data, well-organized and easily accessible" },
      { value: 5, label: "Enterprise-grade data infrastructure with excellent governance" },
    ],
  },
  {
    id: "data-2",
    category: "data",
    question: "Does your organization have a data governance framework in place?",
    options: [
      { value: 1, label: "No formal data governance" },
      { value: 2, label: "Limited governance, mostly ad-hoc" },
      { value: 3, label: "Basic governance policies exist" },
      { value: 4, label: "Well-defined governance with clear ownership" },
      { value: 5, label: "Mature governance with automated compliance" },
    ],
  },
  {
    id: "data-3",
    category: "data",
    question: "How much historical data does your organization have available for analysis?",
    options: [
      { value: 1, label: "Less than 6 months" },
      { value: 2, label: "6 months to 1 year" },
      { value: 3, label: "1-2 years" },
      { value: 4, label: "2-5 years" },
      { value: 5, label: "5+ years of comprehensive data" },
    ],
  },
  {
    id: "data-4",
    category: "data",
    question: "Is your data properly labeled and annotated for machine learning purposes?",
    options: [
      { value: 1, label: "No labeling or annotation" },
      { value: 2, label: "Minimal labeling on small datasets" },
      { value: 3, label: "Partial labeling on key datasets" },
      { value: 4, label: "Most critical data is labeled" },
      { value: 5, label: "Comprehensive labeling with quality assurance" },
    ],
  },
  // Technical Infrastructure (4 questions)
  {
    id: "infra-1",
    category: "infrastructure",
    question: "What is your organization's cloud adoption level?",
    options: [
      { value: 1, label: "On-premises only, no cloud infrastructure" },
      { value: 2, label: "Limited cloud usage for basic services" },
      { value: 3, label: "Hybrid cloud with some workloads migrated" },
      { value: 4, label: "Cloud-first strategy with modern infrastructure" },
      { value: 5, label: "Cloud-native with advanced capabilities (containers, serverless)" },
    ],
  },
  {
    id: "infra-2",
    category: "infrastructure",
    question: "Does your organization have experience with machine learning or AI tools?",
    options: [
      { value: 1, label: "No experience with ML/AI tools" },
      { value: 2, label: "Limited experimentation with basic tools" },
      { value: 3, label: "Some ML projects completed or in progress" },
      { value: 4, label: "Regular use of ML platforms and frameworks" },
      { value: 5, label: "Advanced ML operations (MLOps) infrastructure in place" },
    ],
  },
  {
    id: "infra-3",
    category: "infrastructure",
    question: "How integrated are your current systems and data sources?",
    options: [
      { value: 1, label: "Highly siloed systems with minimal integration" },
      { value: 2, label: "Some integration via manual processes" },
      { value: 3, label: "Moderate integration with basic APIs" },
      { value: 4, label: "Well-integrated with modern APIs and data pipelines" },
      { value: 5, label: "Fully integrated enterprise architecture with real-time data flow" },
    ],
  },
  {
    id: "infra-4",
    category: "infrastructure",
    question: "What level of computing resources can your organization allocate for AI projects?",
    options: [
      { value: 1, label: "Limited resources, budget constraints" },
      { value: 2, label: "Small budget for proof-of-concept projects" },
      { value: 3, label: "Moderate resources for pilot projects" },
      { value: 4, label: "Dedicated budget for AI initiatives" },
      { value: 5, label: "Significant investment capacity for enterprise AI" },
    ],
  },
  // Organizational Culture (4 questions)
  {
    id: "culture-1",
    category: "culture",
    question: "How supportive is your leadership team of AI and digital transformation initiatives?",
    options: [
      { value: 1, label: "Skeptical or resistant to AI adoption" },
      { value: 2, label: "Aware but not actively supportive" },
      { value: 3, label: "Moderately supportive with some advocacy" },
      { value: 4, label: "Actively championing AI initiatives" },
      { value: 5, label: "AI is a core strategic priority with executive sponsorship" },
    ],
  },
  {
    id: "culture-2",
    category: "culture",
    question: "How comfortable are employees with data-driven decision making?",
    options: [
      { value: 1, label: "Primarily intuition-based decision making" },
      { value: 2, label: "Some data used but not consistently" },
      { value: 3, label: "Data-informed decisions in key areas" },
      { value: 4, label: "Strong data-driven culture in most departments" },
      { value: 5, label: "Pervasive data-driven culture with advanced analytics" },
    ],
  },
  {
    id: "culture-3",
    category: "culture",
    question: "Does your organization have in-house data science or AI expertise?",
    options: [
      { value: 1, label: "No data science capabilities" },
      { value: 2, label: "1-2 individuals with basic data skills" },
      { value: 3, label: "Small team with ML experience" },
      { value: 4, label: "Dedicated data science team" },
      { value: 5, label: "Large, mature AI/ML center of excellence" },
    ],
  },
  {
    id: "culture-4",
    category: "culture",
    question: "How open is your organization to change and innovation?",
    options: [
      { value: 1, label: "Highly resistant to change" },
      { value: 2, label: "Cautious with incremental improvements" },
      { value: 3, label: "Moderately innovative in some areas" },
      { value: 4, label: "Innovation-friendly culture with experimentation" },
      { value: 5, label: "Highly innovative with fail-fast mentality" },
    ],
  },
  // Strategic Alignment (4 questions)
  {
    id: "strategy-1",
    category: "strategy",
    question: "Has your organization identified specific AI use cases aligned with business goals?",
    options: [
      { value: 1, label: "No clear use cases identified" },
      { value: 2, label: "Vague ideas without business alignment" },
      { value: 3, label: "A few use cases identified" },
      { value: 4, label: "Multiple prioritized use cases with ROI estimates" },
      { value: 5, label: "Comprehensive AI roadmap with clear business value" },
    ],
  },
  {
    id: "strategy-2",
    category: "strategy",
    question: "Do you have defined metrics to measure AI project success?",
    options: [
      { value: 1, label: "No success metrics defined" },
      { value: 2, label: "Vague success criteria" },
      { value: 3, label: "Basic KPIs identified" },
      { value: 4, label: "Clear, measurable success metrics" },
      { value: 5, label: "Comprehensive measurement framework with continuous monitoring" },
    ],
  },
  {
    id: "strategy-3",
    category: "strategy",
    question: "What is your organization's AI maturity level?",
    options: [
      { value: 1, label: "Awareness - just learning about AI" },
      { value: 2, label: "Exploration - investigating possibilities" },
      { value: 3, label: "Experimentation - running pilot projects" },
      { value: 4, label: "Implementation - deploying AI solutions" },
      { value: 5, label: "Optimization - scaling AI across the enterprise" },
    ],
  },
  {
    id: "strategy-4",
    category: "strategy",
    question: "How well does your organization understand AI ethics and responsible AI practices?",
    options: [
      { value: 1, label: "Not considered" },
      { value: 2, label: "Aware but no formal approach" },
      { value: 3, label: "Basic guidelines in place" },
      { value: 4, label: "Formal ethics framework" },
      { value: 5, label: "Comprehensive responsible AI program with governance" },
    ],
  },
];
