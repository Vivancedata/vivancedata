"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";
import { AnimateOnScroll, StaggerContainer } from "@/hooks/useAnimateOnScroll";
import { m } from "framer-motion";
import { Avatar } from "@/components/common/Avatar";

const BlogIllustration = ({ category }: { category: string }) => {
  if (category === "AI Implementation") {
    return (
      <div className="bg-slate-900 h-full w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/50 to-slate-900" />
        <div className="absolute inset-0 p-5 flex flex-col justify-center gap-2.5">
          <div className="text-primary/40 font-mono text-xs mb-1">// Implementation Roadmap</div>
          {["Assess", "Design", "Build", "Deploy"].map((phase, i) => (
            <div key={phase} className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center shrink-0 font-mono">{i + 1}</div>
              <div className="h-1 rounded-full bg-primary/30" style={{ width: `${85 - i * 10}%` }} />
              <span className="text-white/30 text-xs font-mono">{phase}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (category === "AI Trends") {
    return (
      <div className="bg-slate-900 h-full w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/50 to-slate-900" />
        <div className="absolute inset-0 p-5 flex flex-col justify-center">
          <div className="text-violet-400/40 font-mono text-xs mb-3">// AI Adoption Metrics 2025</div>
          <div className="space-y-3">
            {[["GPT API Calls", "↑ 340%"], ["Enterprise Adoption", "78%"], ["New Models", "12,000+"]].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-white/30 text-xs">{label}</span>
                <span className="text-violet-300/70 text-sm font-bold font-mono">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (category === "AI Ethics") {
    return (
      <div className="bg-slate-900 h-full w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/50 to-slate-900" />
        <div className="absolute inset-0 p-5 flex flex-col justify-center">
          <div className="text-teal-400/40 font-mono text-xs mb-3">// Ethics Framework</div>
          <div className="space-y-2">
            {["Fairness & Bias", "Transparency", "Privacy & Security", "Accountability"].map((item, i) => (
              <div key={item} className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded border text-xs flex items-center justify-center shrink-0 ${i < 3 ? "border-teal-400/50 text-teal-400/70" : "border-white/20 text-white/20"}`}>
                  {i < 3 ? "✓" : ""}
                </div>
                <span className={`text-xs ${i < 3 ? "text-white/40" : "text-white/20"}`}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return <div className="bg-slate-900 h-full w-full" />;
};

// Featured blog posts for the homepage
const featuredBlogPosts = [
  {
    id: "1",
    title: "AI Implementation Guide: From Strategy to Production",
    excerpt: "Implementing AI successfully requires more than just technology — it requires a structured approach. Learn our proven 6-phase methodology.",
    date: "2025-01-25",
    readTime: "15 min read",
    author: {
      name: "Lorenzo Scaturchio",
      role: "Founder, VivanceData",
      avatar: "",
    },
    category: "AI Implementation",
    slug: "ai-implementation-guide",
  },
  {
    id: "2",
    title: "The Future of Generative AI: Trends and Predictions",
    excerpt: "Generative AI is no longer a futuristic concept — it's here, transforming how businesses operate. Explore the latest trends and real-world applications.",
    date: "2025-01-22",
    readTime: "12 min read",
    author: {
      name: "Lorenzo Scaturchio",
      role: "Founder, VivanceData",
      avatar: "",
    },
    category: "AI Trends",
    slug: "future-of-generative-ai",
  },
  {
    id: "3",
    title: "A Comprehensive Guide to AI Ethics in Enterprise",
    excerpt: "As AI becomes more prevalent in business decisions, understanding and implementing ethical AI practices is crucial for sustainable success.",
    date: "2025-01-20",
    readTime: "14 min read",
    author: {
      name: "Lorenzo Scaturchio",
      role: "Founder, VivanceData",
      avatar: "",
    },
    category: "AI Ethics",
    slug: "ai-ethics-guide",
  },
];

const Blog = () => {
  return (
    <section className="w-full py-20 md:py-32 bg-gradient-to-b from-background to-muted/20 overflow-hidden">
      <div className="container mx-auto px-4 relative">
        {/* Background elements */}
        <div className="absolute top-40 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-20 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl -z-10" />
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-16">
          <AnimateOnScroll variant="fadeInUp">
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
              Latest Insights
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-primary">
              From Our Blog
            </h2>
            <p className="text-muted-foreground max-w-2xl text-lg">
              Stay updated with the latest trends, insights, and best practices in AI and machine learning.
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll variant="fadeInLeft" delay={0.2} className="mt-6 md:mt-0">
            <Link href="/blog">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 group transition-all duration-300 px-6 py-6 h-auto">
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
              className="overflow-hidden border-0 bg-card/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 rounded-xl group"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <BlogIllustration category={post.category} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary hover:bg-primary/90 px-3 py-1 text-sm">
                    {post.category}
                  </Badge>
                </div>
              </div>
              <CardHeader className="relative z-10 -mt-10 mx-4 bg-card/90 backdrop-blur-sm rounded-lg shadow-lg border border-border">
                <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                  <CardTitle className="text-xl font-bold">{post.title}</CardTitle>
                </Link>
                <div className="flex items-center text-sm text-muted-foreground space-x-4 mt-2">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-primary" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-primary" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <CardDescription className="text-base text-muted-foreground">
                  {post.excerpt}
                </CardDescription>
              </CardContent>
              <CardFooter className="border-t border-border pt-4 flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar
                    name={post.author.name}
                    src={post.author.avatar}
                    size="md"
                    className="mr-3 shadow-md"
                  />
                  <div>
                    <p className="text-sm font-bold">{post.author.name}</p>
                    <p className="text-xs text-muted-foreground">{post.author.role}</p>
                  </div>
                </div>
                <Link 
                  href={`/blog/${post.slug}`} 
                  className="text-primary hover:text-primary/80 text-sm font-medium flex items-center group/link"
                >
                  <span>Read More</span>
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </StaggerContainer>

        <AnimateOnScroll variant="fadeInUp" delay={0.3} className="mt-20">
          <div className="bg-primary rounded-2xl p-8 md:p-12 text-primary-foreground shadow-xl overflow-hidden relative">
            {/* Animated background elements */}
            <m.div 
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
            <m.div 
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
                <p className="text-primary-foreground/80 mb-8 text-lg">
                  Get the latest insights, articles, and updates on AI trends delivered straight to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="px-6 py-4 rounded-xl text-gray-900 w-full sm:w-auto flex-grow text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 py-4 h-auto text-lg font-medium rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
                    Subscribe
                  </Button>
                </div>
                <p className="text-sm text-primary-foreground/60 mt-4">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
              <div className="hidden md:block">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 shadow-lg">
                  <div className="flex items-start space-x-4">
                    <div className="bg-white/10 rounded-full p-3 shadow-lg">
                      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-4">What You&apos;ll Get:</h4>
                      <ul className="space-y-4">
                        {["Exclusive AI insights and research", "Industry case studies and success stories", "Early access to webinars and events"].map((item, index) => (
                          <m.li 
                            key={item} 
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
                          </m.li>
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
