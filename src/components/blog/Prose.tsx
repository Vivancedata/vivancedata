import clsx from "clsx";

/**
 * A post's body, in the three voices: section heads in the serif at its one
 * weight, paragraphs in the sans, and anything in a code fence (the tally
 * sheets) in the mono on a ruled, square panel.
 */
export function Prose({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        className,
        "prose prose-base max-w-none md:prose-lg",
        "prose-headings:font-display prose-headings:font-normal prose-headings:text-foreground",
        "prose-h2:mt-2xl prose-h2:text-serif-md",
        "prose-p:text-foreground/90 prose-li:text-foreground/90",
        "prose-strong:font-normal prose-strong:text-foreground",
        "prose-a:font-normal prose-a:text-foreground prose-a:decoration-mute prose-a:underline-offset-4 prose-a:hover:decoration-current",
        "prose-code:font-normal prose-code:before:content-none prose-code:after:content-none",
        "prose-pre:rounded-none prose-pre:border prose-pre:border-rule prose-pre:bg-card prose-pre:text-data prose-pre:text-foreground",
        "dark:prose-invert"
      )}
    >
      {children}
    </div>
  );
}
