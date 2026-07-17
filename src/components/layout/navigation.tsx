"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
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
        <Container>
          <div className="grid grid-cols-[auto_1fr_auto] items-center min-h-16 md:min-h-20 lg:min-h-24 -ml-2 md:-ml-3 lg:-ml-6 -mr-2 md:-mr-3 lg:-mr-6">
            <Link
              href="/"
              className="flex items-center shrink-0 pr-6 md:pr-10 lg:pr-14"
              onClick={(e) => { if (window.location.pathname === "/") { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }) } }}
            >
              <img
                src="/logo.svg"
                alt="Awoken — Business Intelligence & Implementation Consultancy"
                className="w-auto h-16 sm:h-20 md:h-24 lg:h-28"
              />
            </Link>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex items-center justify-center w-11 h-11 justify-self-end"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Tablet + Desktop navigation (no More dropdown) */}
            <nav className="hidden md:flex items-center justify-center gap-10 min-w-0">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm xl:text-base font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap shrink-0"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right column */}
            <div className="hidden md:flex items-center justify-end shrink-0">
              <Link href={ctaButtons.primary.href}>
                <Button variant="primary" size="md">
                  {ctaButtons.primary.label}
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/40"
              onClick={close}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 z-50 w-full max-w-xs sm:max-w-sm bg-background flex flex-col"
            >
              <div className="flex items-center justify-between px-4 sm:px-6 h-16 sm:h-20 border-b border-border shrink-0">
                <Link href="/" className="flex items-center" onClick={(e) => { close(); if (window.location.pathname === "/") { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }) } }}>
                  <img src="/icon.svg" alt="Awoken" className="h-8 w-8" />
                </Link>
                <button
                  className="flex items-center justify-center w-11 h-11"
                  onClick={close}
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-4">
                <div className="flex flex-col">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-lg sm:text-xl py-4 font-medium text-foreground hover:text-accent transition-colors border-b border-border/50 min-h-[44px] flex items-center"
                      onClick={close}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </nav>
              <div className="px-4 sm:px-6 pb-6 sm:pb-8 pt-4 border-t border-border shrink-0">
                <Link href={ctaButtons.primary.href} onClick={close}>
                  <Button variant="primary" className="w-full" size="lg">
                    {ctaButtons.primary.label}
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
            className="fixed right-4 xl:right-8 bottom-24 z-30 hidden lg:flex flex-col gap-2"
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
