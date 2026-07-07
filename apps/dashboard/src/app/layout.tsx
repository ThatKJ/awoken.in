import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import PipelineControl from "@/components/PipelineControl";

export const metadata: Metadata = {
  title: "Awoken | Founder Intelligence",
  description: "Private intelligence platform for discovering and validating startup opportunities.",
  icons: {
    icon: "/logo-app-light.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="app-shell">
          <Sidebar />
          <div className="main-area">
            {children}
          </div>
        </div>
        <PipelineControl />
      </body>
    </html>
  );
}

