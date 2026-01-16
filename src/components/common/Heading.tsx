import React from "react";
import { cn } from "@/lib/utils";

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  id?: string;
}

export function Heading({ children, className, as: Component = "h1", id }: HeadingProps) {
  return (
    <Component
      id={id}
      className={cn("text-3xl font-bold tracking-tight", className)}
    >
      {children}
    </Component>
  );
}
