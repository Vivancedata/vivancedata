/* eslint-disable @next/next/no-html-link-for-pages */

import { siteConfig } from "@/config/site"
import { Icons } from "@/components/common/Icons"
import { ModeToggle } from "@/components/common/ModeToggle"
import { ctaPrimary } from "@/components/common/controls"
import { Search } from "lucide-react"
import { mainNavItems } from "@/constants/navigation"
import { MainNavMobile } from "@/components/layout/MainNavMobile"

/**
 * The header, in the `nightshift` vocabulary.
 *
 * Nav links are Geist Mono, uppercase and widely tracked, because that is the
 * voice of every label on this site — a column head, a field name and a nav
 * item are the same kind of thing. The sliding underline that used to grow from
 * the left on hover is gone: it was a decorative effect on a element that is
 * already a link, and it competed with the page's one authored motion.
 *
 * The wordmark stays visible at every width. Hidden below `lg`, a phone header
 * carried a bare glyph and pushed the menu button onto a second row — 105px of
 * chrome before any content.
 */
export function MainNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-rule bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-md">
          <a
            href="/"
            aria-label={siteConfig.name}
            className="flex min-h-11 shrink-0 items-center gap-2.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            <Icons.logo className="h-7 w-7" />
            {/* Set in the display serif: the wordmark is the one place on this
              * site where the brand speaks in its own voice rather than in the
              * machine's. */}
            <span className="font-display text-[1.375rem] leading-none text-foreground">
              {siteConfig.name}
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            {mainNavItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="rounded-sm px-3 py-2 text-label uppercase text-mute transition-colors duration-fast hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {item.name}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-1 md:flex">
            <a
              href="/blog"
              aria-label="Search blog content"
              className="inline-flex h-11 w-11 items-center justify-center rounded-sm text-mute transition-colors duration-fast hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Search className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.5} />
            </a>
            <ModeToggle />
            <a href="/contact" className={`${ctaPrimary} ml-2`}>
              Book a call
            </a>
          </div>

          <MainNavMobile items={mainNavItems} />
        </div>
      </div>
    </header>
  )
}
