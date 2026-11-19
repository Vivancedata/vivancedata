import Link from "next/link";
import { formatDate } from "@/lib/formatDate";
import { ArrowMark } from "@/components/common/Marks";
import { BlogPost } from "@/types/blog";

interface RelatedPostsProps {
  posts: BlogPost[];
  currentSlug?: string;
}

export function RelatedPosts({ posts, currentSlug }: RelatedPostsProps) {
  const relatedPosts = posts.filter((post) => post.slug !== currentSlug).slice(0, 3);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="mt-3xl">
      <h2 className="font-display text-serif-md text-foreground">Keep reading</h2>

      <ol data-rows className="mt-lg border-t border-rule">
        {relatedPosts.map((post) => (
          <li key={post.slug} className="border-b border-rule">
            <Link
              href={`/blog/${post.slug}`}
              className="rule-link group flex flex-col gap-1 py-md focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:flex-row sm:items-baseline sm:justify-between sm:gap-lg"
            >
              <span className="font-display text-serif-sm text-foreground">{post.title}</span>
              <span className="flex shrink-0 items-center gap-2.5 font-mono text-data text-mute transition-colors duration-fast group-hover:text-foreground">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <ArrowMark />
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
