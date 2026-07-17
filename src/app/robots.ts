import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/app/", "/admin/", "/dashboard/", "/private/"],
      },
    ],
    sitemap: "https://awoken.in/sitemap.xml",
    host: "https://awoken.in",
  }
}
