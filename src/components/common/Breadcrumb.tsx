"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { Fragment } from "react";

interface BreadcrumbProps {
  className?: string;
}

export function Breadcrumb({ className }: BreadcrumbProps) {
  const pathname = usePathname();

  // Don't show breadcrumb on homepage
  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);

  // Format segment names (capitalize, replace hyphens)
  const formatSegment = (segment: string) => {
    return segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Build breadcrumb path
  const breadcrumbs = [
    { name: "Home", href: "/" },
    ...segments.map((segment, index) => {
      const href = `/${segments.slice(0, index + 1).join("/")}`;
      return {
        name: formatSegment(segment),
        href,
      };
    }),
  ];

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center space-x-2 text-sm text-muted-foreground ${className || ""}`}
    >
      <ol className="flex items-center space-x-2" itemScope itemType="https://schema.org/BreadcrumbList">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <Fragment key={crumb.href}>
              <li
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
                className="flex items-center"
              >
                {index === 0 ? (
                  <Link
                    href={crumb.href}
                    itemProp="item"
                    className="flex items-center hover:text-foreground transition-colors"
                  >
                    <Home className="h-4 w-4" />
                    <meta itemProp="name" content={crumb.name} />
                  </Link>
                ) : isLast ? (
                  <span itemProp="item" className="font-medium text-foreground">
                    <span itemProp="name">{crumb.name}</span>
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    itemProp="item"
                    className="hover:text-foreground transition-colors"
                  >
                    <span itemProp="name">{crumb.name}</span>
                  </Link>
                )}
                <meta itemProp="position" content={String(index + 1)} />
              </li>

              {!isLast && <ChevronRight className="h-4 w-4 text-muted-foreground/50" />}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
