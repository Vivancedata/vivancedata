"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/formatDate";
import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { Paragraph } from "@/components/common/Paragraph";
import { Prose } from "@/components/blog/Prose";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { ArrowLeft, Share2, Calendar, Tag, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef, ReactNode } from "react";
import { BlogPost } from "@/types/blog";

type BlogMeta = Omit<BlogPost, 'slug' | 'content'>;

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
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Cleanup speech synthesis on unmount
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handlePlay = () => {
    if (!contentRef.current) return;

    if (!isPlaying) {
      // Create a new utterance each time to avoid mutation issues
      const newUtterance = new SpeechSynthesisUtterance();
      newUtterance.rate = 0.9;
      newUtterance.text = contentRef.current.textContent || "";
      newUtterance.onend = () => setIsPlaying(false);
      window.speechSynthesis.speak(newUtterance);
      setIsPlaying(true);
    } else {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  if (isRssFeed) {
    return children;
  }

  return (
    <>
      <ReadingProgress />
      <Container className="mt-16 lg:mt-32">
      <div className="xl:relative">
        <div className="mx-auto max-w-2xl">
          {previousPathname && (
            <motion.button
              type="button"
              onClick={() => router.back()}
              aria-label="Go back to blogs"
              className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
            </motion.button>
          )}
          <article>
            <header className="flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={meta.date} className="text-stone-600">
                      {formatDate(meta.date)}
                    </time>
                  </div>
                  {meta.tags && meta.tags.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      <div className="flex gap-2">
                        {meta.tags.map((tag) => (
                          <span key={tag} className="text-stone-600">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <Heading className="mt-6 text-4xl font-bold tracking-tight text-stone-800 sm:text-5xl">
                  {meta.title}
                </Heading>
                <Paragraph className="mt-4 text-sm leading-8 text-stone-600">
                  {meta.description}
                </Paragraph>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-8 aspect-video relative overflow-hidden rounded-2xl bg-stone-100"
              >
                <Image
                  src={meta.image}
                  alt={`Featured image for ${meta.title}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
                  className="object-cover"
                  priority
                />
              </motion.div>
            </header>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8"
            >
              <div className="flex justify-between items-center mb-8">
                <Button
                  onClick={handlePlay}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="h-4 w-4" /> Pause
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" /> Listen
                    </>
                  )}
                </Button>
                <Button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: meta.title,
                        text: meta.description,
                        url: window.location.href,
                      }).catch(error => {
                        console.error('Error sharing:', error);
                      });
                    } else {
                      // Fallback for browsers that don't support the Web Share API
                      navigator.clipboard.writeText(window.location.href)
                        .then(() => {
                          alert('Link copied to clipboard!');
                        })
                        .catch(error => {
                          console.error('Error copying to clipboard:', error);
                        });
                    }
                  }}
                  variant="outline"
                  className="flex items-center gap-2"
                  aria-label="Share this article"
                >
                  <Share2 className="h-4 w-4" /> Share
                </Button>
              </div>
              <Prose>
                <div ref={contentRef}>{children}</div>
              </Prose>
            </motion.div>
            {relatedPosts && relatedPosts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <RelatedPosts posts={relatedPosts} currentSlug={currentSlug} />
              </motion.div>
            )}
          </article>
        </div>
      </div>
    </Container>
    </>
  );
}
