import Welcome from "@/components/home/Welcome";
import ClientLogos from "@/components/home/ClientLogos";
import Overview from "@/components/home/Overview";
import Testimonials from "@/components/home/Testimonials";
import { TrustSection } from "@/components/home/TrustSection";
import Team from "@/components/home/Team";
import CaseStudies from "@/components/home/CaseStudies";
import Process from "@/components/home/Process";
import Integrations from "@/components/home/Integrations";
import Blog from "@/components/blog/Blog";
import ResourcesSection from "@/components/home/ResourcesSection";
import Pricing from "@/components/home/Pricing";
import { StatsSection } from "@/components/home/StatsSection";
import { FAQSection } from "@/components/home/FAQSection";
import { DemoBooking } from "@/components/home/DemoBooking";
import { ContactSection } from "@/components/home/ContactSection";
import { CTASection } from "@/components/home/CTASection";
import { Users, CheckCircle, BarChart3, Clock, Award } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "VivanceData - AI Solutions for Modern Businesses",
  description: "We combine cutting-edge AI technology with deep industry expertise to deliver solutions that drive real business outcomes. Transform your business with intelligent automation.",
  keywords: ["AI solutions", "artificial intelligence", "business automation", "machine learning", "generative AI", "AI consulting", "data analytics"],
  openGraph: {
    title: "VivanceData - AI Solutions for Modern Businesses",
    description: "Transform your business with intelligent automation. We deliver AI solutions that drive real outcomes.",
    type: "website",
    url: "https://vivancedata.com",
    images: [
      {
        url: "https://vivancedata.com/images/banner.png",
        width: 1200,
        height: 630,
        alt: "VivanceData AI Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VivanceData - AI Solutions for Modern Businesses",
    description: "Transform your business with intelligent automation.",
    images: ["https://vivancedata.com/images/banner.png"],
  },
};

// JSON-LD schema for the homepage
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://vivancedata.com/#organization",
      "name": "VivanceData",
      "url": "https://vivancedata.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://vivancedata.com/icons/Logo.png",
        "width": 180,
        "height": 60
      },
      "description": "VivanceData provides cutting-edge AI solutions to help businesses transform through intelligent automation.",
      "sameAs": [
        "https://twitter.com/vivancedata",
        "https://linkedin.com/company/vivancedata",
        "https://github.com/vivancedata"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://vivancedata.com/#website",
      "url": "https://vivancedata.com",
      "name": "VivanceData - AI Solutions for Modern Businesses",
      "description": "Transforming Businesses Through Intelligent Automation",
      "publisher": {
        "@id": "https://vivancedata.com/#organization"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://vivancedata.com/#webpage",
      "url": "https://vivancedata.com",
      "name": "VivanceData - AI Solutions for Modern Businesses",
      "description": "We combine cutting-edge AI technology with deep industry expertise to deliver solutions that drive real business outcomes.",
      "isPartOf": {
        "@id": "https://vivancedata.com/#website"
      },
      "about": {
        "@id": "https://vivancedata.com/#organization"
      }
    }
  ]
};

export default function Home() {
  const stats = [
    { icon: <Users className="h-8 w-8 text-blue-500" />, value: "500+", label: "Clients Served" },
    { icon: <CheckCircle className="h-8 w-8 text-blue-500" />, value: "98%", label: "Client Satisfaction" },
    { icon: <BarChart3 className="h-8 w-8 text-blue-500" />, value: "35%", label: "Average ROI Increase" },
    { icon: <Clock className="h-8 w-8 text-blue-500" />, value: "10+", label: "Years Experience" },
    { icon: <Award className="h-8 w-8 text-blue-500" />, value: "25+", label: "Industry Awards" }
  ];

  const contactBenefits = [
    {
      title: "Free Initial Consultation",
      description: "No obligation, just valuable insights for your business."
    },
    {
      title: "Customized Solutions",
      description: "Tailored recommendations based on your specific needs."
    },
    {
      title: "Ongoing Support",
      description: "We're with you every step of the way, from strategy to implementation."
    }
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Welcome />
      <ClientLogos />
      <TrustSection />
      <Overview />
      <Process />
      <Integrations />
      <CaseStudies />

      <StatsSection
        title="Our Impact By The Numbers"
        description="We've helped hundreds of businesses achieve measurable results through our AI solutions."
        stats={stats}
      />

      <Testimonials />
      <Team />
      <Pricing />
      <Blog />
      <ResourcesSection />

      <FAQSection
        title="Common Questions About Our AI Services"
        description="Find answers to the most common questions about our services and how we can help your business."
      />

      <DemoBooking />

      <ContactSection
        title="Ready to Transform Your Business with AI?"
        description="Fill out the form to schedule a free consultation with our AI experts. We'll analyze your business needs and recommend the best solutions for your specific challenges."
        benefits={contactBenefits}
      />

      <CTASection
        title="Ready to Get Started?"
        description="Join hundreds of forward-thinking businesses that are already leveraging our AI solutions."
        buttonText="Schedule a Demo"
        buttonLink="/contact"
      />
    </main>
  );
}
