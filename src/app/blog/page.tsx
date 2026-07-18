"use client"

import { useState, useMemo, useRef } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Section } from "@/components/shared/section"
import { Card, CardBody } from "@/components/shared/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Search,
  SearchX,
  Calendar,
  Clock,
  User,
  BookOpen,
  ArrowUpRight,
  FileText,
  CheckSquare,
  ClipboardList,
  Layout,
  BarChart3,
  TrendingUp,
  Settings,
  Users,
  Zap,
  Heart,
  Rocket,
  RefreshCw,
  Bot,
} from "lucide-react"
import { blogPosts, BLOG_CATEGORIES, BLOG_TOPICS, getFeaturedPost, getPopularPosts } from "@/data/blog"
import type { BlogPost } from "@/data/blog"

const topicIcons: Record<string, React.ElementType> = {
  Bot,
  BarChart3,
  TrendingUp,
  Settings,
  Users,
  Zap,
  Heart,
  Rocket,
  RefreshCw,
}

const categoryColors: Record<string, string> = {
  AI: "bg-purple-100 text-purple-800",
  "Business Intelligence": "bg-blue-100 text-blue-800",
  Automation: "bg-green-100 text-green-800",
  Operations: "bg-amber-100 text-amber-800",
  Growth: "bg-emerald-100 text-emerald-800",
  "Case Studies": "bg-accent/10 text-accent",
  Product: "bg-indigo-100 text-indigo-800",
  "Company Updates": "bg-gray-100 text-gray-800",
}

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}

