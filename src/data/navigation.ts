export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const navItems: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "How We Work", href: "/how-we-work" },
  { label: "Solutions", href: "/solutions" },
  { label: "Integrations", href: "/integrations" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const ctaButtons = {
  primary: {
    label: "Book Strategy Call",
    href: "/book",
  },
  secondary: {
    label: "See Live Demo",
    href: "/demo",
  },
};

export const stickyCta = {
  primary: { label: "Book Strategy Call", href: "/book" },
  secondary: { label: "Free Workflow Audit", href: "/book" },
};
