import Link from "next/link"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/common/Icons"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/common/ModeToggle"
import { Search } from "lucide-react"
import { mainNavItems } from "@/constants/navigation"
import { MainNavMobile } from "@/components/layout/MainNavMobile"

export function MainNav() {
  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 shadow-sm transition-[background-color,box-shadow] duration-300",
      "supports-[backdrop-filter]:bg-background/80"
    )}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" aria-label={siteConfig.name} className="mr-6 flex items-center space-x-2">
              <div className="transition-transform duration-300 hover:rotate-6">
                <Icons.logo className="h-8 w-8" />
              </div>
              <span className="hidden font-bold text-2xl lg:inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                {siteConfig.name}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {mainNavItems.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  prefetch={false}
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-md transition-colors relative group",
                    "hover:text-primary"
                  )}
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-[width] duration-300 group-hover:w-full"></span>
                </Link>
              </div>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground/60 hover:text-primary transition-colors duration-300"
              aria-label="Search blog content"
              asChild
            >
              <Link href="/blog">
                <Search className="h-5 w-5" />
              </Link>
            </Button>
            <ModeToggle />
            <Button
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-md hover:shadow-lg transition-[background-color,box-shadow] duration-300"
              asChild
            >
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
        <MainNavMobile items={mainNavItems} />
      </div>
    </header>
  )
}
