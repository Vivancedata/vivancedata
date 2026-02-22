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
    role: "Founder & AI Engineer",
    bio: "Lorenzo leads every engagement directly — from initial scoping through implementation and handoff. He brings a background in software engineering and applied AI, with a focus on shipping production-ready systems rather than demos.",
    image: "",
    initials: "LS",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/lorenzo-scaturchio",
      github: "https://github.com/gr8monk3ys",
    },
  },
  {
    name: "Specialist Network",
    role: "Domain Collaborators",
    bio: "Depending on project scope, Lorenzo brings in trusted engineers, data scientists, and domain experts on a project basis. Every collaborator is vetted and works under the same quality bar as the core practice.",
    image: "",
    initials: "SN",
    socialLinks: {},
  },
];
