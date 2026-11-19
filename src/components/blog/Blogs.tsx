"use client";

import Link from "next/link";
import { formatDate } from "@/lib/formatDate";
import { ArrowMark } from "@/components/common/Marks";
import { useDeferredValue, useMemo } from "react";
import { BlogFilters } from "./BlogFilters";
import { useUrlSearchParams, useUrlTextParam } from "@/hooks/useUrlSearchParams";
import { BlogPost } from "@/types/blog";

export interface BlogsProps {
  blogs: BlogPost[];
}

export function Blogs({ blogs }: BlogsProps) {
  // Search and tags live in the query string (`?q=…&tag=…`), so a filtered
  // list can be linked and survives Back.
  const [params, setParams] = useUrlSearchParams();
  const [searchQuery, setSearchQuery] = useUrlTextParam("q");
  const selectedTags = useMemo(() => params.getAll("tag"), [params]);
  // Typing stays responsive; the list re-filters when React is idle.
  const deferredQuery = useDeferredValue(searchQuery);

  const toggleTag = (tag: string) => {
    const nextTags = selectedTags.includes(tag)
      ? selectedTags.filter((selected) => selected !== tag)
      : [...selectedTags, tag];
    setParams({ tag: nextTags });
  };

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
    const query = deferredQuery.toLowerCase().trim();

    return blogs.filter(blog => {
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
  }, [blogs, deferredQuery, selectedTags]);

  return (
    <div className="pb-3xl md:pb-4xl">
      <BlogFilters
        allTags={allTags}
        searchQuery={searchQuery}
        selectedTags={selectedTags}
        onSearchChange={setSearchQuery}
        onTagToggle={toggleTag}
      />

      {/* An index, not a wall of cards: one ruled row per note, the date in the
        * machine's voice and the title in the writer's. */}
      <ol data-rows className="mt-2xl border-t border-rule">
        {filteredBlogs.map((blog) => (
          <li key={blog.slug} className="border-b border-rule">
            <Link
              href={`/blog/${blog.slug}`}
              className="rule-link group grid grid-cols-1 gap-x-lg gap-y-sm py-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:grid-cols-12 md:py-xl"
            >
              <p className="font-mono text-data text-mute md:col-span-2 md:pt-2">
                <time dateTime={blog.date}>{formatDate(blog.date)}</time>
              </p>
              <div className="md:col-span-7">
                <h2 className="font-display text-serif-md text-foreground">{blog.title}</h2>
                <p className="mt-sm max-w-[60ch] text-body text-muted-foreground">
                  {blog.description}
                </p>
              </div>
              <p className="flex items-center gap-2.5 text-label uppercase text-mute transition-colors duration-fast group-hover:text-foreground md:col-span-3 md:justify-end md:self-start md:pt-2.5">
                <span>
                  {blog.tags?.[0] ? `${blog.tags[0]} / ` : ""}
                  {blog.readingMinutes ?? 5} min
                </span>
                <ArrowMark />
              </p>
            </Link>
          </li>
        ))}
      </ol>

      {/* Announced politely so a screen-reader user hears the result of a
        * search or a tag toggle without the focus moving. */}
      <p className="sr-only" role="status" aria-live="polite">
        {filteredBlogs.length === 1 ? "1 post" : `${filteredBlogs.length} posts`}
      </p>

      {filteredBlogs.length === 0 && (
        <p className="mt-xl text-body text-muted-foreground">
          Nothing here matches that. Try a shorter search, or clear the tags.
        </p>
      )}
    </div>
  );
}
