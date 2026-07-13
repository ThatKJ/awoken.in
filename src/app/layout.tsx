import { Inter, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";

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

export const metadata: Metadata = {
  title: {
    default: "Awoken | Business Intelligence & AI Implementation Consultancy",
    template: "%s — Awoken",
  },
  description:
    "Awoken helps businesses identify operational bottlenecks, prioritize high-impact improvements, and implement AI solutions that solve real business problems.",
  openGraph: {
    title: "Awoken | Business Intelligence & AI Implementation Consultancy",
    description:
      "Awoken helps businesses identify operational bottlenecks, prioritize high-impact improvements, and implement AI solutions that solve real business problems.",
    url: "https://awoken.in",
    siteName: "Awoken",
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
