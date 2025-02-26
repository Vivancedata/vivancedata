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
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Whitepapers", href: "/resources" },
      { label: "FAQ", href: "/faq" },
    ],
  },
];
