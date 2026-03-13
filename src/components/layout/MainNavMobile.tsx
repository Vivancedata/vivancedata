"use client"

import Link from "next/link"
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
          className="animate-in fade-in-0 slide-in-from-top-2 py-4 duration-200 md:hidden"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col space-y-3">
            {items.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  prefetch={false}
                  className="block rounded-md px-4 py-2 text-foreground/80 transition-colors hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </div>
            ))}
            <div className="pt-2">
              <Button
                className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground hover:from-primary/90 hover:to-accent/90"
                asChild
              >
                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </nav>
      )}
    </>
  )
}
