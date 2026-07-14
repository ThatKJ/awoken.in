import type { MetadataRoute } from "next"

const baseUrl = "https://awoken.in"

const routes: { path: string; priority: number; changefreq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1.0, changefreq: "weekly" },
  { path: "/services", priority: 0.9, changefreq: "weekly" },
  { path: "/solutions", priority: 0.9, changefreq: "weekly" },
  { path: "/how-we-work", priority: 0.9, changefreq: "weekly" },
  { path: "/industries", priority: 0.8, changefreq: "weekly" },
  { path: "/integrations", priority: 0.8, changefreq: "monthly" },
  { path: "/engagement", priority: 0.8, changefreq: "monthly" },
  { path: "/resources", priority: 0.9, changefreq: "weekly" },
  { path: "/demo", priority: 0.9, changefreq: "monthly" },
  { path: "/about", priority: 0.6, changefreq: "yearly" },
  { path: "/contact", priority: 0.5, changefreq: "yearly" },
  { path: "/book", priority: 0.9, changefreq: "monthly" },
  { path: "/privacy", priority: 0.3, changefreq: "yearly" },
  { path: "/terms", priority: 0.3, changefreq: "yearly" },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority, changefreq }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: changefreq,
    priority,
  }))
}
