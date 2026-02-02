"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { prefersReducedMotion } from "@/lib/performance"
import {
  Home,
  Briefcase,
  Users,
  Mail,
  BookOpen,
  Search,
  ArrowLeft,
  Sparkles
} from "lucide-react"

// Popular page links for navigation
const popularPages = [
  { name: "Services", href: "/services", icon: Briefcase, description: "AI solutions for your business" },
  { name: "About", href: "/about", icon: Users, description: "Learn about our team" },
  { name: "Contact", href: "/contact", icon: Mail, description: "Get in touch with us" },
  { name: "Blog", href: "/blog", icon: BookOpen, description: "Latest insights and articles" },
]

// Floating data particles for AI-themed decoration
function FloatingParticles({ reducedMotion }: { reducedMotion: boolean }) {
  if (reducedMotion) return null

  const particles = [
    { x: 10, y: 20, size: 4, delay: 0, duration: 4 },
    { x: 85, y: 15, size: 6, delay: 0.5, duration: 3.5 },
    { x: 20, y: 75, size: 5, delay: 1, duration: 4.5 },
    { x: 90, y: 80, size: 4, delay: 0.3, duration: 3.8 },
    { x: 5, y: 50, size: 3, delay: 0.7, duration: 4.2 },
    { x: 95, y: 45, size: 5, delay: 1.2, duration: 3.6 },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// Animated AI-themed 404 illustration
function Illustration({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="relative w-full max-w-lg mx-auto mb-8">
      <svg
        viewBox="0 0 400 280"
        className="w-full h-auto"
        aria-hidden="true"
        role="img"
      >
        {/* Background gradient circle */}
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className="[stop-color:hsl(var(--primary)/0.1)]" />
            <stop offset="100%" className="[stop-color:hsl(var(--muted)/0.3)]" />
          </linearGradient>
          <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" className="[stop-color:hsl(var(--primary))]" />
            <stop offset="100%" className="[stop-color:hsl(var(--primary)/0.7)]" />
          </linearGradient>
        </defs>

        {/* Outer glow circle */}
        <motion.circle
          cx="200"
          cy="130"
          r="110"
          fill="url(#bgGradient)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: reducedMotion ? 0 : 0.6, ease: "easeOut" }}
        />

        {/* Inner decorative circle */}
        <motion.circle
          cx="200"
          cy="130"
          r="85"
          className="fill-muted/40 dark:fill-muted/20"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: reducedMotion ? 0 : 0.5, delay: 0.1, ease: "easeOut" }}
        />

        {/* Neural network lines */}
        {!reducedMotion && (
          <g className="stroke-primary/20" strokeWidth="1">
            <motion.line
              x1="120" y1="80" x2="160" y2="110"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            <motion.line
              x1="240" y1="80" x2="280" y2="110"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
            <motion.line
              x1="130" y1="170" x2="170" y2="150"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
            <motion.line
              x1="230" y1="150" x2="270" y2="170"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            />
          </g>
        )}

        {/* Animated floating particles */}
        {!reducedMotion && (
          <>
            <motion.circle
              cx="90"
              cy="70"
              r="6"
              className="fill-primary/40"
              animate={{ y: [0, -12, 0], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.circle
              cx="310"
              cy="90"
              r="5"
              className="fill-primary/30"
              animate={{ y: [0, -8, 0], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
            <motion.circle
              cx="100"
              cy="190"
              r="4"
              className="fill-primary/25"
              animate={{ y: [0, -10, 0], opacity: [0.25, 0.5, 0.25] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
            <motion.circle
              cx="300"
              cy="200"
              r="6"
              className="fill-primary/35"
              animate={{ y: [0, -6, 0], opacity: [0.35, 0.65, 0.35] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            />
          </>
        )}

        {/* 404 Text with gradient */}
        <motion.text
          x="200"
          y="145"
          textAnchor="middle"
          fill="url(#textGradient)"
          className="font-bold"
          fontSize="80"
          fontWeight="800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.6, delay: 0.2 }}
        >
          404
        </motion.text>

        {/* Decorative underline */}
        <motion.rect
          x="140"
          y="160"
          width="120"
          height="4"
          rx="2"
          className="fill-primary/30"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: reducedMotion ? 0 : 0.8, delay: 0.4 }}
          style={{ transformOrigin: "center" }}
        />

        {/* AI Brain icon representation */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reducedMotion ? 0 : 0.5, delay: 0.6 }}
        >
          <circle
            cx="200"
            cy="220"
            r="22"
            className="fill-primary/10 stroke-primary/40"
            strokeWidth="2"
          />
          <motion.circle
            cx="200"
            cy="220"
            r="14"
            className="fill-none stroke-primary"
            strokeWidth="2"
            animate={reducedMotion ? {} : { scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Inner brain pattern */}
          <motion.path
            d="M192 216 Q200 212 208 216 M194 224 Q200 228 206 224"
            className="fill-none stroke-primary"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: reducedMotion ? 0 : 1, delay: 0.8 }}
          />
        </motion.g>

        {/* Question marks */}
        <motion.text
          x="270"
          y="100"
          className="fill-primary/15 dark:fill-primary/10"
          fontSize="32"
          fontWeight="600"
          initial={{ opacity: 0, rotate: -15 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.5, delay: 0.7 }}
        >
          ?
        </motion.text>
        <motion.text
          x="115"
          y="195"
          className="fill-primary/10 dark:fill-primary/8"
          fontSize="24"
          fontWeight="600"
          initial={{ opacity: 0, rotate: 10 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.5, delay: 0.9 }}
        >
          ?
        </motion.text>
      </svg>
    </div>
  )
}

export function NotFoundContent() {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    setReducedMotion(prefersReducedMotion())
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.1,
        delayChildren: reducedMotion ? 0 : 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reducedMotion ? 0 : 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <div className="relative min-h-[calc(100vh-200px)] flex items-center justify-center bg-background overflow-hidden">
      {/* Floating particles background */}
      <FloatingParticles reducedMotion={reducedMotion} />

      <div className="container relative mx-auto px-4 py-12 md:py-20">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Animated Illustration */}
          <motion.div variants={itemVariants}>
            <Illustration reducedMotion={reducedMotion} />
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4"
          >
            Oops! Lost in the Data
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed"
          >
            The page you are looking for seems to have wandered off into the digital void.
            Do not worry, our AI is still here to help you find your way.
          </motion.p>

          {/* Primary Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10"
          >
            <Button asChild size="lg" className="w-full sm:w-auto group">
              <Link href="/">
                <Home className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
                <span>Go Back Home</span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto group">
              <Link href="/contact">
                <Mail className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                <span>Contact Support</span>
              </Link>
            </Button>
          </motion.div>

          {/* Search Suggestion */}
          <motion.div
            variants={itemVariants}
            className="mb-10"
          >
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 dark:bg-muted/30 px-4 py-2.5 rounded-full border border-border/50">
              <Search className="h-4 w-4 text-primary/70" />
              <span>Try using the navigation menu to find what you need</span>
            </div>
          </motion.div>

          {/* Popular Pages */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-center gap-2 mb-5">
              <Sparkles className="h-5 w-5 text-primary" aria-hidden="true" />
              <h2 className="text-lg font-semibold text-foreground">
                Popular Pages
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {popularPages.map((page) => {
                const Icon = page.icon
                return (
                  <Link
                    key={page.href}
                    href={page.href}
                    className={cn(
                      "group flex flex-col items-center p-4 rounded-xl",
                      "bg-card border border-border",
                      "hover:bg-accent/50 hover:border-primary/30",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      "transition-all duration-200"
                    )}
                  >
                    <div className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-primary/10 mb-3 group-hover:bg-primary/20 group-hover:scale-105 transition-all duration-200">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" aria-hidden="true" />
                    </div>
                    <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {page.name}
                    </span>
                    <span className="text-xs text-muted-foreground mt-1 text-center line-clamp-2">
                      {page.description}
                    </span>
                  </Link>
                )
              })}
            </div>
          </motion.div>

          {/* Back Navigation */}
          <motion.div
            variants={itemVariants}
            className="mt-10"
          >
            <button
              onClick={() => {
                if (typeof window !== "undefined" && window.history.length > 1) {
                  window.history.back()
                }
              }}
              className={cn(
                "inline-flex items-center text-sm text-muted-foreground",
                "hover:text-foreground transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md px-2 py-1"
              )}
              type="button"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
              <span>Go back to previous page</span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
