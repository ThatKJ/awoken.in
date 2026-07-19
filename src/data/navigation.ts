export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const navItems: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "How It Works", href: "/how-we-work" },
  { label: "Pricing", href: "/pricing" },
  { label: "Industries", href: "/industries" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
];

export const ctaButtons = {
  primary: {
    label: "Book Free Audit",
    href: "/book",
  },
};

export const stickyCta = {
  primary: { label: "Book Free Audit", href: "/book" },
  secondary: { label: "Business Intelligence Audit", href: "/book" },
};
