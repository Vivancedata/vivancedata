"use client";

import React from "react";
import Testimonials from "@/components/home/Testimonials";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutDescription } from "@/components/about/AboutDescription";
import { AboutValue } from "@/components/about/AboutValue";
import { AboutTeam } from "@/components/about/AboutTeam";

const AboutPage = () => {
  const teamMembers = [
    {
      id: "1",
      name: "Lorenzo Scaturchio",
      role: "AI Engineer & Founder",
      bio: "With a strong background in software development and a passion for AI, Lorenzo has been instrumental in driving our success.",
      imageSrc: "/images/ai-solutions.png" // Placeholder image
    },
    {
      id: "2",
      name: "Jane Smith",
      role: "Data Scientist",
      bio: "Jane brings over 8 years of experience in machine learning and data analysis to help clients extract meaningful insights.",
      imageSrc: "/images/ai-solutions.png" // Placeholder image
    },
    {
      id: "3",
      name: "Michael Johnson",
      role: "Solutions Architect",
      bio: "Michael specializes in designing scalable AI systems that integrate seamlessly with existing business processes.",
      imageSrc: "/images/ai-solutions.png" // Placeholder image
    }
  ];

  return (
    <div>
      <AboutHero 
        title="About VivanceData"
        description="AI and data reshape our world at a relentless speed, but still, most companies find themselves caught between possibility and complexity."
      />
      
      <AboutDescription 
        title="Not your typical tech consultancy"
        description="We are systematic innovators, developers, and strategic guides, transforming how businesses and developers harness the forces of data and AI. Our name reflects our mission: 'Vivace' grounds us in the technical foundation of everything we do, while 'Flow' represents the clarity and guidance we provide. Together, they embody our commitment to illuminating the path from complexity to capability."
      />
      
      <AboutValue 
        title="Empowering businesses with practical value"
        description="We believe breakthrough innovation comes from something other than chasing every new development. We identify what creates actual value, not just buzz. Our solutions are built for production, not just presentations. Whether a Fortune 500 or a solo developer, we help you master the tools of tomorrow."
        imageSrc="/images/ai-solutions.png"
      />
      
      <AboutTeam 
        title="Our Team"
        description="With over a decade of experience, our team is dedicated to tackling your toughest data challenges."
        members={teamMembers}
      />
      
      <Testimonials />
    </div>
  );
};

export default AboutPage;
