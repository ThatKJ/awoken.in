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
  async headers() {
    const cspHeader = `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.clarity.ms https://va.vercel-scripts.com https://www.googletagmanager.com https://app.cal.com;
      style-src 'self' 'unsafe-inline';
      img-src 'self' blob: data: https://*.clarity.ms https://www.googletagmanager.com;
      font-src 'self' data:;
      connect-src 'self' https://bawnyenqnzymqctyaxlb.supabase.co wss://bawnyenqnzymqctyaxlb.supabase.co https://*.clarity.ms https://vitals.vercel-insights.com https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://app.cal.com https://api.cal.com;
      frame-src 'self' https://cal.com https://app.cal.com;
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'none';
      upgrade-insecure-requests;
    `;

    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, '').replace(/\s+/g, ' ').trim(),
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
