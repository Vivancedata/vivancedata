"use client";

import { Input } from "@/components/ui/input";
import { useId, useRef, useState } from "react";
import { wallLabel } from "@/components/common/controls";

const MAX_VISIBLE_TAGS = 10;

const pill =
  "inline-flex min-h-11 items-center rounded-pill border px-4 text-label uppercase transition-colors duration-fast focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
const pillRest = "border-rule text-mute hover:border-mute hover:text-foreground";
const pillSelected = "border-transparent bg-primary text-primary-foreground";

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
  const inputId = useId();

  const handleClearSearch = () => {
    onSearchChange("", { immediate: true });
    inputRef.current?.focus();
  };

  const visibleTags = showAllTags ? allTags : allTags.slice(0, MAX_VISIBLE_TAGS);

  return (
    <div className="grid gap-lg pt-2xl md:grid-cols-12 md:items-end">
      <div className="md:col-span-5">
        <label htmlFor={inputId} className={wallLabel}>
          Search the notes
        </label>
        <div className="relative mt-2">
          <Input
            id={inputId}
            ref={inputRef}
            type="search"
            name="q"
            autoComplete="off"
            placeholder="voicemail, delivery slip, monthly fee…"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            className="h-11 w-full rounded-sm bg-background pr-20"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={handleClearSearch}
              className={`${wallLabel} absolute inset-y-0 right-0 inline-flex min-w-11 items-center justify-center rounded-sm px-3 transition-colors duration-fast hover:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring`}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 md:col-span-7 md:justify-end">
        {visibleTags.map((tag) => {
          const isSelected = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              type="button"
              onClick={() => onTagToggle(tag)}
              className={`${pill} ${isSelected ? pillSelected : pillRest}`}
              aria-label={isSelected ? `Remove ${tag} filter` : `Filter by ${tag}`}
              aria-pressed={isSelected}
            >
              {tag}
            </button>
          );
        })}
        {allTags.length > MAX_VISIBLE_TAGS && (
          <button
            type="button"
            onClick={() => setShowAllTags((prev) => !prev)}
            className={`${pill} ${pillRest}`}
          >
            {showAllTags ? "Show fewer topics" : `Show all ${allTags.length} topics`}
          </button>
        )}
      </div>
    </div>
  );
}
