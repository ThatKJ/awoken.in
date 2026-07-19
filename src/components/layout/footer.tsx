import Link from "next/link"
import { Container } from "@/components/shared/container"
import { Mail } from "lucide-react"

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/awoken-in/about/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/awoken.in/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  
]

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

const resourcesLinks = [
  { label: "Blog", href: "/blog" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "FAQ", href: "/faq" },
]

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Cookie Policy", href: "/cookie-policy" },
]

function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className ?? ""}`}>
      {socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className="flex items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:text-accent hover:bg-accent/5 transition-all duration-200"
        >
          {link.icon}
        </a>
      ))}
      <a
        href="mailto:contact@awoken.in"
        aria-label="Email"
        className="flex items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:text-accent hover:bg-accent/5 transition-all duration-200"
      >
        <Mail className="h-5 w-5" />
      </a>
    </div>
  )
}

function LinkColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-5">{title}</h4>
      <ul className="space-y-4">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="text-sm font-medium text-foreground hover:text-accent transition-colors duration-200">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border">
      <Container className="pt-4 md:pt-20 lg:pt-24 pb-4 md:pb-10 lg:pb-14">
        {/* ─── MOBILE ─── */}
        <div className="md:hidden flex flex-col">
          <Link href="/" className="inline-flex items-center">
            <img src="/logo.svg" alt="Awoken" className="w-[100px] h-auto" />
          </Link>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Awoken helps businesses identify operational bottlenecks, prioritize the highest-impact improvements, and implement AI systems that solve real business problems.
          </p>
          <SocialLinks className="mt-3" />
          <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-5">
            <LinkColumn title="Company" links={companyLinks} />
            <LinkColumn title="Resources" links={resourcesLinks} />
            <LinkColumn title="Legal" links={legalLinks} />
          </div>
          <hr className="mt-6 border-border" />
          <p className="mt-4 text-sm text-muted-foreground text-center">&copy; {new Date().getFullYear()} Awoken</p>
        </div>

        {/* ─── TABLET & DESKTOP ─── */}
        <div className="hidden md:block">
          <div className="flex flex-col lg:flex-row lg:justify-between gap-12 lg:gap-20">
            <div className="lg:max-w-sm xl:max-w-md">
              <Link href="/" className="inline-flex items-center">
                <img src="/logo.svg" alt="Awoken" className="w-auto max-w-[180px] lg:max-w-[200px] h-auto" />
              </Link>
              <p className="mt-6 max-w-sm text-sm text-muted-foreground leading-relaxed">
                Awoken helps businesses identify operational bottlenecks, prioritize the highest-impact improvements, and implement AI systems that solve real business problems.
              </p>
              <SocialLinks className="mt-6" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-12 xl:gap-16">
              <LinkColumn title="Company" links={companyLinks} />
              <LinkColumn title="Resources" links={resourcesLinks} />
              <LinkColumn title="Legal" links={legalLinks} />
            </div>
          </div>
          <hr className="mt-16 border-border" />
          <div className="mt-8 text-center sm:text-left">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Awoken. Business Intelligence &amp; AI Implementation Consultancy.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
