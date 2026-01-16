export interface DropdownItem {
  name: string;
  href: string;
}

export interface NavItem {
  name: string;
  href: string;
  hasDropdown: boolean;
  dropdownItems?: DropdownItem[];
  section?: string;
}

export const navItems: NavItem[] = [
  {
    name: "Services",
    href: "/services",
    hasDropdown: true,
    dropdownItems: [
      { name: "Generative AI Solutions", href: "/services/generative-ai" },
      { name: "AI Strategy Consulting", href: "/services/consulting" },
      { name: "AI Training & Workshops", href: "/services/training" },
      { name: "RAPID AI Framework", href: "/methodology" },
    ],
  },
  {
    name: "Industries",
    href: "/industries",
    hasDropdown: true,
    dropdownItems: [
      { name: "Financial Services", href: "/industries/financial-services" },
      { name: "All Industries", href: "/industries" },
    ],
  },
  {
    name: "Case Studies",
    href: "/case-studies",
    hasDropdown: false,
  },
  {
    name: "Resources",
    href: "/resources",
    hasDropdown: true,
    dropdownItems: [
      { name: "Blog", href: "/blog" },
      { name: "ROI Calculator", href: "/tools/roi-calculator" },
      { name: "AI Readiness Assessment", href: "/tools/ai-readiness" },
      { name: "AI Use Cases Explorer", href: "/tools/use-cases" },
      { name: "Innovation Hub", href: "/innovation-hub" },
      { name: "Responsible AI", href: "/responsible-ai" },
    ],
  },
  {
    name: "About",
    href: "/about",
    hasDropdown: true,
    dropdownItems: [
      { name: "Our Story", href: "/about" },
      { name: "Careers", href: "/career" },
      { name: "Contact", href: "/contact" },
    ],
  },
];

export const mainNavItems: NavItem[] = [
  {
    name: "Services",
    href: "/services",
    hasDropdown: false,
    section: "overview"
  },
  {
    name: "Industries",
    href: "/industries",
    hasDropdown: false,
    section: "industries"
  },
  {
    name: "Case Studies",
    href: "/case-studies",
    hasDropdown: false,
    section: "case-studies"
  },
  {
    name: "About",
    href: "/about",
    hasDropdown: false,
    section: "about"
  },
  {
    name: "Blog",
    href: "/blog",
    hasDropdown: false,
    section: "blog"
  }
];

export interface SocialLink {
  icon: string;
  href: string;
  label: string;
}

export const socialLinks: SocialLink[] = [
  { icon: "linkedin", href: "https://www.linkedin.com/in/lorenzo-scaturchio", label: "LinkedIn" },
  { icon: "github", href: "https://github.com/gr8monk3ys", label: "GitHub" },
];

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export const footerLinks: FooterSection[] = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/career" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Generative AI", href: "/services/generative-ai" },
      { label: "AI Consulting", href: "/services/consulting" },
      { label: "Training", href: "/services/training" },
      { label: "RAPID Framework", href: "/methodology" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Financial Services", href: "/industries/financial-services" },
      { label: "All Industries", href: "/industries" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "ROI Calculator", href: "/tools/roi-calculator" },
      { label: "AI Readiness Assessment", href: "/tools/ai-readiness" },
      { label: "Use Cases Explorer", href: "/tools/use-cases" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Innovation Hub", href: "/innovation-hub" },
      { label: "Responsible AI", href: "/responsible-ai" },
    ],
  },
];
