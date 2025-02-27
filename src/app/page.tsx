import Welcome from "@/components/home/welcome";
import Overview from "@/components/home/overview";
import Testimonials from "@/components/home/Testimonials";
import Team from "@/components/home/Team";
import CaseStudies from "@/components/home/CaseStudies";
import Process from "@/components/home/Process";
import Blog from "@/components/blog/Blog";
import Pricing from "@/components/home/Pricing";
import { StatsSection } from "@/components/home/StatsSection";
import { FAQSection } from "@/components/home/FAQSection";
import { ContactSection } from "@/components/home/ContactSection";
import { CTASection } from "@/components/home/CTASection";
import { Users, CheckCircle, BarChart3, Clock, Award } from "lucide-react";

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
      <Welcome />
      <Overview />
      <Process />
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
      
      <FAQSection 
        title="Common Questions About Our AI Services"
        description="Find answers to the most common questions about our services and how we can help your business."
      />
      
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
