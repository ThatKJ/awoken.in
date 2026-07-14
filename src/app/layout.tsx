import { Inter, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/shared/json-ld";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const baseUrl = "https://awoken.in";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Awoken | AI Revenue Recovery for Local Businesses",
    template: "%s | Awoken",
  },
  description:
    "Awoken helps businesses recover lost revenue through AI-powered lead qualification, instant follow-up, appointment booking, CRM automation, and business intelligence.",
  keywords: [
    "AI Automation",
    "Lead Recovery",
    "CRM Automation",
    "Revenue Recovery",
    "Business Intelligence",
    "AI Consulting",
    "Appointment Booking",
    "Customer Engagement",
    "Local Business Automation",
  ],
  authors: [{ name: "Awoken" }],
  creator: "Awoken",
  publisher: "Awoken",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Awoken",
    url: baseUrl,
    title: "Awoken | AI Revenue Recovery for Local Businesses",
    description:
      "Awoken helps businesses recover lost revenue through AI-powered lead qualification, instant follow-up, appointment booking, CRM automation, and business intelligence.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Awoken — Business Intelligence & Implementation Consultancy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Awoken | AI Revenue Recovery for Local Businesses",
    description:
      "Awoken helps businesses recover lost revenue through AI-powered lead qualification, instant follow-up, appointment booking, CRM automation, and business intelligence.",
    images: ["/og-image.png"],
    creator: "@awoken_in",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      { rel: "mask-icon", url: "/favicon.svg", color: "#111111" },
    ],
  },
  manifest: "/manifest.json",
  other: {
    "theme-color": "#FFFFFF",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "msapplication-TileColor": "#FFFFFF",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className="min-h-screen flex flex-col">
        <JsonLd />
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
