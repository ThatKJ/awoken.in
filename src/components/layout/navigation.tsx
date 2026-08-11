"use client"

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { navItems, ctaButtons, stickyCta, type NavItem } from "@/data/navigation"

const DESKTOP_QUERY = "(min-width: 1024px)"
const SLACK = 8

function useDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY)
    const sync = () => setIsDesktop(mql.matches)
    sync()
    mql.addEventListener("change", sync)
    return () => mql.removeEventListener("change", sync)
  }, [])
  return isDesktop
}

function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/"
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function Navigation() {
  const pathname = usePathname()
  const isDesktop = useDesktop()

  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [hiddenCount, setHiddenCount] = useState(0)
  const [showSticky, setShowSticky] = useState(false)

  const logoRef = useRef<HTMLAnchorElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLDivElement>(null)
  const moreBtnRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const moreItemRefs = useRef<(HTMLAnchorElement | null)[]>([])

  const visibleItems = navItems.slice(0, hiddenCount > 0 ? navItems.length - hiddenCount : navItems.length)
  const moreItems = hiddenCount > 0 ? navItems.slice(navItems.length - hiddenCount) : []

  const measure = useCallback(() => {
    if (!isDesktop) return
    const bar = measureRef.current
    const logoRect = logoRef.current?.getBoundingClientRect()
    const ctaRect = ctaRef.current?.getBoundingClientRect()
    if (!bar || !logoRect || !ctaRect) return

    const children = Array.from(bar.children) as HTMLElement[]
    if (children.length < 2) return

    const available = ctaRect.left - logoRect.right
    const widths = children.map((c) => c.getBoundingClientRect().width)
    const gap = children[1].getBoundingClientRect().left - children[0].getBoundingClientRect().right
    const moreWidth = widths[widths.length - 1]
    const linkWidths = widths.slice(0, -1)
    const n = linkWidths.length

    let count = 0
    let used = 0
    for (let i = 0; i < n; i++) {
      used += (i === 0 ? 0 : gap) + linkWidths[i]
      const needMore = i < n - 1
      if (used + (needMore ? gap + moreWidth : 0) <= available + SLACK) {
        count = i + 1
      } else {
        break
      }
    }

    const hidden = n - count
    setHiddenCount((prev) => (prev === hidden ? prev : hidden))
  }, [isDesktop])

  useLayoutEffect(() => {
    const run = () => requestAnimationFrame(measure)
    window.addEventListener("resize", run)
    const ro = new ResizeObserver(run)
    if (measureRef.current) ro.observe(measureRef.current)
    if (logoRef.current) ro.observe(logoRef.current)
    if (ctaRef.current) ro.observe(ctaRef.current)
    run()
    return () => {
      window.removeEventListener("resize", run)
      ro.disconnect()
    }
  }, [measure])

  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY)
    const onChange = () => {
      if (!mql.matches) {
        setHiddenCount(0)
      } else {
        setMobileOpen(false)
      }
      requestAnimationFrame(measure)
    }
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [measure])

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(y > 8)

      const frameworkEl = document.getElementById("framework-section")
      const pastFramework = !frameworkEl || y >= frameworkEl.offsetTop + frameworkEl.offsetHeight - 100
      setShowSticky(y > 600 && y < docHeight - 600 && pastFramework)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const close = useCallback(() => {
    setMobileOpen(false)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [mobileOpen, close])

  useEffect(() => {
    if (!moreOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMoreOpen(false)
        moreBtnRef.current?.focus()
      }
    }
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMoreOpen(false)
    }
    document.addEventListener("keydown", onKey)
    document.addEventListener("mousedown", onClick)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.removeEventListener("mousedown", onClick)
    }
  }, [moreOpen])

  useEffect(() => {
    if (moreOpen) moreItemRefs.current[0]?.focus()
  }, [moreOpen])

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-200",
          scrolled
            ? "border-border/60 bg-background/75 shadow-glass backdrop-blur-xl"
            : "border-transparent bg-transparent"
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center gap-4 px-4 lg:h-[128px] lg:gap-6 lg:px-5 xl:px-6 2xl:px-8 min-[1920px]:px-12">
          <Link
            ref={logoRef}
            href="/"
            aria-label="Awoken — Business Intelligence & Implementation Consultancy"
            onClick={(e) => { if (pathname === "/") { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }) } }}
            className="flex flex-none items-center"
          >
            <img
              src="/logo.svg"
              alt="Awoken"
              className="h-12 w-auto sm:h-14 lg:h-[108px]"
            />
          </Link>

          {/* Desktop navigation (≥1024px) */}
          <div className="hidden min-w-0 flex-1 items-center justify-center lg:flex">
            <nav
              aria-label="Primary"
              className="relative flex items-center gap-6 xl:gap-7"
            >
              {visibleItems.map((item) => (
                <NavLink
                  key={item.href}
                  item={item}
                  active={isActivePath(pathname, item.href)}
                />
              ))}

              {hiddenCount > 0 && (
                <>
                  <button
                    ref={moreBtnRef}
                    type="button"
                    data-nav-item
                    onClick={() => setMoreOpen((v) => !v)}
                    aria-expanded={moreOpen}
                    aria-haspopup="menu"
                    className="flex items-center gap-1 whitespace-nowrap rounded-md px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    More
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-200",
                        moreOpen && "rotate-180"
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {moreOpen && (
                      <motion.div
                        ref={menuRef}
                        role="menu"
                        aria-label="More links"
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute right-0 top-full z-50 mt-3 w-60 rounded-xl border border-border bg-popover p-2 shadow-premium"
                      >
                        {moreItems.map((item, i) => (
                          <Link
                            key={item.href}
                            ref={(el) => { moreItemRefs.current[i] = el }}
                            href={item.href}
                            role="menuitem"
                            aria-current={isActivePath(pathname, item.href) ? "page" : undefined}
                            onClick={() => setMoreOpen(false)}
                            className={cn(
                              "flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                              isActivePath(pathname, item.href)
                                ? "bg-surface text-foreground"
                                : "text-muted-foreground hover:bg-surface hover:text-foreground"
                            )}
                          >
                            {item.label}
                            {isActivePath(pathname, item.href) && (
                              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                            )}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </nav>
          </div>

          {/* CTA — always visible until mobile breakpoint */}
          <div ref={ctaRef} data-cta className="flex flex-none items-center justify-end">
            <Link href={ctaButtons.primary.href} className="group">
              <Button variant="primary" size="md" className="px-3.5 lg:px-4">
                <span className="hidden xl:inline">{ctaButtons.primary.label}</span>
                <span className="xl:hidden">{ctaButtons.primary.shortLabel}</span>
                <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Button>
            </Link>
          </div>

          {/* Mobile hamburger (<1024px) */}
          <button
            type="button"
            className="flex h-11 w-11 flex-none items-center justify-center rounded-lg text-foreground transition-colors duration-200 hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            aria-haspopup="dialog"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Hidden measuring row — same classes as the desktop nav; drives overflow → More */}
      <div aria-hidden className="absolute left-0 top-0 h-0 w-0 overflow-clip">
        <div
          ref={measureRef}
          className="pointer-events-none invisible flex w-max items-center gap-6 xl:gap-7"
        >
          {navItems.map((item) => (
            <NavLink key={item.href} item={item} active={false} />
          ))}
          <span
            data-more-clone
            className="flex items-center gap-1 whitespace-nowrap rounded-md px-2.5 py-2 text-sm font-medium"
          >
            More
            <ChevronDown className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>

      {/* Full-screen mobile drawer (<1024px) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] flex flex-col bg-background"
          >
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-border/60 px-4 sm:px-5">
              <Link
                href="/"
                aria-label="Awoken home"
                onClick={(e) => { close(); if (pathname === "/") { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }) } }}
                className="flex items-center"
              >
                <img src="/logo.svg" alt="Awoken" className="h-12 w-auto sm:h-14" />
              </Link>
              <button
                type="button"
                autoFocus
                className="flex h-11 w-11 items-center justify-center rounded-lg text-foreground transition-colors duration-200 hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onClick={close}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 pt-2 pb-6 sm:px-5">
              <div className="flex flex-col">
                {navItems.map((item, i) => {
                  const active = isActivePath(pathname, item.href)
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.22, delay: 0.035 * i }}
                    >
                      <Link
                        href={item.href}
                        onClick={close}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex min-h-[52px] items-center justify-between border-b border-border/50 text-lg font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          active ? "text-accent" : "text-foreground hover:text-accent"
                        )}
                      >
                        {item.label}
                        {active && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </nav>

            <div className="shrink-0 border-t border-border/60 p-4 sm:p-5">
              <Link href={ctaButtons.primary.href} onClick={close} className="group block">
                <Button variant="primary" size="lg" className="w-full">
                  {ctaButtons.primary.label}
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating sticky CTA (≥1024px, after scroll) */}
      <AnimatePresence>
        {showSticky && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.2 }}
            className="fixed right-4 xl:right-8 bottom-24 z-30 hidden flex-col gap-2 lg:flex"
          >
            <Link href={stickyCta.primary.href}>
              <Button variant="primary" size="sm">
                {stickyCta.primary.label}
              </Button>
            </Link>
            <Link href={stickyCta.secondary.href}>
              <Button variant="outline" size="sm" className="bg-background">
                {stickyCta.secondary.label}
              </Button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <Link
      href={item.href}
      data-nav-item
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative flex items-center whitespace-nowrap rounded-md px-2.5 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "after:absolute after:left-2.5 after:right-2.5 after:-bottom-0.5 after:h-[2px] after:origin-left after:rounded-full after:bg-accent after:transition-transform after:duration-200 after:scale-x-0 hover:after:scale-x-100",
        active
          ? "text-foreground after:scale-x-100"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {item.label}
    </Link>
  )
}
