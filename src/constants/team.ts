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
    name: "Lorenzo Scaturchio",
    role: "Founder & AI Product Lead",
    bio: "Leads delivery across strategy, product design, and implementation with a focus on practical, measurable AI outcomes.",
    image: "",
    initials: "LS",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/lorenzo-scaturchio",
      github: "https://github.com/gr8monk3ys",
    },
  },
  {
    name: "AI Delivery Team",
    role: "Solution Architecture & Implementation",
    bio: "Cross-functional engineers and builders who design, integrate, and maintain production AI systems with your internal teams.",
    image: "",
    initials: "AD",
    socialLinks: {},
  },
  {
    name: "Data Engineering Team",
    role: "Data Platforms & Analytics",
    bio: "Builds reliable data pipelines, governance controls, and analytics foundations required for secure and scalable AI adoption.",
    image: "",
    initials: "DE",
    socialLinks: {},
  },
  {
    name: "Responsible AI Advisors",
    role: "Risk, Compliance & Governance",
    bio: "Supports policy, controls, and review workflows so teams can deploy AI responsibly in regulated and customer-facing contexts.",
    image: "",
    initials: "RA",
    socialLinks: {},
  },
];
