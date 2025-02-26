"use client";

import * as React from "react";
import Testimonials from "@/components/home/Testimonials";
import { Button } from "@/components/ui/button";

const AboutPage = () => {
  return (
    <div>
      <main className="container mx-auto py-12">
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-lg mb-4">
            Welcome to VivaceFlow! We are a leading company specializing in AI solutions that transform businesses. Our team of experts, including Lorenzo Scaturchio, is dedicated to providing innovative and effective AI services to help you achieve your goals.
          </p>
          <p className="text-lg mb-4">
            Lorenzo Scaturchio, a key member of our team, brings a wealth of experience in AI and technology. With a strong background in software development and a passion for AI, Lorenzo has been instrumental in driving our success. You can learn more about Lorenzo&apos;s professional journey and achievements on his <a href="https://www.linkedin.com/in/lorenzo-scaturchio/" target="_blank" rel="noopener noreferrer">LinkedIn profile</a>.
          </p>
          <p className="text-lg mb-4">
            Our mission is to empower businesses with cutting-edge AI technology, enabling them to stay ahead in a rapidly evolving digital landscape. We pride ourselves on our commitment to excellence and our ability to deliver results that exceed expectations.
          </p>
          <p className="text-lg">
            Thank you for choosing VivaceFlow. We look forward to partnering with you on your journey to success. For more information about our team, visit Lorenzo Scaturchio&apos;s LinkedIn profile <a href="https://www.linkedin.com/in/lorenzo-scaturchio/" target="_blank" rel="noopener noreferrer">here</a>.
          </p>
          <Button variant="default" className="mt-4">
            Contact Us
          </Button>
        </section>
        <Testimonials />
      </main>
    </div>
  );
};

export default AboutPage;
