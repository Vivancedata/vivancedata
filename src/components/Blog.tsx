"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import Image from "next/image";
import aiSolutionsImage from "@/public/images/ai-solutions.png";
import Link from "next/link";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  category: string;
  image: any;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Future of Generative AI in Business: Trends to Watch",
    excerpt: "Explore the emerging trends in generative AI and how they're reshaping business operations across industries.",
    date: "February 15, 2025",
    readTime: "8 min read",
    author: {
      name: "Dr. Emily Chen",
      role: "Chief AI Officer",
      avatar: "",
    },
    category: "AI Trends",
    image: aiSolutionsImage,
    slug: "future-of-generative-ai-in-business",
  },
  {
    id: "2",
    title: "Implementing Ethical AI: A Framework for Responsible Innovation",
    excerpt: "Learn how to develop and deploy AI solutions that are not only powerful but also ethical and responsible.",
    date: "February 8, 2025",
    readTime: "10 min read",
    author: {
      name: "Priya Patel",
      role: "AI Ethics Director",
      avatar: "",
    },
    category: "AI Ethics",
    image: aiSolutionsImage,
    slug: "implementing-ethical-ai-framework",
  },
  {
    id: "3",
    title: "How Predictive Analytics is Transforming Supply Chain Management",
    excerpt: "Discover how AI-powered predictive analytics is helping businesses optimize their supply chains and reduce costs.",
    date: "January 30, 2025",
    readTime: "7 min read",
    author: {
      name: "David Kim",
      role: "Lead Data Scientist",
      avatar: "",
    },
    category: "Predictive Analytics",
    image: aiSolutionsImage,
    slug: "predictive-analytics-supply-chain-management",
  },
];

const Blog = () => {
  return (
    <section className="w-full py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <div className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 mb-4">
              Latest Insights
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">From Our Blog</h2>
            <p className="text-gray-600 max-w-2xl">
              Stay updated with the latest trends, insights, and best practices in AI and machine learning.
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48 w-full">
                <Image 
                  src={post.image} 
                  alt={post.title}
                  className="object-cover"
                  fill
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-blue-600 hover:bg-blue-700">
                    {post.category}
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                </Link>
                <div className="flex items-center text-sm text-gray-500 space-x-4 mt-2">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {post.excerpt}
                </CardDescription>
              </CardContent>
              <CardFooter className="border-t border-gray-100 pt-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mr-2">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{post.author.name}</p>
                    <p className="text-xs text-gray-500">{post.author.role}</p>
                  </div>
                </div>
                <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                  Read More
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 md:p-12 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Subscribe to Our Newsletter</h3>
              <p className="text-blue-100 mb-6">
                Get the latest insights, articles, and updates on AI trends delivered straight to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="px-4 py-3 rounded-lg text-gray-900 w-full sm:w-auto flex-grow"
                />
                <Button className="bg-white text-blue-600 hover:bg-blue-50">
                  Subscribe
                </Button>
              </div>
              <p className="text-sm text-blue-200 mt-3">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-start space-x-4">
                  <div className="bg-white rounded-full p-2 text-blue-600">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">What You&apos;ll Get:</h4>
                    <ul className="space-y-2 mt-2">
                      <li className="flex items-center">
                        <div className="rounded-full bg-white/20 p-1 mr-2">
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>Exclusive AI insights and research</span>
                      </li>
                      <li className="flex items-center">
                        <div className="rounded-full bg-white/20 p-1 mr-2">
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>Industry case studies and success stories</span>
                      </li>
                      <li className="flex items-center">
                        <div className="rounded-full bg-white/20 p-1 mr-2">
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>Early access to webinars and events</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
