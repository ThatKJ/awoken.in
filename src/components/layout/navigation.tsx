"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { navItems, ctaButtons, stickyCta } from "@/data/navigation"
import Link from "next/link"

type Viewport = "mobile" | "tablet-portrait" | "tablet-landscape" | "desktop"

const portraitPrimary = ["Services", "Industries", "How We Work"]
const landscapePrimary = ["Services", "Industries", "How We Work", "Solutions"]

function isPortraitSecondary(item: typeof navItems[0]) {
  return !portraitPrimary.includes(item.label)
}

function isLandscapeSecondary(item: typeof navItems[0]) {
  return !landscapePrimary.includes(item.label)
}

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showSticky, setShowSticky] = useState(false)
  const [vp, setVp] = useState<Viewport>("desktop")
  const [moreOpen, setMoreOpen] = useState(false)
  const moreRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (w < 768) setVp("mobile")
      else if (w <= 1024) setVp("tablet-portrait")
      else if (w <= 1279) setVp("tablet-landscape")
      else setVp("desktop")
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  useEffect(() => {
    if (!moreOpen) return
    const handler = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [moreOpen])

  useEffect(() => {
    if (!moreOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMoreOpen(false)
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [moreOpen])

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

  const close = useCallback(() => {
    setMobileOpen(false)
    setMoreOpen(false)
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

  const navHeight =
    vp === "mobile" ? "h-16" :
    vp === "tablet-portrait" ? "h-[68px]" :
    vp === "tablet-landscape" ? "h-[72px]" :
    "h-20"

  const logoWidth =
    vp === "mobile" ? "w-[100px]" :
    vp === "tablet-portrait" ? "w-[110px]" :
    vp === "tablet-landscape" ? "w-[125px]" :
    "w-[135px] 2xl:w-[140px]"

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
          <div className={cn("flex items-center justify-between gap-3 min-w-0", navHeight)}>
            <Link href="/" className="flex items-center shrink-0" onClick={(e) => { if (window.location.pathname === "/") { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }) } }}>
              <img
                src="/logo.svg"
                alt="Awoken — Business Intelligence & Implementation Consultancy"
                className={cn(logoWidth, "h-auto")}
              />
            </Link>

            {/* ─── MOBILE (< 768px) ─── */}
            {vp === "mobile" && (
              <button
                className="flex items-center justify-center w-11 h-11 shrink-0"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            )}

            {/* ─── TABLET PORTRAIT (768–1024px) ─── */}
            {vp === "tablet-portrait" && (
              <>
                <div className="flex-1 flex items-center justify-center">
                  <nav className="flex items-center gap-1">
                    {navItems
                      .filter((item) => portraitPrimary.includes(item.label))
                      .map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap py-2 px-2 shrink-0"
                        >
                          {item.label}
                        </Link>
                      ))}
                    <div className="relative" ref={moreRef}>
                      <button
                        onClick={() => setMoreOpen(!moreOpen)}
                        className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap py-2 px-2 shrink-0"
                        aria-haspopup="true"
                        aria-expanded={moreOpen}
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
                            initial={{ opacity: 0, y: 6, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 6, scale: 0.97 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                            className="absolute top-full right-0 mt-2 w-44 rounded-xl border border-border bg-background shadow-xl py-2 z-50"
                          >
                            {navItems.filter(isPortraitSecondary).map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-surface transition-colors"
                                onClick={() => setMoreOpen(false)}
                              >
                                {item.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </nav>
                </div>
                <Link href={ctaButtons.primary.href} className="shrink-0">
                  <Button variant="primary" className="h-10 px-5 text-sm whitespace-nowrap">
                    {ctaButtons.primary.label}
                  </Button>
                </Link>
              </>
            )}

            {/* ─── TABLET LANDSCAPE (1025–1279px) ─── */}
            {vp === "tablet-landscape" && (
              <>
                <div className="flex-1 flex items-center justify-center">
                  <nav className="flex items-center gap-1">
                    {navItems
                      .filter((item) => landscapePrimary.includes(item.label))
                      .map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap py-2 px-2 shrink-0"
                        >
                          {item.label}
                        </Link>
                      ))}
                    <div className="relative" ref={moreRef}>
                      <button
                        onClick={() => setMoreOpen(!moreOpen)}
                        className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap py-2 px-2 shrink-0"
                        aria-haspopup="true"
                        aria-expanded={moreOpen}
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
                            initial={{ opacity: 0, y: 6, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 6, scale: 0.97 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                            className="absolute top-full right-0 mt-2 w-44 rounded-xl border border-border bg-background shadow-xl py-2 z-50"
                          >
                            {navItems.filter(isLandscapeSecondary).map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-surface transition-colors"
                                onClick={() => setMoreOpen(false)}
                              >
                                {item.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </nav>
                </div>
                <Link href={ctaButtons.primary.href} className="shrink-0">
                  <Button variant="primary" className="h-10 px-5 text-sm whitespace-nowrap">
                    {ctaButtons.primary.label}
                  </Button>
                </Link>
              </>
            )}

            {/* ─── DESKTOP (1280px+) ─── */}
            {vp === "desktop" && (
              <>
                <nav className="flex items-center min-w-0 flex-1 justify-center gap-2 xl:gap-4 2xl:gap-6 mx-2 xl:mx-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-sm xl:text-base font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap py-2 shrink-0"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <div className="flex items-center gap-2 xl:gap-3 shrink-0">
                  <Link href={ctaButtons.secondary.href}>
                    <Button variant="ghost" size="sm" className="hidden xl:inline-flex">
                      {ctaButtons.secondary.label}
                    </Button>
                  </Link>
                  <Link href={ctaButtons.primary.href}>
                    <Button variant="primary" size="md" className="whitespace-nowrap">
                      {ctaButtons.primary.label}
                    </Button>
                  </Link>
                </div>
              </>
            )}
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
              <div className="px-4 sm:px-6 pb-6 sm:pb-8 pt-4 border-t border-border shrink-0 flex flex-col gap-3">
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
