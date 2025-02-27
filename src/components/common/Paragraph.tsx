import React from "react";
import { cn } from "@/lib/utils";

interface ParagraphProps {
  children: React.ReactNode;
  className?: string;
}

export function Paragraph({ children, className }: ParagraphProps) {
  return (
    <p className={cn("text-base leading-7 text-muted-foreground", className)}>
      {children}
    </p>
  );
}
