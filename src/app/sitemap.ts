import type { MetadataRoute } from "next"
import { blogPosts } from "@/data/blog"

const baseUrl = "https://www.awoken.in"

const routes: { path: string; priority: MetadataRoute.Sitemap[number]["priority"]; changefreq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1.0, changefreq: "daily" },
  { path: "/services", priority: 0.9, changefreq: "weekly" },
  { path: "/solutions", priority: 0.9, changefreq: "weekly" },
  { path: "/industries", priority: 0.9, changefreq: "weekly" },
  { path: "/pricing", priority: 0.9, changefreq: "weekly" },
  { path: "/how-we-work", priority: 0.8, changefreq: "monthly" },
  { path: "/case-studies", priority: 0.8, changefreq: "weekly" },
  { path: "/integrations", priority: 0.7, changefreq: "monthly" },
  { path: "/about", priority: 0.8, changefreq: "monthly" },
  { path: "/blog", priority: 0.8, changefreq: "weekly" },
  { path: "/resources", priority: 0.7, changefreq: "monthly" },
  { path: "/faq", priority: 0.6, changefreq: "monthly" },
  { path: "/demo", priority: 0.7, changefreq: "monthly" },
  { path: "/engagement", priority: 0.7, changefreq: "monthly" },
  { path: "/contact", priority: 0.8, changefreq: "monthly" },
  { path: "/book", priority: 0.9, changefreq: "weekly" },
  { path: "/privacy", priority: 0.3, changefreq: "yearly" },
  { path: "/terms", priority: 0.3, changefreq: "yearly" },
  { path: "/cookie-policy", priority: 0.3, changefreq: "yearly" },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = routes.map(({ path, priority, changefreq }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: changefreq,
    priority,
  }))

  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6 as const,
  }))

  return [...staticRoutes, ...blogRoutes]
}
