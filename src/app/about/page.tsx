import React from "react";
import Testimonials from "@/components/home/Testimonials";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutDescription } from "@/components/about/AboutDescription";
import { AboutValue } from "@/components/about/AboutValue";
import { AboutTeam } from "@/components/about/AboutTeam";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - VivanceData",
  description: "Learn about VivanceData's mission to empower businesses with practical AI value. Meet our team of systematic innovators, developers, and strategic guides.",
  keywords: ["about VivanceData", "AI company", "AI team", "AI consultants", "machine learning experts", "data science team"],
  openGraph: {
    title: "About Us - VivanceData",
    description: "Systematic innovators and strategic guides transforming how businesses harness the forces of data and AI.",
    type: "website",
    url: "https://vivancedata.com/about",
    images: [
      {
        url: "https://vivancedata.com/images/ai-solutions.png",
        width: 1200,
        height: 630,
        alt: "VivanceData Team",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us - VivanceData",
    description: "Systematic innovators transforming how businesses harness AI and data.",
    images: ["https://vivancedata.com/images/ai-solutions.png"],
  },
};

const AboutPage = () => {
  const teamMembers = [
    {
      id: "1",
      name: "Lorenzo Scaturchio",
      role: "Founder & AI Engineer",
      bio: "Lorenzo brings a background in software engineering and applied AI to help companies move from proof-of-concept to production. He leads every engagement directly — no hand-off to a junior team.",
      initials: "LS",
    },
  ];

  return (
    <div>
      <AboutHero
        title="About VivanceData"
        description="AI and data reshape our world at a relentless speed, but most companies find themselves caught between possibility and complexity. VivanceData exists to close that gap."
      />

      <AboutDescription
        title="A focused practice, not a large agency"
        description="VivanceData is a boutique AI consulting practice founded by Lorenzo Scaturchio. Rather than scaling headcount for its own sake, the model is simple: senior-level work on every engagement, with a trusted network of specialists brought in when a project demands it. That means you work directly with the person who designed your solution — not an account manager."
      />

      <AboutValue
        title="Practical AI, not just demos"
        description="The focus is on what ships and what sticks. I identify the highest-value opportunities first, build for production rather than presentations, and leave you with systems and knowledge your team can maintain. Whether you need strategy clarity, a working prototype, or a full implementation roadmap, the deliverable is always something you can act on."
      />

      <AboutTeam
        title="Who You Work With"
        description="Every engagement is led directly by Lorenzo. Specialist collaborators are brought in project-by-project based on the technical domain."
        members={teamMembers}
      />

      <Testimonials />
    </div>
  );
};

export default AboutPage;
