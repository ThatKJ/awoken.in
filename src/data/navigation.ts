export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const navItems: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Integrations", href: "/integrations" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
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
