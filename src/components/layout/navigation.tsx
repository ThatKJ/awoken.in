"use client"

import { useState, useEffect, useCallback } from "react"
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

  const close = useCallback(() => setMobileOpen(false), [])

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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex h-20 xl:h-[160px] items-center justify-between">
            {/* Tablet & below: wordmark on left */}
            <Link href="/" className="xl:hidden flex items-center">
              <img src="/logo.svg" alt="Awoken" className="h-8 sm:h-10 w-auto" />
            </Link>

            {/* Desktop: logo */}
            <Link href="/" className="hidden xl:flex items-center shrink-0">
              <img
                src="/logo.svg"
                alt="Awoken"
                className="h-10 w-auto xl:h-[150px]"
              />
            </Link>

            {/* Desktop: nav */}
            <nav className="hidden xl:flex items-center gap-4">
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

            {/* Tablet & up: CTA */}
            <div className="hidden sm:flex xl:hidden items-center">
              <Link href={ctaButtons.primary.href}>
                <Button variant="primary" size="md" className="whitespace-nowrap">
                  {ctaButtons.primary.label}
                </Button>
              </Link>
            </div>

            {/* Desktop: CTAs */}
            <div className="hidden xl:flex items-center gap-3">
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

            {/* Hamburger */}
            <button
              className="xl:hidden p-2 -mr-2"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/40 xl:hidden"
              onClick={close}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 z-50 w-full max-w-sm bg-background xl:hidden flex flex-col"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 h-20 border-b border-border shrink-0">
                <Link href="/" className="flex items-center" onClick={close}>
                  <img src="/icon.svg" alt="Awoken" className="h-8 w-8" />
                </Link>
                <button
                  className="p-2 -mr-2"
                  onClick={close}
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto px-6 pt-8 pb-4">
                <div className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-xl py-3 font-medium text-foreground hover:text-accent transition-colors border-b border-border/50"
                      onClick={close}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </nav>

              {/* Bottom CTAs */}
              <div className="px-6 pb-8 pt-4 border-t border-border shrink-0 flex flex-col gap-3">
                <Link href={ctaButtons.primary.href} onClick={close}>
                  <Button variant="primary" className="w-full" size="lg">
                    {ctaButtons.primary.label}
                  </Button>
                </Link>
                <Link href={ctaButtons.secondary.href} onClick={close}>
                  <Button variant="outline" className="w-full" size="lg">
                    {ctaButtons.secondary.label}
                  </Button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSticky && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            className="fixed right-8 bottom-48 z-30 hidden xl:flex flex-col gap-2"
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
