export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const navItems: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "How It Works", href: "/how-we-work" },
  { label: "Assessment", href: "/assessment" },
  { label: "Pricing", href: "/pricing" },
  { label: "Industries", href: "/industries" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
];

export const ctaButtons = {
  primary: {
    label: "Start Free Assessment",
    shortLabel: "Free Assessment",
    href: "/assessment",
  },
};

export const stickyCta = {
  primary: { label: "Start Free Assessment", href: "/assessment" },
  secondary: { label: "Business Intelligence Audit", href: "/book" },
};
