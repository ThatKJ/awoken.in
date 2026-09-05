export interface NavItem {
  label: string
  href: string
}

/**
 * Intentionally small — 4 items, no dynamic "More" overflow menu needed.
 * The three #-anchors resolve on the homepage; from any other page they
 * navigate home first, which is standard hash-link behavior, not a bug.
 */
export const navItems: NavItem[] = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Demo", href: "/#whatsapp-demo" },
  { label: "Pilot", href: "/#pilot" },
  { label: "FAQ", href: "/faq" },
]

/**
 * /assessment stays live but is deliberately not part of the acquisition
 * funnel — never link to it from nav, hero, footer, or CTAs.
 *
 * "Pilot" (nav item, above) = learn — anchors to the on-page teaser.
 * "Run a Pilot" (this CTA) = convert — goes straight to the real form.
 */
export const ctaButtons = {
  primary: {
    label: "Run a Pilot",
    href: "/pilot",
  },
}
