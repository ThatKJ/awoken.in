import Link from "next/link"
import { Container } from "@/components/shared/container"
import { Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border">
      <Container className="pt-4 md:pt-20 lg:pt-24 pb-4 md:pb-10 lg:pb-14">
        {/* ─── MOBILE LAYOUT (< 768px) ─── */}
        <div className="md:hidden flex flex-col">
          <Link href="/" className="inline-flex items-center">
            <img
              src="/logo.svg"
              alt="Awoken — Business Intelligence & Implementation Consultancy"
              className="w-[100px] h-auto"
            />
          </Link>

          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Awoken helps businesses identify operational bottlenecks,
            prioritize the highest-impact improvements,
            and implement AI systems that solve real business problems.
          </p>

          <div className="mt-3 flex items-center gap-4">
            <a
              href="https://www.instagram.com/awoken.in/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:text-accent hover:bg-accent/5 transition-all duration-200"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/awoken-in/about/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:text-accent hover:bg-accent/5 transition-all duration-200"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="mailto:contact@awoken.in"
              aria-label="Email"
              className="flex items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:text-accent hover:bg-accent/5 transition-all duration-200"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Solutions
              </h4>
              <ul className="space-y-2">
                <li><Link href="/services" className="text-sm font-medium text-foreground hover:text-accent transition-colors duration-200">Services</Link></li>
                <li><Link href="/industries" className="text-sm font-medium text-foreground hover:text-accent transition-colors duration-200">Industries</Link></li>
                <li><Link href="/solutions" className="text-sm font-medium text-foreground hover:text-accent transition-colors duration-200">Solutions</Link></li>
                <li><Link href="/integrations" className="text-sm font-medium text-foreground hover:text-accent transition-colors duration-200">Integrations</Link></li>
                <li><Link href="/resources" className="text-sm font-medium text-foreground hover:text-accent transition-colors duration-200">Resources</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Company
              </h4>
              <ul className="space-y-2">
                <li><Link href="/book" className="text-sm font-medium text-foreground hover:text-accent transition-colors duration-200">Book Free Audit</Link></li>
                <li><Link href="/how-we-work" className="text-sm font-medium text-foreground hover:text-accent transition-colors duration-200">How We Work</Link></li>
                <li><Link href="/about" className="text-sm font-medium text-foreground hover:text-accent transition-colors duration-200">About</Link></li>
                <li><Link href="/contact" className="text-sm font-medium text-foreground hover:text-accent transition-colors duration-200">Contact</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Legal
            </h4>
            <ul className="flex items-center gap-4 text-sm font-medium text-foreground">
              <li><Link href="/privacy" className="hover:text-accent transition-colors duration-200">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-accent transition-colors duration-200">Terms</Link></li>
            </ul>
          </div>

          <hr className="mt-6 border-border" />

          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Awoken
            </p>
            <p className="text-sm text-muted-foreground">
              Business Intelligence &amp; AI Implementation Consultancy.
            </p>
          </div>
        </div>

        {/* ─── TABLET & DESKTOP LAYOUT (768px+) ─── */}
        <div className="hidden md:block">
          <div className="flex flex-col lg:flex-row lg:justify-between gap-12 lg:gap-20">
            {/* Brand */}
            <div className="lg:max-w-sm xl:max-w-md">
              <Link href="/" className="inline-flex items-center">
                <img
                  src="/logo.svg"
                  alt="Awoken — Business Intelligence & Implementation Consultancy"
                  className="w-auto max-w-[180px] lg:max-w-[200px] h-auto"
                />
              </Link>
              <p className="mt-6 max-w-sm text-sm text-muted-foreground leading-relaxed">
                Awoken helps businesses identify operational bottlenecks,
                prioritize the highest-impact improvements,
                and implement AI systems that solve real business problems.
              </p>
              <div className="mt-6 flex items-center gap-4">
                <a
                  href="https://www.instagram.com/awoken.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:text-accent hover:bg-accent/5 transition-all duration-200"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/awoken-in/about/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:text-accent hover:bg-accent/5 transition-all duration-200"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="mailto:contact@awoken.in"
                  aria-label="Email"
                  className="flex items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:text-accent hover:bg-accent/5 transition-all duration-200"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Link groups */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 xl:gap-16">
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-5">
                  Solutions
                </h4>
                <ul className="space-y-4">
                  <li><Link href="/services" className="text-sm font-medium text-foreground hover:text-accent transition-colors duration-200">Services</Link></li>
                  <li><Link href="/industries" className="text-sm font-medium text-foreground hover:text-accent transition-colors duration-200">Industries</Link></li>
                  <li><Link href="/solutions" className="text-sm font-medium text-foreground hover:text-accent transition-colors duration-200">Solutions</Link></li>
                  <li><Link href="/integrations" className="text-sm font-medium text-foreground hover:text-accent transition-colors duration-200">Integrations</Link></li>
                  <li><Link href="/resources" className="text-sm font-medium text-foreground hover:text-accent transition-colors duration-200">Resources</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-5">
                  Company
                </h4>
                <ul className="space-y-4">
                  <li><Link href="/book" className="text-sm font-medium text-foreground hover:text-accent transition-colors duration-200">Book Free Audit</Link></li>
                  <li><Link href="/how-we-work" className="text-sm font-medium text-foreground hover:text-accent transition-colors duration-200">How We Work</Link></li>
                  <li><Link href="/about" className="text-sm font-medium text-foreground hover:text-accent transition-colors duration-200">About</Link></li>
                  <li><Link href="/contact" className="text-sm font-medium text-foreground hover:text-accent transition-colors duration-200">Contact</Link></li>
                </ul>
              </div>
              <div className="sm:col-span-2 lg:col-span-1">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-5">
                  Legal
                </h4>
                <ul className="space-y-4">
                  <li><Link href="/privacy" className="text-sm font-medium text-foreground hover:text-accent transition-colors duration-200">Privacy</Link></li>
                  <li><Link href="/terms" className="text-sm font-medium text-foreground hover:text-accent transition-colors duration-200">Terms</Link></li>
                </ul>
              </div>
            </div>
          </div>

          <hr className="mt-16 border-border" />

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-center sm:text-left">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Awoken.
              <br className="sm:hidden" />
              <span className="hidden sm:inline"> </span>
              Business Intelligence &amp; AI Implementation Consultancy.
            </p>
            <div className="flex items-center justify-center sm:justify-end gap-4 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-accent transition-colors duration-200">Privacy</Link>
              <span aria-hidden="true">&bull;</span>
              <Link href="/terms" className="hover:text-accent transition-colors duration-200">Terms</Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
