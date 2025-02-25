import React from "react";
import { siteConfig } from "../config/site";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/icons/Logo.png";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Facebook, Twitter, Linkedin, Instagram, Github, Mail, MapPin, Phone } from "lucide-react";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Our Team", href: "/team" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "Generative AI", href: "/services/generative-ai" },
        { label: "AI Consulting", href: "/services/consulting" },
        { label: "Custom Solutions", href: "/services/custom" },
        { label: "Training", href: "/services/training" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Blog", href: "/blog" },
        { label: "Case Studies", href: "/case-studies" },
        { label: "Whitepapers", href: "/resources" },
        { label: "FAQ", href: "/faq" },
      ],
    },
  ];

  const socialLinks = [
    { icon: <Linkedin className="h-5 w-5" />, href: siteConfig.links.linkedin, label: "LinkedIn" },
    { icon: <Twitter className="h-5 w-5" />, href: "#", label: "Twitter" },
    { icon: <Facebook className="h-5 w-5" />, href: "#", label: "Facebook" },
    { icon: <Instagram className="h-5 w-5" />, href: "#", label: "Instagram" },
    { icon: <Github className="h-5 w-5" />, href: siteConfig.links.github, label: "GitHub" },
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-6">
              <Image src={logo} alt="VivaceFlow Logo" width={40} height={40} className="mr-2" />
              <span className="text-xl font-bold">{siteConfig.name}</span>
            </Link>
            <p className="text-gray-600 mb-6 max-w-md">
              {siteConfig.description}
            </p>
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((link, index) => (
                <a 
                  key={index} 
                  href={link.href} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="bg-white p-2 rounded-full border border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-600 transition-colors"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                <span className="text-gray-600">123 AI Boulevard, San Francisco, CA 94107</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-gray-600">(123) 456-7890</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-gray-600">info@vivaceflow.com</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((column, index) => (
            <div key={index}>
              <h3 className="font-semibold text-lg mb-4">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href} 
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-200 pt-8 mb-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="font-semibold text-lg mb-2">Subscribe to our newsletter</h3>
            <p className="text-gray-600 mb-4">Stay updated with the latest in AI and receive our insights directly to your inbox.</p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="bg-white"
              />
              <Button className="bg-blue-600 hover:bg-blue-700">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <Link href="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-blue-600 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
