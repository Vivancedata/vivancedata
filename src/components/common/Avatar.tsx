import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface AvatarProps {
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const getColorFromName = (name: string): string => {
  // Generate a consistent color based on the name
  const colors = [
    "bg-blue-700",
    "bg-green-700",
    "bg-violet-700",
    "bg-pink-700",
    "bg-indigo-700",
    "bg-teal-700",
    "bg-orange-700",
    "bg-cyan-700",
  ];

  const hash = name.split("").reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);

  return colors[Math.abs(hash) % colors.length];
};

export function Avatar({ name, src, size = "md", className }: AvatarProps) {
  const initials = getInitials(name);
  const bgColor = getColorFromName(name);

  if (src) {
    return (
      <div
        className={cn(
          "relative inline-flex items-center justify-center rounded-full overflow-hidden",
          sizeClasses[size],
          className
        )}
      >
        <Image
          src={src}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 200px"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center rounded-full font-semibold text-white",
        bgColor,
        sizeClasses[size],
        className
      )}
    >
      {initials}
    </div>
  );
}
