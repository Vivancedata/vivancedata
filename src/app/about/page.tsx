import React from "react";
import { PageHero } from "@/components/common/PageHero";
import { AboutDescription } from "@/components/about/AboutDescription";
import { AboutValue } from "@/components/about/AboutValue";
import { AboutTeam } from "@/components/about/AboutTeam";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Vivancedata",
  description: "A founder-led AI practice working with construction, HVAC, logistics and manufacturing operations. Senior delivery, no hand-off to a junior team.",
  keywords: ["about Vivancedata", "Lorenzo Scaturchio", "founder-led AI practice", "AI for contractors", "AI for trades"],
  openGraph: {
    title: "About - Vivancedata",
    description: "A founder-led AI practice for construction, HVAC, logistics and manufacturing. The person who scopes the work builds it and answers the phone afterwards.",
    type: "website",
    url: "https://vivancedata.com/about",
    images: [
      {
        url: "https://vivancedata.com/images/ai-solutions.png",
        width: 1200,
        height: 630,
        alt: "Lorenzo Scaturchio, founder of Vivancedata",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About - Vivancedata",
    description: "A founder-led AI practice for the trades. One person, senior on every engagement, no hand-off.",
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
      <PageHero
        eyebrow="About"
        title={
          <>
            About <span className="text-brand">Vivancedata</span>
          </>
        }
        description="I'm Lorenzo. I build the small, specific systems that take the after-hours call and the twice-typed paperwork off a trade business, and I stay on to keep them running."
      />

      <AboutDescription
        title="A focused practice, not a large agency"
        description="Vivancedata is my practice, and it has no staff on purpose. I do the work on every engagement myself and bring in vetted specialists, project by project, when a job needs one. You deal with the person who scoped your build, wrote it and will pick up the phone when something changes — not an account manager."
      />

      <AboutValue
        title="Practical AI, not just demos"
        description="What I care about is what ships and what sticks. I find the one workflow that is costing you the most first, build it to run in production rather than in a slide deck, and hand it over with the code, prompts and notes your own people can maintain. If the honest answer is that a job is not worth automating yet, you hear that before you have paid for a build."
      />

      <AboutTeam
        title="Who you work with"
        description="Every engagement is led by me. Specialist collaborators come in project by project when the technical domain calls for one."
        members={teamMembers}
      />
    </div>
  );
};

export default AboutPage;
