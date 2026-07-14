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
      { label: "Book Free Audit", href: "/book" },
      { label: "How We Work", href: "/how-we-work" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
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
              <img src="/logo.svg" alt="Awoken — Business Intelligence & Implementation Consultancy" className="h-10 w-auto md:h-12 lg:h-14" />
            </Link>
            <p className="text-sm text-muted-foreground">
              Business Intelligence &amp; Implementation Consultancy. We help businesses identify operational bottlenecks, prioritize improvements, and implement AI systems that solve real problems.
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
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Awoken. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://www.linkedin.com/company/awoken-in/about/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              LinkedIn
            </a>
            <a href="mailto:contact@awoken.in" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              contact@awoken.in
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
