import React from "react";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/icons/Logo.png";
import { Facebook, Twitter, Linkedin, Instagram, Github, Mail, MapPin, Phone } from "lucide-react";
import { footerLinks, socialLinks } from "@/constants/navigation";
import { Newsletter } from "@/components/layout/Newsletter";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();
  
  // Helper function to get the appropriate icon component based on iconType
  const getSocialIcon = (iconType: string) => {
    switch (iconType) {
      case "linkedin":
        return <Linkedin className="h-5 w-5" />;
      case "twitter":
        return <Twitter className="h-5 w-5" />;
      case "facebook":
        return <Facebook className="h-5 w-5" />;
      case "instagram":
        return <Instagram className="h-5 w-5" />;
      case "github":
        return <Github className="h-5 w-5" />;
      default:
        return <Linkedin className="h-5 w-5" />;
    }
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-6">
              <Image src={logo} alt="VivanceData Logo" width={40} height={40} className="mr-2" />
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
                  className="bg-white p-2 rounded-full border border-gray-200 text-gray-600 hover:text-primary hover:border-primary transition-colors"
                  aria-label={link.label}
                >
                  {getSocialIcon(link.icon)}
                </a>
              ))}
            </div>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <span className="text-gray-600">123 AI Boulevard, San Francisco, CA 94107</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-2" />
                <span className="text-gray-600">(123) 456-7890</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-2" />
                <span className="text-gray-600">info@vivancedata.com</span>
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
                      className="text-gray-600 hover:text-primary transition-colors"
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
        <Newsletter />

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
