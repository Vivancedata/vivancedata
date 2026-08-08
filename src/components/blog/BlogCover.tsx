import React from "react";
import type { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

interface BlogCoverProps {
  slug: string;
  className?: string;
}

// Every post historically shared this one stock image; a post pointing at it
// has no real cover art, so listings render a generated BlogCover instead.
// The frontmatter value is kept for OG metadata, where a raster is required.
// Typed as a predicate so the false branch narrows to a usable next/image src.
export function isDefaultBlogImage(
  image: string | StaticImageData | undefined
): image is undefined {
  return !image || image === "/images/ai-solutions.png";
}

// Deterministic PRNG so the cover is a pure function of the slug: the server
// and client render identical SVG (no hydration mismatch), and a post keeps
// its cover across builds.
function hashString(input: string): number {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const W = 400;
const H = 260;

function constellation(rand: () => number): React.ReactElement {
  const nodes = Array.from({ length: 11 }, () => ({
    x: 30 + rand() * (W - 60),
    y: 30 + rand() * (H - 60),
    r: 2.5 + rand() * 2.5,
  }));
  const accent = Math.floor(rand() * nodes.length);
  return (
    <>
      <g className="text-foreground/25" stroke="currentColor" strokeWidth="1">
        {nodes.slice(1).map((n, i) => (
          <line key={`e-${n.x}-${n.y}`} x1={nodes[i].x} y1={nodes[i].y} x2={n.x} y2={n.y} />
        ))}
      </g>
      <g className="text-foreground/50" fill="currentColor">
        {nodes.map(
          (n, i) =>
            i !== accent && <circle key={`n-${n.x}-${n.y}`} cx={n.x} cy={n.y} r={n.r} />
        )}
      </g>
      <g className="text-brand" fill="currentColor">
        <circle cx={nodes[accent].x} cy={nodes[accent].y} r={12} opacity={0.2} />
        <circle cx={nodes[accent].x} cy={nodes[accent].y} r={6} />
      </g>
    </>
  );
}

function contours(rand: () => number): React.ReactElement {
  const cx = 60 + rand() * (W - 120);
  const cy = 50 + rand() * (H - 100);
  const rings = Array.from({ length: 6 }, (_, i) => 24 + i * (20 + rand() * 10));
  const accentRing = Math.floor(rand() * rings.length);
  return (
    <>
      <g stroke="currentColor" fill="none" strokeWidth="1.25">
        {rings.map((r, i) => (
          <circle
            key={`r-${r}`}
            className={i === accentRing ? "text-brand" : "text-foreground/30"}
            cx={cx}
            cy={cy}
            r={r}
          />
        ))}
      </g>
      <circle className="text-brand" fill="currentColor" cx={cx} cy={cy} r={5} />
    </>
  );
}

function grid(rand: () => number): React.ReactElement {
  const cols = 9;
  const rows = 6;
  const stepX = W / (cols + 1);
  const stepY = H / (rows + 1);
  const accentCol = 1 + Math.floor(rand() * (cols - 2));
  const dots: React.ReactElement[] = [];
  for (let c = 1; c <= cols; c++) {
    for (let r = 1; r <= rows; r++) {
      const isAccent = c === accentCol;
      dots.push(
        <circle
          key={`d-${c}-${r}`}
          className={isAccent ? "text-brand" : "text-foreground/40"}
          fill="currentColor"
          cx={c * stepX}
          cy={r * stepY}
          r={isAccent ? 4 : 2}
        />
      );
    }
  }
  return (
    <>
      <line
        className="text-brand/40"
        stroke="currentColor"
        strokeWidth="1.5"
        x1={accentCol * stepX}
        y1={0}
        x2={accentCol * stepX}
        y2={H}
      />
      {dots}
    </>
  );
}

const variants = [constellation, contours, grid];

/**
 * Generative cover art for blog posts: a token-colored pattern (data
 * constellation, contour rings, or dot grid) derived deterministically from
 * the slug. Replaces the single stock AI image every post used to share —
 * each post gets a stable, unique cover that follows the design system in
 * both themes for free via currentColor.
 */
export function BlogCover({ slug, className }: BlogCoverProps): React.ReactElement {
  const seed = hashString(slug);
  const rand = mulberry32(seed);
  const Variant = variants[seed % variants.length];
  return (
    <div className={cn("h-full w-full bg-muted", className)} aria-hidden="true">
      <svg
        className="h-full w-full"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        role="presentation"
      >
        {Variant(rand)}
      </svg>
    </div>
  );
}
