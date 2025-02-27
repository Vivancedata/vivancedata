"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Clock, User, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AnimateOnScroll, StaggerContainer } from "@/hooks/useAnimateOnScroll";
import { motion } from "framer-motion";

// Sample blog posts for the homepage
const featuredBlogPosts = [
  {
    id: "1",
    title: "The Ultimate Guide to Implementing AI in Business: A Strategic Approach for 2025",
    excerpt: "Learn how to strategically implement AI solutions in your business to improve efficiency, drive growth, and gain competitive advantage.",
    date: "2025-02-26",
    readTime: "8 min read",
    author: {
      name: "Dr. Emily Chen",
      role: "Chief AI Officer",
      avatar: "",
    },
    category: "AI Implementation",
    image: "/images/ai-solutions.png",
    slug: "example-post",
  },
  {
    id: "2",
    title: "Generative AI in 2025: 10 Breakthrough Trends Transforming Industries",
    excerpt: "Discover the most significant emerging trends in generative AI and how they're reshaping industries from creative content to healthcare.",
    date: "2025-02-15",
    readTime: "10 min read",
    author: {
      name: "Michael Rodriguez",
      role: "AI Research Director",
      avatar: "",
    },
    category: "AI Trends",
    image: "/images/ai-solutions.png",
    slug: "future-of-generative-ai",
  },
  {
    id: "3",
    title: "The 2025 Framework for Ethical AI: Building Responsible Systems",
    excerpt: "Learn how to develop and deploy AI systems that are not only powerful but also ethical, fair, and transparent.",
    date: "2025-02-20",
    readTime: "12 min read",
    author: {
      name: "Priya Patel",
      role: "AI Ethics Director",
      avatar: "",
    },
    category: "AI Ethics",
    image: "/images/ai-solutions.png",
    slug: "ai-ethics-guide",
  },
];

const Blog = () => {
  return (
    <section className="w-full py-20 md:py-32 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
      <div className="container mx-auto px-4 relative">
        {/* Background elements */}
        <div className="absolute top-40 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-20 left-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl -z-10" />
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-16">
          <AnimateOnScroll variant="fadeInUp">
            <div className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 mb-4">
              Latest Insights
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              From Our Blog
            </h2>
            <p className="text-gray-600 max-w-2xl text-lg">
              Stay updated with the latest trends, insights, and best practices in AI and machine learning.
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll variant="fadeInLeft" delay={0.2} className="mt-6 md:mt-0">
            <Link href="/blog">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 group transition-all duration-300 px-6 py-6 h-auto">
                <span>View All Articles</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </AnimateOnScroll>
        </div>

        <StaggerContainer staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredBlogPosts.map((post) => (
            <Card 
              key={post.id} 
              className="overflow-hidden border-0 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 rounded-xl group"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image 
                  src={post.image} 
                  alt={post.title}
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  fill
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-blue-600 hover:bg-blue-700 px-3 py-1 text-sm">
                    {post.category}
                  </Badge>
                </div>
              </div>
              <CardHeader className="relative z-10 -mt-10 mx-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-100">
                <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
                  <CardTitle className="text-xl font-bold">{post.title}</CardTitle>
                </Link>
                <div className="flex items-center text-sm text-gray-500 space-x-4 mt-2">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-blue-500" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-blue-500" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <CardDescription className="text-base text-gray-600">
                  {post.excerpt}
                </CardDescription>
              </CardContent>
              <CardFooter className="border-t border-gray-100 pt-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full w-10 h-10 flex items-center justify-center mr-3 shadow-md">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{post.author.name}</p>
                    <p className="text-xs text-gray-500">{post.author.role}</p>
                  </div>
                </div>
                <Link 
                  href={`/blog/${post.slug}`} 
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center group/link"
                >
                  <span>Read More</span>
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </StaggerContainer>

        <AnimateOnScroll variant="fadeInUp" delay={0.3} className="mt-20">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-white shadow-xl overflow-hidden relative">
            {/* Animated background elements */}
            <motion.div 
              className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white/10 blur-xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.4, 0.3],
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <motion.div 
              className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-white/10 blur-xl"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity,
                repeatType: "reverse",
                delay: 1,
              }}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4">Subscribe to Our Newsletter</h3>
                <p className="text-blue-100 mb-8 text-lg">
                  Get the latest insights, articles, and updates on AI trends delivered straight to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="px-6 py-4 rounded-xl text-gray-900 w-full sm:w-auto flex-grow text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <Button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 h-auto text-lg font-medium rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
                    Subscribe
                  </Button>
                </div>
                <p className="text-sm text-blue-200 mt-4">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
              <div className="hidden md:block">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 shadow-lg">
                  <div className="flex items-start space-x-4">
                    <div className="bg-white rounded-full p-3 text-blue-600 shadow-lg">
                      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-4">What You&apos;ll Get:</h4>
                      <ul className="space-y-4">
                        {["Exclusive AI insights and research", "Industry case studies and success stories", "Early access to webinars and events"].map((item, index) => (
                          <motion.li 
                            key={index} 
                            className="flex items-center"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + (index * 0.2) }}
                          >
                            <div className="rounded-full bg-white/20 p-1 mr-3 shadow-inner">
                              <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className="text-lg">{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default Blog;
