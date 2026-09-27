"use client";

import { Input } from "@/components/ui/input";
import { m } from "framer-motion";
import { Search, Tag as TagIcon, X } from "lucide-react";
import { useRef, useState } from "react";

const MAX_VISIBLE_TAGS = 10;

interface BlogFiltersProps {
  allTags: string[];
  searchQuery: string;
  selectedTags: string[];
  onSearchChange: (query: string, options?: { immediate?: boolean }) => void;
  onTagToggle: (tag: string) => void;
}

/**
 * Controlled by `Blogs`, which keeps both values in the query string. This used
 * to hold its own copy of the query and the tags and push each one up through
 * an effect, so every change rendered twice and the two copies could drift.
 */
export function BlogFilters({
  allTags,
  searchQuery,
  selectedTags,
  onSearchChange,
  onTagToggle,
}: BlogFiltersProps) {
  const [showAllTags, setShowAllTags] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClearSearch = () => {
    onSearchChange("", { immediate: true });
    inputRef.current?.focus();
  };

  const visibleTags = showAllTags ? allTags : allTags.slice(0, MAX_VISIBLE_TAGS);

  return (
    <div className="space-y-4">
      {/* Search */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" aria-hidden="true" />
        <Input
          ref={inputRef}
          type="search"
          name="q"
          autoComplete="off"
          placeholder={"Search by title, description, or tags…"}
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          className="w-full pl-10 pr-10 bg-secondary/50 border-0 focus-visible:ring-2 focus-visible:ring-brand/20"
          aria-label="Search blogs by title, description, or tags"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="absolute right-1 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label="Clear search"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        )}
      </m.div>

      {/* Tags */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-2"
      >
        {visibleTags.map((tag) => {
          const isSelected = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              type="button"
              onClick={() => onTagToggle(tag)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                isSelected
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground"
              }`}
              aria-label={isSelected ? `Remove ${tag} filter` : `Filter by ${tag}`}
              aria-pressed={isSelected}
            >
              <TagIcon className="size-3" aria-hidden="true" />
              {tag}
              {isSelected && (
                <X className="size-3" aria-hidden="true" />
              )}
            </button>
          );
        })}
        {allTags.length > MAX_VISIBLE_TAGS && (
          <button
            type="button"
            onClick={() => setShowAllTags(prev => !prev)}
            className="inline-flex items-center rounded-pill border border-rule px-3 py-1 text-label uppercase text-mute transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label={showAllTags ? "Show fewer blog topics" : `Show all ${allTags.length} blog topics`}
          >
            {showAllTags ? "Show fewer topics" : `Show all ${allTags.length} topics`}
          </button>
        )}
      </m.div>
    </div>
  );
}
