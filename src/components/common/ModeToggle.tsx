"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button, type ButtonProps } from "@/components/ui/button"

type ModeToggleProps = Omit<ButtonProps, "asChild" | "children" | "onClick">

export function ModeToggle({
  variant = "outline",
  size = "icon",
  type,
  className,
  ...props
}: ModeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const nextTheme = resolvedTheme === "dark" ? "light" : "dark"
  const ariaLabel = props["aria-label"] ?? "Toggle theme"

  return (
    <Button
      variant={variant}
      size={size}
      type={type ?? "button"}
      // `size="icon"` is 40x40 in @vivancedata/ui, four pixels under the hit
      // target floor. The real fix is in that package, where it would reach six
      // apps at once; this repo does not own the design system and must not
      // fork it, so the floor is asserted here until the token moves upstream.
      // Trailing position so a caller's own className still wins.
      className={`h-11 w-11 ${className ?? ""}`}
      aria-label={ariaLabel}
      onClick={() => setTheme(nextTheme)}
      {...props}
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">{ariaLabel}</span>
    </Button>
  )
}
