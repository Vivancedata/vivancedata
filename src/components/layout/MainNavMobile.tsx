"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/common/ModeToggle"

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
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          className="ml-2"
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {isMobileMenuOpen && (
        <nav
          id="mobile-navigation"
          className="animate-in fade-in-0 slide-in-from-top-2 absolute inset-x-0 top-full border-b border-border/60 bg-background px-4 py-4 shadow-elevation-2 duration-200 md:hidden"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col space-y-3">
            {items.map((item) => (
              <div key={item.name}>
                <a
                  href={item.href}
                  className="block rounded-md px-4 py-2 text-foreground/80 transition-colors hover:bg-muted hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              </div>
            ))}
            {/* The ink pill every other CTA uses. This was the only
              * solid-green 6px-radius button in the system. */}
            <div className="pt-2">
              <Button className="min-h-11 w-full" shape="pill" asChild>
                <a href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                  Contact Us
                </a>
              </Button>
            </div>
          </div>
        </nav>
      )}
    </>
  )
}
