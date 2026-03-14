/* eslint-disable @next/next/no-html-link-for-pages */

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Clock, ChevronRight } from "lucide-react";
import { Avatar } from "@/components/common/Avatar";

const IMPLEMENTATION_PHASES = ["Assess", "Design", "Build", "Deploy"] as const;
const TREND_METRICS = [
  ["GPT API Calls", "↑ 340%"],
  ["Enterprise Adoption", "78%"],
  ["New Models", "12,000+"],
] as const;
const ETHICS_ITEMS = ["Fairness & Bias", "Transparency", "Privacy & Security", "Accountability"] as const;
const NEWSLETTER_BENEFITS = [
  "Exclusive AI insights and research",
  "Industry case studies and success stories",
  "Early access to webinars and events",
] as const;

function BlogIllustration({ category }: { category: string }) {
  if (category === "AI Implementation") {
    return (
      <div className="relative h-full w-full overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/50 to-slate-900" />
        <div className="absolute inset-0 flex flex-col justify-center gap-2.5 p-5">
          <div className="mb-1 font-mono text-xs text-primary/40">// Implementation Roadmap</div>
          {IMPLEMENTATION_PHASES.map((phase, index) => (
            <div key={phase} className="flex items-center gap-2">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 font-mono text-xs text-primary">
                {index + 1}
              </div>
              <div className="h-1 rounded-full bg-primary/30" style={{ width: `${85 - index * 10}%` }} />
              <span className="font-mono text-xs text-white/30">{phase}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (category === "AI Trends") {
    return (
      <div className="relative h-full w-full overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/50 to-slate-900" />
        <div className="absolute inset-0 flex flex-col justify-center p-5">
          <div className="mb-3 font-mono text-xs text-violet-400/40">// AI Adoption Metrics 2025</div>
          <div className="space-y-3">
            {TREND_METRICS.map(([label, value]) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-xs text-white/30">{label}</span>
                <span className="font-mono text-sm font-bold text-violet-300/70">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (category === "AI Ethics") {
    return (
      <div className="relative h-full w-full overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/50 to-slate-900" />
        <div className="absolute inset-0 flex flex-col justify-center p-5">
          <div className="mb-3 font-mono text-xs text-teal-400/40">// Ethics Framework</div>
          <div className="space-y-2">
            {ETHICS_ITEMS.map((item, index) => {
              const isComplete = index < 3;
              return (
                <div key={item} className="flex items-center gap-2">
                  <div
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border text-xs ${
                      isComplete ? "border-teal-400/50 text-teal-400/70" : "border-white/20 text-white/20"
                    }`}
                  >
                    {isComplete ? "✓" : ""}
                  </div>
                  <span className={`text-xs ${isComplete ? "text-white/40" : "text-white/20"}`}>{item}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return <div className="h-full w-full bg-slate-900" />;
}

const featuredBlogPosts = [
  {
    id: "1",
    title: "AI Implementation Guide: From Strategy to Production",
    excerpt:
      "Implementing AI successfully requires more than just technology — it requires a structured approach. Learn our proven 6-phase methodology.",
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
    excerpt:
      "Generative AI is no longer a futuristic concept — it's here, transforming how businesses operate. Explore the latest trends and real-world applications.",
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
    excerpt:
      "As AI becomes more prevalent in business decisions, understanding and implementing ethical AI practices is crucial for sustainable success.",
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

export default function Blog() {
  return (
    <section
      className="w-full overflow-hidden bg-gradient-to-b from-background to-muted/20 py-20 md:py-32"
    >
      <div className="container relative mx-auto px-4">
        <div className="absolute right-0 top-40 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-20 left-0 -z-10 h-80 w-80 rounded-full bg-secondary/5 blur-3xl" />

        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              Latest Insights
            </div>
            <h2 className="mb-4 text-3xl font-bold text-primary md:text-5xl">From Our Blog</h2>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Stay updated with the latest trends, insights, and best practices in AI and machine learning.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="h-auto border-primary px-6 py-6 text-primary transition-all duration-300 hover:bg-primary/10"
          >
            <a href="/blog" className="group">
              <span>View All Articles</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {featuredBlogPosts.map((post) => (
            <Card
              key={post.id}
              className="group overflow-hidden rounded-xl border-0 bg-card/80 shadow-xl backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <BlogIllustration category={post.category} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                <div className="absolute left-4 top-4">
                  <Badge className="bg-primary px-3 py-1 text-sm hover:bg-primary/90">{post.category}</Badge>
                </div>
              </div>
              <CardHeader className="relative z-10 -mt-10 mx-4 rounded-lg border border-border bg-card/90 shadow-lg backdrop-blur-sm">
                <a href={`/blog/${post.slug}`} className="transition-colors hover:text-primary">
                  <CardTitle className="text-xl font-bold">{post.title}</CardTitle>
                </a>
                <div className="mt-2 flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4 text-primary" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4 text-primary" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <CardDescription className="text-base text-muted-foreground">{post.excerpt}</CardDescription>
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t border-border pt-4">
                <div className="flex items-center">
                  <Avatar name={post.author.name} src={post.author.avatar} size="md" className="mr-3 shadow-md" />
                  <div>
                    <p className="text-sm font-bold">{post.author.name}</p>
                    <p className="text-xs text-muted-foreground">{post.author.role}</p>
                  </div>
                </div>
                <a
                  href={`/blog/${post.slug}`}
                  className="group/link flex items-center text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                  <span>Read More</span>
                  <span className="sr-only"> about {post.title}</span>
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-20">
          <div className="relative overflow-hidden rounded-2xl bg-emerald-900 p-8 text-primary-foreground shadow-xl md:p-12">
            <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-xl motion-safe:animate-pulse" />
            <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-white/10 blur-xl motion-safe:animate-pulse" />

            <div className="relative z-10 grid grid-cols-1 items-center gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-4 text-3xl font-bold md:text-4xl">Subscribe to Our Newsletter</h3>
                <p className="mb-8 text-lg text-primary-foreground/90">
                  Get the latest insights, articles, and updates on AI trends delivered straight to your inbox.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full flex-grow rounded-xl bg-white px-6 py-4 text-lg text-slate-950 placeholder:text-slate-600 shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50 sm:w-auto"
                  />
                  <Button className="h-auto rounded-xl bg-primary-foreground px-8 py-4 text-lg font-medium text-primary shadow-lg transition-all duration-300 hover:bg-primary-foreground/90 hover:shadow-xl">
                    Subscribe
                  </Button>
                </div>
                <p className="mt-4 text-sm text-primary-foreground/80">We respect your privacy. Unsubscribe at any time.</p>
              </div>
              <div className="hidden md:block">
                <div className="rounded-xl border border-white/20 bg-white/10 p-8 shadow-lg backdrop-blur-sm">
                  <div className="flex items-start space-x-4">
                    <div className="rounded-full bg-white/10 p-3 shadow-lg">
                      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="mb-4 text-xl font-bold">What You&apos;ll Get:</h4>
                      <ul className="space-y-4">
                        {NEWSLETTER_BENEFITS.map((item) => (
                          <li key={item} className="flex items-center">
                            <div className="mr-3 rounded-full bg-white/20 p-1 shadow-inner">
                              <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className="text-lg font-medium">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
