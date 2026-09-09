"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { ModeToggle } from "@/components/common/ModeToggle"
import { ctaPrimary } from "@/components/common/controls"

interface NavItem {
  name: string
  href: string
}

interface MainNavMobileProps {
  items: NavItem[]
}

export function MainNavMobile({ items }: MainNavMobileProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <div className="flex items-center md:hidden">
        <ModeToggle />
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          className="ml-1 inline-flex h-11 w-11 items-center justify-center rounded-sm text-mute transition-colors duration-fast hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" strokeWidth={1.5} />
          ) : (
            <Menu className="h-5 w-5" strokeWidth={1.5} />
          )}
        </button>
      </div>

      {isMobileMenuOpen && (
        <nav
          id="mobile-navigation"
          className="animate-in fade-in-0 slide-in-from-top-1 absolute inset-x-0 top-full border-b border-rule bg-background duration-200 md:hidden"
          aria-label="Mobile navigation"
        >
          {/* A ruled list, like every other list on this site -- the panel is
            * the sheet continuing under the header, not a floating card. */}
          <div className="container mx-auto px-4">
            <ul>
              {items.map((item) => (
                <li key={item.name} className="border-b border-rule">
                  <a
                    href={item.href}
                    className="flex min-h-12 items-center text-label uppercase text-mute transition-colors duration-fast hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="/contact"
              className={`${ctaPrimary} my-lg w-full`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Book a call
            </a>
          </div>
        </nav>
      )}
    </>
  )
}
