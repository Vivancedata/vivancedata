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
      { name: "Pre-built AI Solutions", href: "/services/solutions" },
      { name: "AI Training & Workshops", href: "/services/training" },
    ],
  },
  {
    name: "Industries",
    href: "/industries",
    hasDropdown: true,
    dropdownItems: [
      { name: "Financial Services", href: "/industries/financial-services" },
      { name: "Healthcare", href: "/industries/healthcare" },
      { name: "Retail & E-commerce", href: "/industries/retail" },
      { name: "Manufacturing", href: "/industries/manufacturing" },
      { name: "Energy & Utilities", href: "/industries/energy" },
      { name: "Public Sector", href: "/industries/public-sector" },
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
      { name: "Innovation Hub", href: "/innovation-hub" },
      { name: "Responsible AI", href: "/responsible-ai" },
      { name: "Whitepapers", href: "/resources/whitepapers" },
      { name: "Webinars", href: "/resources/webinars" },
      { name: "AI Glossary", href: "/resources/glossary" },
    ],
  },
  {
    name: "About",
    href: "/about",
    hasDropdown: true,
    dropdownItems: [
      { name: "Our Story", href: "/about" },
      { name: "Team", href: "/about/team" },
      { name: "Careers", href: "/about/careers" },
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
  { icon: "linkedin", href: "#", label: "LinkedIn" },
  { icon: "twitter", href: "#", label: "Twitter" },
  { icon: "facebook", href: "#", label: "Facebook" },
  { icon: "instagram", href: "#", label: "Instagram" },
  { icon: "github", href: "#", label: "GitHub" },
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
      { label: "Our Team", href: "/team" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Generative AI", href: "/services/generative-ai" },
      { label: "AI Consulting", href: "/services/consulting" },
      { label: "Custom Solutions", href: "/services/custom" },
      { label: "Training", href: "/services/training" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Financial Services", href: "/industries/financial-services" },
      { label: "Healthcare", href: "/industries/healthcare" },
      { label: "Retail & E-commerce", href: "/industries/retail" },
      { label: "Manufacturing", href: "/industries/manufacturing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Innovation Hub", href: "/innovation-hub" },
      { label: "Responsible AI", href: "/responsible-ai" },
      { label: "Whitepapers", href: "/resources" },
      { label: "FAQ", href: "/faq" },
    ],
  },
];
