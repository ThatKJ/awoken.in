import Link from "next/link"
import { Container } from "@/components/shared/container"

const footerLinks = [
  {
    title: "Pages",
    links: [
      { label: "Services", href: "/services" },
      { label: "Industries", href: "/industries" },
      { label: "How We Work", href: "/how-we-work" },
      { label: "Solutions", href: "/solutions" },
      { label: "Integrations", href: "/integrations" },
      { label: "Resources", href: "/resources" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Book Strategy Call", href: "/book" },
      { label: "Engagement", href: "/engagement" },
      { label: "Demo", href: "/demo" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <Container className="py-16">
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center mb-4">
              <img src="/logo.svg" alt="Awoken" className="h-10 w-auto lg:h-[150px]" />
            </Link>
            <p className="text-sm text-muted-foreground">
              Revenue Systems for Modern Businesses. We design and implement AI systems that answer calls, qualify leads, automate follow-ups and eliminate repetitive work.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                  {group.title}
                </h4>
                <ul className="space-y-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-foreground hover:text-accent transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Awoken. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              GitHub
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              LinkedIn
            </a>
            <a href="mailto:team.awoken.in@gmail.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              team.awoken.in@gmail.com
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
