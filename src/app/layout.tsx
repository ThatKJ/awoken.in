import { Inter, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { SmoothScrollProvider } from "@/components/shared/smooth-scroll";

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
    default: "Awoken — Revenue Systems for Modern Businesses",
    template: "%s — Awoken",
  },
  description:
    "We design and implement AI systems that answer calls, qualify leads, automate follow-ups and eliminate repetitive work. Revenue Systems for Modern Businesses.",
  openGraph: {
    title: "Awoken — Revenue Systems for Modern Businesses",
    description:
      "We design and implement AI systems that answer calls, qualify leads, automate follow-ups and eliminate repetitive work.",
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
    icon: "/favicon.svg",
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
        <SmoothScrollProvider>
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
