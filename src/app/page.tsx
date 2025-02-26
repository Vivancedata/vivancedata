import Image from "next/image";
import { Button } from "@/components/ui/button";
import Welcome from "@/components/home/welcome";
import Overview from "@/components/home/overview";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/common/question";
import { ProfileForm } from "@/components/contact/Form";
import Team from "@/components/home/Team";
import CaseStudies from "@/components/home/CaseStudies";
import Process from "@/components/home/Process";
import Partners from "@/components/home/Partners";
import Blog from "@/components/blog/Blog";
import Pricing from "@/components/home/Pricing";
import { ArrowRight, CheckCircle, BarChart3, Users, Clock, Award } from "lucide-react";

export default function Home() {
  const stats = [
    { icon: <Users className="h-8 w-8 text-blue-500" />, value: "500+", label: "Clients Served" },
    { icon: <CheckCircle className="h-8 w-8 text-blue-500" />, value: "98%", label: "Client Satisfaction" },
    { icon: <BarChart3 className="h-8 w-8 text-blue-500" />, value: "35%", label: "Average ROI Increase" },
    { icon: <Clock className="h-8 w-8 text-blue-500" />, value: "10+", label: "Years Experience" },
    { icon: <Award className="h-8 w-8 text-blue-500" />, value: "25+", label: "Industry Awards" }
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Welcome />
      <Overview />
      <Process />
      {/* Case Studies */}
      <CaseStudies />
      <section className="w-full bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact By The Numbers</h2>
            <p className="text-blue-100 max-w-2xl mx-auto">We&apos;ve helped hundreds of businesses achieve measurable results through our AI solutions.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="bg-white/10 rounded-full p-4 mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Testimonials />
      <Team />
      <Partners />
      <Pricing />
      <Blog />
      {/* FAQ Section */}
      <section className="container mx-auto py-16 px-4 md:py-24">
        <div className="text-center mb-12">
          <div className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 mb-4">
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Common Questions About Our AI Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Find answers to the most common questions about our services and how we can help your business.</p>
        </div>
        <div className="max-w-3xl mx-auto">
          <FAQ />
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="container mx-auto py-16 px-4 md:py-24 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 mb-4">
              Get In Touch
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Business with AI?</h2>
            <p className="text-gray-600 mb-6">
              Fill out the form to schedule a free consultation with our AI experts. We&apos;ll analyze your business needs and recommend the best solutions for your specific challenges.
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-blue-100 p-2 mt-1">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Free Initial Consultation</h3>
                  <p className="text-gray-600">No obligation, just valuable insights for your business.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-blue-100 p-2 mt-1">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Customized Solutions</h3>
                  <p className="text-gray-600">Tailored recommendations based on your specific needs.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-blue-100 p-2 mt-1">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Ongoing Support</h3>
                  <p className="text-gray-600">We&apos;re with you every step of the way, from strategy to implementation.</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <ProfileForm />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="w-full bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Join hundreds of forward-thinking businesses that are already leveraging our AI solutions.
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
            <span>Schedule a Demo</span>
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </main>
  );
}
