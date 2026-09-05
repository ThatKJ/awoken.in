"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { navItems, ctaButtons, type NavItem } from "@/data/navigation"
import { track } from "@/components/analytics/events"

function isActivePath(pathname: string, href: string): boolean {
  // Same rule as navbar.tsx: hash-anchor items never render as active.
  if (href.includes("#")) return false
  return pathname === href || pathname.startsWith(`${href}/`)
}

/**
 * Self-contained mobile nav: hamburger trigger + full-screen drawer.
 * Owns its own open state so <Navbar> doesn't need to coordinate it.
 */
export function MobileMenu() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const close = () => setOpen(false)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <>
      <button
        type="button"
        className="flex h-11 w-11 flex-none items-center justify-center rounded-lg text-foreground transition-colors duration-200 hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <Menu className="h-6 w-6" />
      </button>

      <AnimatePresence>
        {open && (
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
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-4 sm:px-5">
              <Link href="/" aria-label="Awoken home" onClick={close} className="flex items-center">
                <img src="/logo.svg" alt="Awoken" className="h-9 w-auto" />
              </Link>
              <button
                ref={closeButtonRef}
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
                    <NavRow key={item.href} item={item} active={active} index={i} onNavigate={close} />
                  )
                })}
              </div>
            </nav>

            <div className="shrink-0 border-t border-border p-4 sm:p-5">
              <Link
                href={ctaButtons.primary.href}
                onClick={() => {
                  track("pilot_cta_click")
                  close()
                }}
                className="group block"
              >
                <Button variant="primary" size="lg" className="w-full">
                  {ctaButtons.primary.label}
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function NavRow({
  item,
  active,
  index,
  onNavigate,
}: {
  item: NavItem
  active: boolean
  index: number
  onNavigate: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay: 0.035 * index }}
    >
      <Link
        href={item.href}
        onClick={onNavigate}
        aria-current={active ? "page" : undefined}
        className={
          "flex min-h-[52px] items-center justify-between border-b border-border/60 text-lg font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
          (active ? "text-accent" : "text-foreground hover:text-accent")
        }
      >
        {item.label}
        {active && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
      </Link>
    </motion.div>
  )
}
