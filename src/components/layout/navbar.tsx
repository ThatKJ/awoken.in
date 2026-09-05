"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { navItems, ctaButtons, type NavItem } from "@/data/navigation"
import { track } from "@/components/analytics/events"
import { MobileMenu } from "./mobile-menu"

function isActivePath(pathname: string, href: string): boolean {
  // Hash links (#product, #how-it-works, #pilot) are same-page section
  // anchors, not distinct routes — without scroll-spy there's no single
  // "active" section to claim, so they never render as active.
  if (href.includes("#")) return false
  return pathname === href || pathname.startsWith(`${href}/`)
}

/**
 * Light, compact nav. Four links always fit at ≥lg — no ResizeObserver
 * "More" overflow system needed (the old nav's dynamic overflow logic is
 * gone on purpose; re-add only if the IA genuinely grows past this).
 */
export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-200",
        scrolled
          ? "border-border bg-background/80 shadow-glass backdrop-blur-xl"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-4 px-4 sm:px-6 lg:h-20 lg:px-10 xl:px-14 2xl:px-16">
        <Link
          href="/"
          aria-label="Awoken — home"
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
          }}
          className="flex flex-none items-center"
        >
          <img src="/logo.svg" alt="Awoken" className="h-8 w-auto lg:h-9" width={140} height={36} />
        </Link>

        <nav aria-label="Primary" className="hidden flex-1 items-center justify-center gap-6 lg:flex xl:gap-8">
          {navItems.map((item) => (
            <NavLink key={item.href} item={item} active={isActivePath(pathname, item.href)} />
          ))}
        </nav>

        <div className="ml-auto hidden flex-none lg:flex">
          <Link href={ctaButtons.primary.href} className="group" onClick={() => track("pilot_cta_click")}>
            <Button variant="primary" size="md">
              {ctaButtons.primary.label}
              <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Button>
          </Link>
        </div>

        <div className="ml-auto lg:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative flex items-center whitespace-nowrap rounded-md px-2.5 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "after:absolute after:left-2.5 after:right-2.5 after:-bottom-0.5 after:h-[2px] after:origin-left after:scale-x-0 after:rounded-full after:bg-accent after:transition-transform after:duration-200 hover:after:scale-x-100",
        active ? "text-foreground after:scale-x-100" : "text-muted-foreground hover:text-foreground"
      )}
    >
      {item.label}
    </Link>
  )
}
