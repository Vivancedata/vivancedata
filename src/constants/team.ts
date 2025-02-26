export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  initials: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export const teamMembers: TeamMember[] = [
  {
    name: "Dr. Emily Chen",
    role: "Chief AI Officer",
    bio: "Ph.D. in Machine Learning from Stanford. 15+ years experience in AI research and implementation across various industries.",
    image: "",
    initials: "EC",
    socialLinks: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
  {
    name: "Michael Rodriguez",
    role: "CTO",
    bio: "Former Tech Lead at Google AI. Specialized in large language models and neural networks with multiple patents in AI technologies.",
    image: "",
    initials: "MR",
    socialLinks: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
  {
    name: "Sarah Johnson",
    role: "Head of AI Solutions",
    bio: "10+ years experience designing custom AI solutions for Fortune 500 companies. Expert in translating business needs into technical implementations.",
    image: "",
    initials: "SJ",
    socialLinks: {
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "David Kim",
    role: "Lead Data Scientist",
    bio: "Specializes in predictive analytics and data modeling. Previously led data science teams at Amazon and Microsoft.",
    image: "",
    initials: "DK",
    socialLinks: {
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Priya Patel",
    role: "AI Ethics Director",
    bio: "Expert in responsible AI development and ethical considerations in machine learning. Published author on AI ethics and governance.",
    image: "",
    initials: "PP",
    socialLinks: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "James Wilson",
    role: "Client Success Manager",
    bio: "Dedicated to ensuring seamless implementation of AI solutions and measuring ROI. 8+ years in customer success for tech companies.",
    image: "",
    initials: "JW",
    socialLinks: {
      linkedin: "#",
    },
  },
];
