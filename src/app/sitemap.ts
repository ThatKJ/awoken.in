import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://awoken.in"

  const routes = [
    "",
    "/services",
    "/industries",
    "/how-we-work",
    "/solutions",
    "/integrations",
    "/resources",
    "/engagement",
    "/demo",
    "/about",
    "/contact",
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }))
}
