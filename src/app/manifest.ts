import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Awoken — AI Revenue Recovery for Local Businesses",
    short_name: "Awoken",
    description:
      "Awoken helps businesses recover lost revenue through AI-powered lead qualification, instant follow-up, appointment booking, CRM automation, and business intelligence.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#FFFFFF",
    icons: [
      { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    categories: ["business", "technology", "consulting"],
  }
}
