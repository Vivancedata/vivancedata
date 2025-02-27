import React from "react";
import { cn } from "@/lib/utils";

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
}

export function Heading({ children, className }: HeadingProps) {
  return (
    <h1 className={cn("text-3xl font-bold tracking-tight", className)}>
      {children}
    </h1>
  );
}
