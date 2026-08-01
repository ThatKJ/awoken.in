"use client"

import Link from "next/link"
import { Section } from "@/components/shared/section"
import { Card } from "@/components/shared/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Home, Search, MessageSquare, Sparkles } from "lucide-react"

const quickLinks = [
  {
    href: "/services",
    title: "Services",
    description: "What we build and how we deliver it",
  },
  {
    href: "/blog",
    title: "Blog",
    description: "Insights on BI, AI and operations",
  },
  {
    href: "/case-studies",
    title: "Case Studies",
    description: "Real outcomes from real businesses",
  },
  {
    href: "/contact",
    title: "Contact",
    description: "Talk to the team directly",
  },
]

export default function NotFound() {
  return (
    <>
      <Section size="hero" className="text-center">
        <div className="mx-auto max-w-2xl">
          <p className="text-accent text-xl font-bold tracking-wide uppercase underline underline-offset-4 decoration-accent/30 mb-4 sm:mb-5">
            Error 404 — Page Not Found
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
            This page doesn&apos;t exist
          </h1>
          <p className="mt-5 sm:mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-[60ch] mx-auto">
            The URL you followed may have been moved, renamed, or removed. If you were expecting
            this page to be here, let us know — otherwise, head back to a page that works.
          </p>
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/">
                <Home className="size-4" />
                Back to Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/book">
                <Sparkles className="size-4" />
                Book a Free Audit
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      <Section size="small" className="pt-0">
        <div className="mb-8 sm:mb-10 text-center">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <Search className="size-4 text-accent" />
            Try one of these instead
          </p>
        </div>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map((link) => (
            <Link key={link.href} href={link.href} className="group block h-full">
              <Card className="h-full">
                <div className="flex-1">
                  <p className="text-base font-semibold group-hover:text-accent transition-colors flex items-center justify-between gap-2">
                    {link.title}
                    <ArrowRight className="size-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{link.description}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
        <div className="mt-10 sm:mt-12 text-center">
          <Button asChild variant="ghost" size="md">
            <Link href="/contact">
              <MessageSquare className="size-4" />
              Report a broken link
            </Link>
          </Button>
        </div>
      </Section>
    </>
  )
}
