import clsx from "clsx";

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
        "prose prose-base max-w-none",
        "prose-headings:text-foreground prose-headings:font-bold",
        "prose-p:text-foreground/90",
        "prose-strong:text-foreground",
        "prose-a:text-brand hover:prose-a:text-brand/80",
        "prose-ul:text-foreground/90",
        "prose-ol:text-foreground/90",
        "prose-li:text-foreground/90",
        "dark:prose-invert"
      )}
    >
      {children}
    </div>
  );
}
