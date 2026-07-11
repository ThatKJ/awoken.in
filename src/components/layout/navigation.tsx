"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { navItems, ctaButtons, stickyCta } from "@/data/navigation"
import Link from "next/link"

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showSticky, setShowSticky] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(y > 80)
      setShowSticky(y > 600 && y < docHeight - 600)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-background/70 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 lg:h-[160px] items-center justify-between">
            <Link href="/" className="flex items-center shrink-0">
              <img
                src="/logo.svg"
                alt="Awoken"
                className="h-10 w-auto lg:h-[150px]"
              />
            </Link>

            <nav className="hidden lg:flex items-center gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <Link href={ctaButtons.secondary.href}>
                <Button variant="ghost" size="md">
                  {ctaButtons.secondary.label}
                </Button>
              </Link>
              <Link href={ctaButtons.primary.href}>
                <Button variant="primary" size="md">
                  {ctaButtons.primary.label}
                </Button>
              </Link>
            </div>

            <button
              className="lg:hidden p-2 -mr-2"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <img src="/icon.svg" alt="Menu" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-background lg:hidden"
          >
            <div className="flex items-center justify-between px-4 h-20 border-b border-border">
              <Link href="/" className="flex items-center" onClick={() => setMobileOpen(false)}>
                <img
                  src="/logo.svg"
                  alt="Awoken"
className="h-10 w-auto"
              />
            </Link>
              <button
                className="p-2 -mr-2"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col px-4 pt-6 gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-lg py-3 hover:text-accent transition-colors border-b border-border/50"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-col gap-3 mt-6 pt-6">
                <Link href={ctaButtons.secondary.href} onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" className="w-full" size="lg">
                    {ctaButtons.secondary.label}
                  </Button>
                </Link>
                <Link href={ctaButtons.primary.href} onClick={() => setMobileOpen(false)}>
                  <Button variant="primary" className="w-full" size="lg">
                    {ctaButtons.primary.label}
                  </Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSticky && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            className="fixed right-8 bottom-48 z-40 hidden lg:flex flex-col gap-2"
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
