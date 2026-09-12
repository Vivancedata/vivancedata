/* eslint-disable @next/next/no-html-link-for-pages */

import React from "react";
import { siteConfig } from "@/config/site";
import { Facebook, Twitter, Linkedin, Instagram, Github } from "lucide-react";
import { Icons } from "@/components/common/Icons";
import { footerLinks, socialLinks } from "@/constants/navigation";
import { DeferredNewsletter } from "@/components/layout/DeferredNewsletter";
import { wallLabel } from "@/components/common/controls";

/**
 * The footer, as the last ruled band on the sheet.
 *
 * The round social chips and the tinted panel are gone: a circular bordered
 * button around a 20px glyph is chrome this world does not own, and there is no
 * fill anywhere else on the page for that panel to belong to. What is left is
 * the same hairline grid the rest of the site is built from — column heads in
 * mono, links in the muted tier, one rule between the columns and the small
 * print.
 */

const socialIcons: Record<string, typeof Linkedin> = {
  linkedin: Linkedin,
  twitter: Twitter,
  facebook: Facebook,
  instagram: Instagram,
  github: Github,
};

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-rule">
      <div className="container mx-auto px-4 py-3xl md:py-4xl">
        <div className="grid grid-cols-2 gap-x-lg gap-y-2xl md:grid-cols-4 lg:grid-cols-12">
          <div className="col-span-2 lg:col-span-4 lg:pr-2xl">
            <a
              href="/"
              className="inline-flex min-h-11 items-center gap-2.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              {/* The SVG mark, not the PNG. `Logo.png` is dark ink on
                * transparent and disappeared completely on this sheet — the
                * footer shipped with a 28px hole where the logo should be. */}
              <Icons.logo className="h-7 w-7" />
              <span className="font-display text-[1.375rem] leading-none text-foreground">
                {siteConfig.name}
              </span>
            </a>
            <p className="mt-lg max-w-[38ch] text-body-sm text-muted-foreground">
              {siteConfig.description}
            </p>
            <a
              href="mailto:info@vivancedata.com"
              className="mt-lg inline-flex min-h-11 items-center font-mono text-data text-foreground underline decoration-rule underline-offset-4 transition-colors duration-fast hover:decoration-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              info@vivancedata.com
            </a>
          </div>

          {footerLinks.map((column) => (
            <nav key={column.title} className="lg:col-span-2" aria-labelledby={`footer-${column.title}`}>
              {/* A `p`, not an `h2`. These are wall labels: five of them at
                * h2 put "COMPANY" and "RESOURCES" at the same outline level as
                * "What an engagement costs". `aria-labelledby` names the nav
                * from a non-heading element perfectly well. */}
              <p id={`footer-${column.title}`} className={wallLabel}>
                {column.title}
              </p>
              <ul className="mt-md space-y-0.5">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.href}`}>
                    <a
                      href={link.href}
                      className="flex min-h-11 items-center text-body-sm text-muted-foreground transition-colors duration-fast hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-3xl">
          <DeferredNewsletter />
        </div>

        <div className="mt-3xl flex flex-col gap-lg border-t border-rule pt-xl md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-caption text-mute">
            © {currentYear} {siteConfig.name}
          </p>

          <div className="flex flex-wrap items-center gap-x-lg gap-y-md">
            <a
              href="/privacy-policy"
              className="inline-flex min-h-11 min-w-11 items-center justify-center text-label uppercase text-mute transition-colors duration-fast hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Privacy
            </a>
            <a
              href="/terms-of-service"
              className="inline-flex min-h-11 min-w-11 items-center justify-center text-label uppercase text-mute transition-colors duration-fast hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Terms
            </a>
            <ul className="flex items-center gap-1">
              {socialLinks.map((link) => {
                const Icon = socialIcons[link.icon] ?? Linkedin;
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={link.label}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-sm text-mute transition-colors duration-fast hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      <Icon className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.5} />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
