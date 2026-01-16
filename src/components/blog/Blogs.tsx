"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/formatDate";
import { Clock, Calendar, ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";
import { BlogFilters } from "./BlogFilters";
import { BlogPost } from "@/types/blog";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export interface BlogsProps {
  blogs: BlogPost[];
}

export function Blogs({ blogs }: BlogsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get all unique tags from blogs
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    blogs.forEach(blog => {
      if (blog.tags) {
        blog.tags.forEach((tag: string) => tags.add(tag));
      }
    });
    return Array.from(tags);
  }, [blogs]);

  // Filter blogs based on search query and selected tags
  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog => {
      const query = searchQuery.toLowerCase().trim();

      // Check if search query matches title, description, or tags
      const matchesSearch = query === "" ||
        blog.title.toLowerCase().includes(query) ||
        blog.description.toLowerCase().includes(query) ||
        (blog.tags && blog.tags.some(tag => tag.toLowerCase().includes(query)));

      // Check if blog has all selected tag filters
      const matchesTags = selectedTags.length === 0 ||
        (blog.tags && selectedTags.every(tag => blog.tags!.includes(tag)));

      return matchesSearch && matchesTags;
    });
  }, [blogs, searchQuery, selectedTags]);

  return (
    <div>
      <BlogFilters
        allTags={allTags}
        onSearch={setSearchQuery}
        onTagsChange={setSelectedTags}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 mt-8"
      >
        {filteredBlogs.map((blog, index) => (
          <Link key={blog.slug} href={`/blog/${blog.slug}`}>
            <motion.article
              variants={item}
              className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-secondary/50 transition-all hover:bg-secondary/70"
            >
              {blog.image && (
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src={blog.image}
                  alt={`Featured image for ${blog.title}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover p-2 transform group-hover:scale-105 transition-transform duration-300"
                  priority={index < 3} // Prioritize loading for the first 3 images
                />
              </div>
              )}

              <div className="flex flex-1 flex-col justify-between p-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="size-3" />
                      <time dateTime={blog.date}>{formatDate(blog.date)}</time>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="size-3" />
                      <span>{blog.content ? Math.ceil(blog.content.split(/\s+/).length / 200) : 5} min read</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">
                      {blog.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {blog.description}
                    </p>
                  </div>

                  {blog.tags && (
                    <div className="flex flex-wrap gap-1.5">
                      {blog.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-4 flex items-center gap-2 text-sm font-medium">
                  Read article
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </motion.article>
          </Link>
        ))}
      </motion.div>

      {filteredBlogs.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-8"
        >
          <p className="text-muted-foreground">
            No blogs found matching your criteria.
          </p>
        </motion.div>
      )}
    </div>
  );
}
