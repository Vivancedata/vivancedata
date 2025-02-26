"use client"

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/common/ModeToggle";
import logo from "@/public/icons/Logo.png";
import { Menu, X, ChevronDown, Search, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { motion, AnimatePresence } from "framer-motion";
import { navItems } from "@/constants/navigation";

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

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled 
          ? "bg-white/95 shadow-md backdrop-blur-md supports-[backdrop-filter]:bg-white/80" 
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center gap-3 z-50">
              <div className="relative overflow-hidden rounded-lg">
                <Image 
                  src={logo} 
                  alt={`${siteConfig.name} Logo`} 
                  width={44} 
                  height={44} 
                  className="transition-transform duration-300 hover:scale-110"
                />
              </div>
              <span className="font-bold text-xl hidden sm:inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                {siteConfig.name}
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item, index) => (
              <motion.div 
                key={item.name} 
                className="relative group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                {item.hasDropdown ? (
                  <button 
                    className="flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 rounded-md transition-colors group"
                    onClick={() => toggleDropdown(item.name)}
                  >
                    {item.name}
                    <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                  </button>
                ) : (
                  <Link 
                    href={item.href}
                    className="px-4 py-2 text-gray-700 hover:text-blue-600 rounded-md transition-colors relative group"
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                )}

                {item.hasDropdown && (
                  <div className="absolute left-0 mt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform group-hover:translate-y-0 translate-y-2">
                    <div className="py-3 bg-white rounded-xl shadow-xl border border-gray-100">
                      {item.dropdownItems?.map((dropdownItem, idx) => (
                        <motion.div
                          key={dropdownItem.name}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: 0.05 * idx }}
                        >
                          <Link
                            href={dropdownItem.href}
                            className="flex items-center px-5 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 group/item"
                          >
                            <span>{dropdownItem.name}</span>
                            <ChevronRight className="ml-auto h-4 w-4 opacity-0 transition-all duration-300 group-hover/item:opacity-100 group-hover/item:translate-x-1" />
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="hidden lg:flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button variant="ghost" size="icon" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">
              <Search className="h-5 w-5" />
            </Button>
            <ModeToggle />
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300">
              Contact Us
            </Button>
          </motion.div>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center gap-4 lg:hidden">
            <ModeToggle />
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 focus:outline-none transition-transform duration-300 hover:scale-110"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
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
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-md pt-20 px-6 overflow-y-auto lg:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-5 py-6">
              {navItems.map((item, index) => (
                <motion.div 
                  key={item.name} 
                  className="border-b border-gray-100 pb-5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 * index }}
                >
                  {item.hasDropdown ? (
                    <>
                      <button 
                        className="flex items-center justify-between w-full py-2 text-gray-800 font-medium"
                        onClick={() => toggleDropdown(item.name)}
                      >
                        <span className="text-lg">{item.name}</span>
                        <ChevronDown 
                          className={cn(
                            "h-5 w-5 text-blue-500 transition-transform duration-300", 
                            activeDropdown === item.name ? "transform rotate-180" : ""
                          )} 
                        />
                      </button>
                      <AnimatePresence>
                        {activeDropdown === item.name && (
                          <motion.div 
                            className="mt-3 pl-4 space-y-3"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            {item.dropdownItems?.map((dropdownItem, idx) => (
                              <motion.div
                                key={dropdownItem.name}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.2, delay: 0.05 * idx }}
                              >
                                <Link
                                  href={dropdownItem.href}
                                  className="flex items-center py-2 text-gray-600 hover:text-blue-600 transition-colors"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  <ChevronRight className="mr-2 h-4 w-4 text-blue-400" />
                                  <span>{dropdownItem.name}</span>
                                </Link>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link 
                      href={item.href}
                      className="block py-2 text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </motion.div>
              ))}
              <motion.div 
                className="pt-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-6 h-auto text-lg font-medium rounded-xl shadow-lg transition-all duration-300">
                  Contact Us
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
