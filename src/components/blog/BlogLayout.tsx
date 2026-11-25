"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { formatDate } from "@/lib/formatDate";
import { ArrowMark } from "@/components/common/Marks";
import { ctaSecondary, wallLabel } from "@/components/common/controls";
import { Prose } from "@/components/blog/Prose";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { BlogPost } from "@/types/blog";

type BlogMeta = Omit<BlogPost, "slug" | "content">;

// Every post points its frontmatter image at the site banner, for link
// previews. That is not cover art, so the page only shows an image a post
// actually has.
const SHARE_BANNER = "/images/banner.png";

interface BlogLayoutProps {
  children: ReactNode;
  meta: BlogMeta;
  isRssFeed?: boolean;
  previousPathname?: string;
  relatedPosts?: BlogPost[];
  currentSlug?: string;
}

export function BlogLayout({
  children,
  meta,
  isRssFeed = false,
  previousPathname,
  relatedPosts,
  currentSlug,
}: BlogLayoutProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [shareNote, setShareNote] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => window.speechSynthesis?.cancel();
  }, []);

  const handlePlay = () => {
    if (!contentRef.current) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(contentRef.current.textContent || "");
    utterance.rate = 0.9;
    utterance.onend = () => setIsPlaying(false);
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: meta.title,
          text: meta.description,
          url: window.location.href,
        });
        return;
      }
      await navigator.clipboard.writeText(window.location.href);
      setShareNote("Link copied");
    } catch (error) {
      // Dismissing the share sheet rejects with AbortError; that is not a failure.
      if (error instanceof DOMException && error.name === "AbortError") return;
      setShareNote("Couldn't copy. The address bar has the link.");
    }
  };

  if (isRssFeed) {
    return children;
  }

  const cover = meta.image && meta.image !== SHARE_BANNER ? meta.image : null;

  return (
    <>
      <div className="reading-rule" aria-hidden="true" />
      <article className="mx-auto max-w-2xl py-3xl md:py-4xl">
        <header>
          {previousPathname && (
            // A link, not a router.back() button: it has a real destination,
            // so it opens in a new tab and works when the post was the
            // visitor's first page.
            <Link
              href={previousPathname}
              className={`${wallLabel} group mb-lg inline-flex min-h-11 items-center gap-2 transition-colors duration-fast hover:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background`}
            >
              <ArrowMark className="rotate-180" />
              <span>Notes from the work</span>
            </Link>
          )}

          <h1 className="font-display text-serif-lg text-foreground">{meta.title}</h1>
          <p className="arrive mt-lg text-body-lg text-muted-foreground">{meta.description}</p>

          <p
            className="arrive mt-lg font-mono text-data text-mute"
            style={{ "--i": 2 } as CSSProperties}
          >
            <time dateTime={meta.date}>{formatDate(meta.date)}</time>
            {meta.updated && (
              <>
                <span className="px-2 text-faint" aria-hidden="true">
                  /
                </span>
                Updated <time dateTime={meta.updated}>{formatDate(meta.updated)}</time>
              </>
            )}
            {meta.tags?.map((tag) => (
              <span key={tag}>
                <span className="px-2 text-faint" aria-hidden="true">
                  /
                </span>
                {tag}
              </span>
            ))}
          </p>

          <div
            className="arrive mt-xl flex flex-wrap items-center gap-2 border-t border-rule pt-lg"
            style={{ "--i": 3 } as CSSProperties}
          >
            <button type="button" onClick={handlePlay} aria-pressed={isPlaying} className={ctaSecondary}>
              {isPlaying ? "Stop" : "Listen"}
            </button>
            <button type="button" onClick={handleShare} className={ctaSecondary}>
              Share
            </button>
            <p className="pl-2 text-body-sm text-muted-foreground" role="status" aria-live="polite">
              {shareNote}
            </p>
          </div>

          {cover && (
            <div className="relative mt-xl aspect-video overflow-hidden border border-rule">
              <Image
                src={cover}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 672px"
                className="object-cover"
                priority
              />
            </div>
          )}
        </header>

        <Prose className="mt-2xl">
          <div ref={contentRef}>{children}</div>
        </Prose>

        {relatedPosts && relatedPosts.length > 0 && (
          <RelatedPosts posts={relatedPosts} currentSlug={currentSlug} />
        )}
      </article>
    </>
  );
}
