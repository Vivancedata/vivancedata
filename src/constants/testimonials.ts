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
    name: "Operations Leader",
    role: "Mid-Market SaaS Company",
    text: "The engagement moved us from disconnected pilots to a production rollout plan we could actually execute. The team was practical, fast, and easy to work with.",
    rating: 5,
    image: "",
    initials: "OL",
    company: "Client interview, 2025",
    metrics: {
      percentImprovement: "Faster support triage",
      hoursSaved: "Reduced manual workflow steps",
      speedIncrease: "Faster issue resolution"
    }
  },
  {
    name: "Product Executive",
    role: "Regional Commerce Platform",
    text: "They helped us prioritize the highest-impact use cases first and set up the right measurement framework. That changed how we make AI investment decisions.",
    rating: 5,
    image: "",
    initials: "PE",
    company: "Client interview, 2025",
    metrics: {
      percentImprovement: "Improved forecast quality",
      hoursSaved: "Less ad-hoc reporting effort",
      speedIncrease: "Shorter delivery cycles"
    }
  },
  {
    name: "Customer Experience Lead",
    role: "Healthcare Services Organization",
    text: "What stood out was their focus on governance and adoption, not just model demos. We now have clearer controls and better cross-team alignment.",
    rating: 5,
    image: "",
    initials: "CX",
    company: "Client interview, 2025",
    metrics: {
      percentImprovement: "Higher team adoption",
      hoursSaved: "Fewer escalations",
      speedIncrease: "Faster approvals"
    }
  },
  {
    name: "Technology Director",
    role: "Financial Services Firm",
    text: "The architecture work was solid and realistic for our constraints. We left with an implementation roadmap our engineering and compliance teams both signed off on.",
    rating: 5,
    image: "",
    initials: "TD",
    company: "Client interview, 2025",
    metrics: {
      percentImprovement: "Improved model reliability",
      hoursSaved: "Less rework in delivery",
      speedIncrease: "Quicker go-live readiness"
    }
  },
];