function ArticleCard({ post, index = 0 }: { post: BlogPost; index?: number }) {
  const gradientColors: Record<string, string> = {
    AI: "from-purple-600 via-purple-500 to-pink-500",
    "Business Intelligence": "from-blue-600 via-blue-500 to-cyan-500",
    Automation: "from-green-600 via-green-500 to-emerald-500",
    Operations: "from-amber-600 via-amber-500 to-orange-500",
    Growth: "from-emerald-600 via-emerald-500 to-teal-500",
    "Case Studies": "from-accent via-orange-500 to-amber-500",
    Product: "from-indigo-600 via-indigo-500 to-violet-500",
    "Company Updates": "from-gray-600 via-gray-500 to-slate-500",
  }

  const gradient = gradientColors[post.category] || gradientColors["Business Intelligence"]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Link href={`/blog/${post.slug}`} className="group block h-full">
        <Card hover className="h-full">
          <div className={`relative h-48 sm:h-52 rounded-t-xl -m-6 mb-0 p-6 bg-gradient-to-br ${gradient} overflow-hidden`}>
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative z-10 flex items-start justify-between h-full">
              <Badge variant="secondary" className="text-xs font-medium">
                {post.category}
              </Badge>
              <span className="text-xs font-medium text-white/80 flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
                <Clock className="h-3 w-3" />
                {post.readingTime}
              </span>
            </div>
          </div>
          <CardBody>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {post.publishedAt}
                </span>
                <span className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5" />
                  {post.author.name}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold leading-snug group-hover:text-accent transition-colors duration-200">
                {post.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                {post.description}
              </p>
            </div>
          </CardBody>
          <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">{post.readingTime}</span>
            <span className="text-xs font-medium text-accent flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
              Read Article
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </Card>
      </Link>
    </motion.div>
  )
}

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const searchRef = useRef<HTMLInputElement>(null)

  const featured = useMemo(() => getFeaturedPost(), [])
  const popular = useMemo(() => getPopularPosts(), [])

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory = activeCategory === "All" || post.category === activeCategory
      const query = searchQuery.toLowerCase()
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.tags.some((t) => t.toLowerCase().includes(query))
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  const otherPosts = useMemo(
    () => filteredPosts.filter((p) => p.slug !== featured?.slug),
    [filteredPosts, featured]
  )

  return (
    <>
      {/* ─── HERO ─── */}
      <Section size="hero" className="bg-background">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-4 sm:mb-6"
          >
            Blog
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight"
          >
            Insights for Businesses
            <br />
            <span className="text-accent">Building with AI</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl"
          >
            Practical guides, case studies, AI trends, business intelligence, and operational strategies to help modern businesses grow smarter.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <a href="#articles">
              <Button variant="primary" size="xl" className="w-full sm:w-auto">
                Explore Articles
                <ArrowRight className="ml-2 h-4 w-4 shrink-0" />
              </Button>
            </a>
            <Link href="/book">
              <Button variant="outline" size="xl" className="w-full sm:w-auto">
                Subscribe
              </Button>
            </Link>
          </motion.div>
        </div>
      </Section>

      {/* ─── FEATURED ARTICLE ─── */}
      {featured && (
        <Section className="bg-background-alt pt-0">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection>
              <Link href={`/blog/${featured.slug}`} className="group block">
                <div className="rounded-2xl border border-border bg-background overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="h-56 sm:h-72 lg:h-80 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="relative z-10 p-6 sm:p-8 lg:p-10 flex flex-col justify-between h-full">
                      <div className="flex items-start justify-between">
                        <Badge variant="accent">{featured.category}</Badge>
                        <span className="text-xs font-medium text-white/80 flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
                          <Clock className="h-3 w-3" />
                          {featured.readingTime}
                        </span>
                      </div>
                      <div className="max-w-2xl">
                        <p className="text-xs sm:text-sm font-medium text-white/60 uppercase tracking-wider mb-2">
                          Featured Article
                        </p>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-3">
                          {featured.title}
                        </h2>
                        <p className="text-sm sm:text-base text-white/70 leading-relaxed line-clamp-2 max-w-xl">
                          {featured.description}
                        </p>
                        <div className="flex items-center gap-4 mt-4 text-xs text-white/50">
                          <span className="flex items-center gap-1.5">
                            <User className="h-3.5 w-3.5" />
                            {featured.author.name}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" />
                            {featured.publishedAt}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 sm:p-8 flex items-center justify-between">
                    <span className="text-sm font-medium text-accent flex items-center gap-2 group-hover:gap-3 transition-all duration-200">
                      Read Article
                      <ArrowRight className="h-4 w-4" />
                    </span>
                    <span className="text-xs text-muted-foreground">{featured.readingTime}</span>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          </div>
        </Section>
      )}

      {/* ─── SEARCH + CATEGORIES + ARTICLES ─── */}
      <div id="articles">
        <Section className="bg-background">
        <div className="max-w-6xl mx-auto">
          {/* Search */}
          <AnimatedSection>
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pl-12 pr-10 rounded-xl border border-border bg-background-alt text-base text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("")
                    searchRef.current?.focus()
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Clear search"
                >
                  <SearchX className="h-4 w-4" />
                </button>
              )}
            </div>
          </AnimatedSection>

          {/* Categories */}
          <AnimatedSection delay={0.05}>
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-10">
              {BLOG_CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-accent text-accent-foreground shadow-lg shadow-accent/25"
                        : "bg-background-alt text-muted-foreground border border-border hover:border-accent/30 hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>
          </AnimatedSection>

          {/* Results count */}
          <AnimatedSection delay={0.1}>
            <p className="text-sm text-muted-foreground mb-6">
              {searchQuery || activeCategory !== "All"
                ? `${filteredPosts.length} result${filteredPosts.length !== 1 ? "s" : ""}`
                : `${blogPosts.length} articles`}
            </p>
          </AnimatedSection>

          {/* No results */}
          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 sm:py-20"
            >
              <SearchX className="h-10 w-10 text-muted-foreground/40 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No articles found</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                Try a different search term or browse a different category.
              </p>
            </motion.div>
          )}

          {/* Article Grid */}
          {filteredPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredPosts.map((post, i) => (
                <ArticleCard key={post.slug} post={post} index={i} />
              ))}
            </div>
          )}
        </div>
      </Section>

      {/* ─── POPULAR READS ─── */}
      {popular.length > 0 && (
        <Section className="bg-background-alt">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-10 sm:mb-12">
                <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-3">
                  Popular
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                  Popular Reads
                </h2>
                <div className="h-[3px] rounded-full bg-accent mx-auto mt-4 w-[100px] shadow-[0_0_8px_rgba(249,115,22,0.3)]" />
              </div>
            </AnimatedSection>
            <div className="space-y-4 sm:space-y-6">
              {popular.map((post, i) => {
                const gradient = "from-blue-600 via-blue-500 to-cyan-500"
                return (
                  <AnimatedSection key={post.slug} delay={i * 0.1}>
                    <Link href={`/blog/${post.slug}`} className="group block">
                      <div className="rounded-xl border border-border bg-background p-5 sm:p-6 flex flex-col sm:flex-row gap-5 sm:gap-6 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                        <div className={`shrink-0 w-full sm:w-48 h-32 rounded-lg bg-gradient-to-br ${gradient} relative overflow-hidden`}>
                          <div className="absolute inset-0 bg-black/10" />
                          <div className="relative z-10 p-4 flex items-start">
                            <Badge variant="secondary" className="text-xs">
                              {post.category}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-accent transition-colors duration-200">
                            {post.title}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-3">
                            {post.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="h-3.5 w-3.5" />
                              {post.publishedAt}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Clock className="h-3.5 w-3.5" />
                              {post.readingTime}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </AnimatedSection>
                )
              })}
            </div>
          </div>
        </Section>
      )}

      {/* ─── BUSINESS INTELLIGENCE RESOURCES ─── */}
      <Section className="bg-background">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <div className="rounded-2xl border border-border bg-background-alt p-8 sm:p-10 lg:p-12">
              <div className="text-center mb-8 sm:mb-10">
                <Badge variant="accent" className="mb-3 sm:mb-4">
                  Resources
                </Badge>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4">
                  Business Intelligence Resources
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
                  Practical tools to help you identify opportunities and make better decisions — coming soon.
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                {[
                  { icon: FileText, title: "Guides" },
                  { icon: ClipboardList, title: "Templates" },
                  { icon: CheckSquare, title: "Checklists" },
                  { icon: Layout, title: "Frameworks" },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-border bg-background p-5 sm:p-6 text-center transition-all duration-200 hover:border-accent/20 hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-3">
                      <item.icon className="h-5 w-5 text-accent" />
                    </div>
                    <h3 className="text-sm sm:text-base font-semibold">{item.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">Coming soon</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </Section>
      </div>

      {/* ─── NEWSLETTER ─── */}
      <Section className="bg-background-alt">
        <div className="max-w-2xl mx-auto">
          <AnimatedSection>
            <div className="text-center">
              <Badge variant="accent" className="mb-3 sm:mb-4">
                Newsletter
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                Stay Ahead of AI.
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed mb-8">
                Receive practical AI insights, business strategies, and operational frameworks directly in your inbox.
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="flex-1 h-12 px-4 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200"
                />
                <Button variant="primary" size="md" type="submit" className="shrink-0">
                  Subscribe
                </Button>
              </form>
              <p className="text-xs text-muted-foreground mt-4">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </Section>

      {/* ─── TOPICS WE WRITE ABOUT ─── */}
      <Section className="bg-background">
        <AnimatedSection>
          <div className="text-center mb-10 sm:mb-12">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-3">
              Topics
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Topics We Write About
            </h2>
            <div className="h-[3px] rounded-full bg-accent mx-auto mt-4 w-[100px] shadow-[0_0_8px_rgba(249,115,22,0.3)]" />
          </div>
        </AnimatedSection>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 max-w-5xl mx-auto">
          {BLOG_TOPICS.map((topic, i) => {
            const Icon = topicIcons[topic.icon] || BookOpen
            return (
              <AnimatedSection key={topic.label} delay={i * 0.04}>
                <div className="rounded-xl border border-border bg-background-alt p-4 sm:p-5 flex flex-col items-center text-center gap-2 sm:gap-3 transition-all duration-200 hover:border-accent/20 hover:-translate-y-1 hover:shadow-md">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <span className="text-sm sm:text-base font-medium">{topic.label}</span>
                </div>
              </AnimatedSection>
            )
          })}
        </div>
      </Section>

      {/* ─── FINAL CTA ─── */}
      <Section className="bg-background-alt">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center">
            <div className="rounded-2xl border border-border bg-background p-8 sm:p-10 lg:p-14">
              <Badge variant="accent" className="mb-4 sm:mb-5">
                Get Started
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4 sm:mb-5 leading-tight">
                Ready to Apply These Ideas?
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto mb-8 sm:mb-10">
                Reading is only the first step. Let us identify where AI can create the biggest impact in your business.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <Link href="/book">
                  <Button variant="primary" size="xl" className="w-full sm:w-auto">
                    Book Free Business Intelligence Audit
                    <ArrowRight className="ml-2 h-4 w-4 shrink-0" />
                  </Button>
                </Link>
                <Link href="/services">
                  <Button variant="outline" size="xl" className="w-full sm:w-auto">
                    Explore Services
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </Section>
    </>
  )
}
