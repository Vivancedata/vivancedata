"use client"

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ModeToggle";
import logo from "@/public/icons/Logo.png";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const navItems = [
    {
      name: "Services",
      href: "/services",
      hasDropdown: true,
      dropdownItems: [
        { name: "Generative AI Solutions", href: "/services/generative-ai" },
        { name: "AI Strategy Consulting", href: "/services/consulting" },
        { name: "Pre-built AI Solutions", href: "/services/solutions" },
        { name: "AI Training & Workshops", href: "/services/training" },
      ],
    },
    {
      name: "Case Studies",
      href: "/case-studies",
      hasDropdown: false,
    },
    {
      name: "Resources",
      href: "/resources",
      hasDropdown: true,
      dropdownItems: [
        { name: "Blog", href: "/blog" },
        { name: "Whitepapers", href: "/resources/whitepapers" },
        { name: "Webinars", href: "/resources/webinars" },
        { name: "AI Glossary", href: "/resources/glossary" },
      ],
    },
    {
      name: "About",
      href: "/about",
      hasDropdown: true,
      dropdownItems: [
        { name: "Our Story", href: "/about" },
        { name: "Team", href: "/about/team" },
        { name: "Careers", href: "/about/careers" },
        { name: "Contact", href: "/contact" },
      ],
    },
  ];

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled 
          ? "bg-white/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/80" 
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 z-50">
            <Image src={logo} alt={`${siteConfig.name} Logo`} width={40} height={40} />
            <span className="font-bold text-xl hidden sm:inline-block">{siteConfig.name}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                {item.hasDropdown ? (
                  <button 
                    className="flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 rounded-md transition-colors"
                    onClick={() => toggleDropdown(item.name)}
                  >
                    {item.name}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                ) : (
                  <Link 
                    href={item.href}
                    className="px-4 py-2 text-gray-700 hover:text-blue-600 rounded-md transition-colors"
                  >
                    {item.name}
                  </Link>
                )}

                {item.hasDropdown && (
                  <div className="absolute left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-2 bg-white rounded-lg shadow-lg border border-gray-100">
                      {item.dropdownItems?.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-gray-700">
              <Search className="h-5 w-5" />
            </Button>
            <ModeToggle />
            <Button className="bg-blue-600 hover:bg-blue-700">
              Contact Us
            </Button>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center gap-4 lg:hidden">
            <ModeToggle />
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-20 px-4 overflow-y-auto lg:hidden">
          <div className="space-y-4 py-4">
            {navItems.map((item) => (
              <div key={item.name} className="border-b border-gray-100 pb-4">
                {item.hasDropdown ? (
                  <>
                    <button 
                      className="flex items-center justify-between w-full py-2 text-gray-700"
                      onClick={() => toggleDropdown(item.name)}
                    >
                      <span className="font-medium">{item.name}</span>
                      <ChevronDown 
                        className={cn(
                          "h-5 w-5 transition-transform", 
                          activeDropdown === item.name ? "transform rotate-180" : ""
                        )} 
                      />
                    </button>
                    {activeDropdown === item.name && (
                      <div className="mt-2 pl-4 space-y-2">
                        {item.dropdownItems?.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="block py-2 text-gray-600 hover:text-blue-600"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link 
                    href={item.href}
                    className="block py-2 font-medium text-gray-700 hover:text-blue-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-4">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
