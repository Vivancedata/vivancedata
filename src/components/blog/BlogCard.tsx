"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { HoverCard } from "@/components/common/Animations";
import { prefersReducedMotion } from "@/lib/performance";
import { useMemo, useState } from "react";

interface BlogCardProps {
  slug: string;
  title: string;
  description: string;
  date: string;
  image: string;
  tags: string[];
}

export function BlogCard({ slug, title, description, date, image, tags }: BlogCardProps) {
  const [reducedMotion] = useState(() => prefersReducedMotion());

  const formattedDate = useMemo(() => {
    try {
      const dateObj = new Date(date);
      return dateObj.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return date;
    }
  }, [date]);

  return (
    <Link href={`/blog/${slug}`} className="block h-full">
      <HoverCard className="h-full">
        <Card className="flex flex-col h-full overflow-hidden group cursor-pointer border border-border/40 bg-card/60 backdrop-blur-sm transition-all duration-300 hover:border-primary/20 hover:shadow-lg dark:hover:shadow-primary/5">
          <div className="relative w-full h-52 overflow-hidden">
            <m.div
              whileHover={{ scale: reducedMotion ? 1 : 1.05 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-full"
            >
              <Image
                src={image}
                alt={`Featured image for blog post: ${title}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </m.div>
            
            <div className="absolute top-4 left-4 z-10 flex gap-2 flex-wrap">
              {tags.slice(0, 3).map((tag) => (
                <Badge 
                  key={tag} 
                  variant="secondary" 
                  className="text-xs bg-white/90 text-gray-800 dark:bg-gray-800/90 dark:text-gray-200 shadow-sm backdrop-blur-sm"
                >
                  {tag}
                </Badge>
              ))}
              {tags.length > 3 && (
                <Badge 
                  variant="secondary" 
                  className="text-xs bg-white/90 text-gray-800 dark:bg-gray-800/90 dark:text-gray-200 shadow-sm backdrop-blur-sm"
                >
                  +{tags.length - 3}
                </Badge>
              )}
            </div>
          </div>
          
          <CardHeader className="pb-2">
            <CardTitle className="line-clamp-2 text-xl group-hover:text-primary transition-colors duration-200">
              {title}
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              {formattedDate}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="flex-grow">
            <p className="text-muted-foreground line-clamp-3 text-sm">
              {description}
            </p>
          </CardContent>
          
          <div className="px-6 pb-6">
            <div className="flex items-center text-sm font-medium text-primary">
              <span>Read more</span>
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 16 16" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="ml-1 transition-transform duration-300 group-hover:translate-x-1"
              >
                <path 
                  d="M6.5 12.5L11 8L6.5 3.5" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </Card>
      </HoverCard>
    </Link>
  );
}
