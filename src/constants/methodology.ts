export interface MethodologyPhase {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  duration: string;
  iconType: 'compass' | 'target' | 'layers' | 'rocket' | 'zap' | 'trendingUp';
}

export interface FrameworkBenefit {
  title: string;
  description: string;
  metric?: string;
}

export interface MethodologyFAQ {
  question: string;
  answer: string;
}

export const frameworkName = 'RAPID AI Framework';
export const frameworkTagline = 'Realize AI Potential In Days';

export const frameworkDescription = `The RAPID AI Framework is VivanceData's proven methodology for transforming businesses through artificial intelligence. Designed to minimize risk and maximize value, our structured approach ensures successful AI adoption from initial discovery to enterprise-scale deployment.`;

export const methodologyPhases: MethodologyPhase[] = [
  {
    id: 'discover',
    number: 1,
    title: 'Discover',
    subtitle: 'Understand Your AI Opportunity',
    description: 'We immerse ourselves in your business to identify high-impact AI opportunities. Through stakeholder interviews, data audits, and process analysis, we build a complete picture of your current state and AI readiness.',
    deliverables: [
      'AI Readiness Assessment Report',
      'Opportunity Prioritization Matrix',
      'Data Quality & Infrastructure Audit',
    ],
    duration: '1-2 weeks',
    iconType: 'compass',
  },
  {
    id: 'architect',
    number: 2,
    title: 'Architect',
    subtitle: 'Design Your AI Strategy',
    description: 'Our team designs a comprehensive AI strategy aligned with your business objectives. We create detailed technical architectures, define success metrics, and develop a phased implementation roadmap.',
    deliverables: [
      'Strategic AI Roadmap',
      'Technical Architecture Blueprint',
      'ROI Projections & Success Metrics',
    ],
    duration: '2-3 weeks',
    iconType: 'target',
  },
  {
    id: 'prototype',
    number: 3,
    title: 'Prototype',
    subtitle: 'Validate With Working Solutions',
    description: 'We build functional prototypes to validate AI concepts and demonstrate value quickly. This phase de-risks your investment by proving feasibility before full-scale development.',
    deliverables: [
      'Functional AI Prototype',
      'Performance Benchmark Report',
      'User Feedback & Iteration Plan',
    ],
    duration: '3-4 weeks',
    iconType: 'layers',
  },
  {
    id: 'implement',
    number: 4,
    title: 'Implement',
    subtitle: 'Build Production-Ready Solutions',
    description: 'Our engineers develop robust, scalable AI solutions integrated with your existing systems. We follow MLOps best practices to ensure reliability, security, and maintainability.',
    deliverables: [
      'Production AI System',
      'Integration Documentation',
      'Training & Knowledge Transfer',
    ],
    duration: '6-12 weeks',
    iconType: 'rocket',
  },
  {
    id: 'deploy',
    number: 5,
    title: 'Deploy',
    subtitle: 'Launch With Confidence',
    description: 'We orchestrate a smooth deployment with comprehensive testing, monitoring, and rollback capabilities. Your team receives hands-on training to ensure successful adoption.',
    deliverables: [
      'Deployed AI Solution',
      'Monitoring & Alerting Dashboard',
      'Operations Runbook',
    ],
    duration: '2-4 weeks',
    iconType: 'zap',
  },
  {
    id: 'scale',
    number: 6,
    title: 'Scale',
    subtitle: 'Optimize & Expand Impact',
    description: 'Post-launch, we continuously monitor performance, optimize models, and identify opportunities to expand AI capabilities across your organization.',
    deliverables: [
      'Performance Optimization Report',
      'Expansion Opportunity Assessment',
      'Continuous Improvement Plan',
    ],
    duration: 'Ongoing',
    iconType: 'trendingUp',
  },
];

export const frameworkBenefits: FrameworkBenefit[] = [
  {
    title: 'Accelerated Time-to-Value',
    description: 'Our structured approach delivers working AI solutions faster than traditional methods, with typical prototypes ready in weeks, not months.',
    metric: '60% faster deployment',
  },
  {
    title: 'Reduced Implementation Risk',
    description: 'Phased validation and prototyping ensures technical feasibility and business value before significant investment.',
    metric: '90% project success rate',
  },
  {
    title: 'Maximized ROI',
    description: 'Data-driven prioritization focuses resources on the highest-impact opportunities with clear, measurable returns.',
    metric: '3-5x average ROI',
  },
  {
    title: 'Sustainable AI Capability',
    description: 'Knowledge transfer and training builds internal AI expertise, reducing long-term dependency on external consultants.',
    metric: 'Self-sufficient in 6 months',
  },
];

export const methodologyFAQs: MethodologyFAQ[] = [
  {
    question: 'How long does a typical RAPID AI engagement take?',
    answer: 'Timeline varies based on scope and complexity. A focused proof-of-concept can be completed in 8-12 weeks, while enterprise-wide transformations typically span 6-12 months with phased deliverables.',
  },
  {
    question: 'What if we already have some AI initiatives in progress?',
    answer: 'The RAPID framework is designed to integrate with existing initiatives. We can assess your current state, identify gaps, and accelerate ongoing projects while ensuring alignment with broader strategic objectives.',
  },
  {
    question: 'Do we need a data science team to work with VivanceData?',
    answer: 'No. Our team provides full-service AI implementation. However, if you have internal data science resources, we collaborate closely and focus on knowledge transfer to build your long-term capabilities.',
  },
  {
    question: 'What industries is the RAPID framework best suited for?',
    answer: 'The framework is industry-agnostic and has been successfully applied across financial services, healthcare, retail, manufacturing, and technology sectors. We customize the approach based on your specific regulatory and operational requirements.',
  },
  {
    question: 'How do you ensure AI solutions are ethical and compliant?',
    answer: 'Responsible AI practices are embedded throughout the RAPID framework. We conduct bias assessments, implement explainability features, and ensure compliance with relevant regulations (GDPR, CCPA, industry-specific requirements).',
  },
];
