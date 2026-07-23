import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Section } from "@/components/shared/section"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  X,
} from "lucide-react"
import { blogPosts, getBlogPost, getRelatedPosts, getAdjacentPosts } from "@/data/blog"
import { SITE_NAME } from "@/lib/constants"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}

  return {
    title: `${post.title} | ${SITE_NAME}`,
    description: post.description,
    alternates: { canonical: `https://www.awoken.in/blog/${post.slug}` },
    openGraph: {
      title: `${post.title} | ${SITE_NAME}`,
      description: post.description,
      url: `https://www.awoken.in/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
      images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | ${SITE_NAME}`,
      description: post.description,
      images: ["/og-image.svg"],
    },
  }
}

function ShareButton({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-9 h-9 rounded-lg border border-border bg-background flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/30 transition-all duration-200"
    >
      {icon}
    </a>
  )
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(post)
  const { prev, next } = getAdjacentPosts(slug)
  const siteUrl = "https://www.awoken.in"

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    author: {
      "@type": "Person",
      name: post.author.name,
    },
    datePublished: post.publishedAt,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${post.slug}`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ─── BREADCRUMBS ─── */}
      <div className="bg-background border-b border-border">
        <div className="mx-auto w-full max-w-full lg:max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-12">
          <nav className="flex items-center gap-2 py-4 text-xs sm:text-sm text-muted-foreground">
            <Link href="/" className="hover:text-accent transition-colors">
              Home
            </Link>
            <span className="text-muted-foreground/40">/</span>
            <Link href="/blog" className="hover:text-accent transition-colors">
              Blog
            </Link>
            <span className="text-muted-foreground/40">/</span>
            <span className="text-foreground truncate max-w-[200px] sm:max-w-[300px]">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* ─── ARTICLE HEADER ─── */}
      <Section size="small" className="bg-background">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-6 sm:mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4 sm:mb-5">
            <Badge variant="accent">{post.category}</Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {post.readingTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-4 sm:mb-5">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mb-6 sm:mb-8">
            {post.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-sm font-semibold text-accent">
                {post.author.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium">{post.author.name}</p>
                <p className="text-xs text-muted-foreground">{post.author.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {post.publishedAt}
              </span>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── ARTICLE CONTENT ─── */}
      <Section size="small" className="bg-background-alt">
        <div className="max-w-3xl mx-auto">
          <article
            className="prose-custom"
          >
            <div
              className="text-base sm:text-lg leading-relaxed text-foreground space-y-5 [&_.lead]:text-lg sm:[&_.lead]:text-xl [&_.lead]:text-muted-foreground [&_.lead]:leading-relaxed [&_h2]:text-2xl sm:[&_h2]:text-3xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg sm:[&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_li]:text-base sm:[&_li]:text-lg [&_li]:leading-relaxed [&_li]:text-muted-foreground [&_p]:text-base sm:[&_p]:text-lg [&_p]:leading-relaxed [&_p]:text-muted-foreground [&_strong]:text-foreground [&_strong]:font-semibold"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-border">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-lg bg-background border border-border text-xs font-medium text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Share */}
          <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border">
            <span className="text-xs sm:text-sm font-medium text-muted-foreground">Share this article:</span>
            <ShareButton
              href={`https://x.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${siteUrl}/blog/${post.slug}`)}`}
              label="Share on X / Twitter"
              icon={<X className="h-4 w-4" />}
            />
            <ShareButton
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${siteUrl}/blog/${post.slug}`)}`}
              label="Share on LinkedIn"
              icon={
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              }
            />
            <ShareButton
              href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(`${siteUrl}/blog/${post.slug}`)}`}
              label="Share via Email"
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 4L12 13 2 4" />
                </svg>
              }
            />
          </div>
        </div>
      </Section>

      {/* ─── PREV / NEXT ─── */}
      <Section size="small" className="bg-background">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {prev ? (
              <Link
                href={`/blog/${prev.slug}`}
                className="group rounded-xl border border-border bg-background-alt p-5 sm:p-6 hover:border-accent/20 transition-all duration-200"
              >
                <span className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
                  <ArrowLeft className="h-3 w-3" />
                  Previous Article
                </span>
                <span className="text-sm font-medium group-hover:text-accent transition-colors duration-200 line-clamp-2">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={`/blog/${next.slug}`}
                className="group rounded-xl border border-border bg-background-alt p-5 sm:p-6 text-right hover:border-accent/20 transition-all duration-200 sm:col-start-2"
              >
                <span className="text-xs text-muted-foreground flex items-center gap-1 justify-end mb-2">
                  Next Article
                  <ArrowRight className="h-3 w-3" />
                </span>
                <span className="text-sm font-medium group-hover:text-accent transition-colors duration-200 line-clamp-2">
                  {next.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </Section>

      {/* ─── RELATED ARTICLES ─── */}
      {relatedPosts.length > 0 && (
        <Section className="bg-background-alt">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10 sm:mb-12">
              <p className="text-accent text-xl font-bold tracking-wide uppercase underline underline-offset-4 decoration-accent/30 mb-3">
                Related
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                Continue Reading
              </h2>
              <div className="h-[3px] rounded-full bg-accent mx-auto mt-4 w-[80px] shadow-[0_0_8px_rgba(249,115,22,0.3)]" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group rounded-xl border border-border bg-background p-5 sm:p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
                >
                  <Badge variant="accent" className="mb-3 text-xs">
                    {related.category}
                  </Badge>
                  <h3 className="text-base sm:text-lg font-bold mb-2 group-hover:text-accent transition-colors duration-200 line-clamp-2">
                    {related.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                    {related.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{related.readingTime}</span>
                    <span className="text-xs text-accent flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                      Read
                      <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* ─── CTA ─── */}
      <Section className="bg-background">
        <div className="max-w-3xl mx-auto text-center">
          <div className="rounded-2xl border border-border bg-background-alt p-8 sm:p-10 lg:p-14">
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
              <Link href="/contact">
                <Button variant="outline" size="xl" className="w-full sm:w-auto">
                  Talk to Our Team
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
