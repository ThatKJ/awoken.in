import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    webpackMemoryOptimizations: true,
    preloadEntriesOnStart: false,
  },
  async redirects() {
    return [
      {
        source: "/careers/:path*",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/admin/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/engagement/:path*",
        destination: "/pricing",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
