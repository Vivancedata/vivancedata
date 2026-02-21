"use client";

import { Input } from "@/components/ui/input";
import { m } from "framer-motion";
import { Search, Tag as TagIcon, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface BlogFiltersProps {
  allTags: string[];
  onSearch: (query: string) => void;
  onTagsChange: (tags: string[]) => void;
}

/**
 * Custom hook for debouncing a value
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds
 * @returns The debounced value
 */
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function BlogFilters({ allTags, onSearch, onTagsChange }: BlogFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce search query with 300ms delay for better UX
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Trigger search callback when debounced value changes
  useEffect(() => {
    onSearch(debouncedSearchQuery);
  }, [debouncedSearchQuery, onSearch]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchQuery("");
    inputRef.current?.focus();
  }, []);

  const handleTagToggle = useCallback((tag: string) => {
    setSelectedTags(prev => {
      const newTags = prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag];
      return newTags;
    });
  }, []);

  useEffect(() => {
    onTagsChange(selectedTags);
  }, [selectedTags, onTagsChange]);

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
          type="text"
          placeholder={"Search by title, description, or tags\u2026"}
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-10 bg-secondary/50 border-0 focus-visible:ring-2 focus-visible:ring-primary/20"
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
        {allTags.map((tag) => {
          const isSelected = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              type="button"
              onClick={() => handleTagToggle(tag)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                isSelected
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80 text-muted-foreground"
              }`}
              aria-label={isSelected ? `Remove ${tag} filter` : `Filter by ${tag}`}
              aria-pressed={isSelected}
            >
              <TagIcon className="size-3" aria-hidden="true" />
              {tag}
              {isSelected && (
                <X className="size-3 hover:text-primary-foreground/80" aria-hidden="true" />
              )}
            </button>
          );
        })}
      </m.div>
    </div>
  );
}
