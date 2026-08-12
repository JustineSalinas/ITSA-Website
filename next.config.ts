import type { NextConfig } from "next";

const storageHost = "firebasestorage.googleapis.com";
const bucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;

// Content-Security-Policy.
//
// Firebase's JS SDK talks to several Google hosts and next-themes writes an
// inline <script> before hydration, so 'unsafe-inline' is required for styles
// and the theme bootstrap. It is shipped report-only first: watch the reports
// for a week, then rename the header to `Content-Security-Policy` to enforce.
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline' https://apis.google.com https://www.gstatic.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://firebasestorage.googleapis.com https://lh3.googleusercontent.com",
  "font-src 'self' data:",
  [
    "connect-src 'self'",
    "https://*.googleapis.com",
    "https://*.firebaseio.com",
    "wss://*.firebaseio.com",
    "https://firebasestorage.googleapis.com",
  ].join(" "),
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  // Clickjacking: nothing may frame this site, including the admin login.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Content-Security-Policy-Report-Only", value: csp },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,

  images: {
    // Only our own Storage bucket may be rendered through next/image, so a
    // stored imageUrl cannot beacon page views to an arbitrary third party.
    remotePatterns: [
      {
        protocol: "https",
        hostname: storageHost,
        pathname: bucket ? `/v0/b/${bucket}/o/**` : "/v0/b/**",
      },
    ],
  },

  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        // The admin surface must never be cached or indexed anywhere.
        source: "/admin/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, max-age=0, must-revalidate" },
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
        ],
      },
    ];
  },
};

export default nextConfig;
