export interface TestimonialMetrics {
  percentImprovement?: string;
  hoursSaved?: string;
  costReduction?: string;
  speedIncrease?: string;
}

export interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
  image: string;
  initials: string;
  company: string;
  metrics: TestimonialMetrics;
}

export const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "CTO, TechVision Inc.",
    text: "VivanceData's AI solutions have completely transformed our customer service operations. We've seen a 40% reduction in response times and a significant improvement in customer satisfaction scores. Their team was professional, knowledgeable, and responsive throughout the entire implementation process.",
    rating: 5,
    image: "",
    initials: "SJ",
    company: "TechVision Inc.",
    metrics: {
      percentImprovement: "40% faster response times",
      hoursSaved: "12+ hours saved weekly",
      costReduction: "$85K annual savings"
    }
  },
  {
    name: "Michael Chen",
    role: "Director of Innovation, Global Retail Solutions",
    text: "We partnered with VivanceData to develop a predictive analytics solution for our inventory management. The results exceeded our expectations - 30% reduction in overstock and a 25% decrease in stockouts. Their expertise in AI and deep understanding of retail challenges made all the difference.",
    rating: 5,
    image: "",
    initials: "MC",
    company: "Global Retail Solutions",
    metrics: {
      percentImprovement: "30% less overstock",
      costReduction: "$120K inventory savings",
      speedIncrease: "3x faster forecasting"
    }
  },
  {
    name: "Emily Rodriguez",
    role: "VP of Marketing, HealthPlus",
    text: "The generative AI content solution from VivanceData has revolutionized our content marketing strategy. We're now able to create personalized content at scale, resulting in a 45% increase in engagement and 28% higher conversion rates. Their ongoing support has been exceptional.",
    rating: 5,
    image: "",
    initials: "ER",
    company: "HealthPlus",
    metrics: {
      percentImprovement: "45% more engagement",
      hoursSaved: "8-10 hours saved weekly",
      speedIncrease: "5x content output"
    }
  },
  {
    name: "David Wilson",
    role: "CEO, FinTech Innovations",
    text: "VivanceData delivered a custom AI solution that helped us identify patterns in financial data that we were previously missing. Their approach was thorough, and they took the time to understand our specific needs. The ROI on this project was evident within the first quarter.",
    rating: 5,
    image: "",
    initials: "DW",
    company: "FinTech Innovations",
    metrics: {
      percentImprovement: "43% better accuracy",
      costReduction: "$50K annual cost savings",
      speedIncrease: "2.5x faster analysis"
    }
  },
];
