import type { NextConfig } from "next";

const storageHost = "firebasestorage.googleapis.com";
const bucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;

// Content-Security-Policy.
//
// Firebase's JS SDK talks to several Google hosts and next-themes writes an
// inline <script> before hydration, so 'unsafe-inline' is required for styles
// and the theme bootstrap. This ran report-only for a burn-in period; now
// enforced on every public route.
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

// The Sanity Studio embedded at /studio is its own SPA with a much wider set
// of hosts (asset CDN, live API, realtime websocket) and is protected by
// Sanity's own account auth, not by this app -- so it gets a separate,
// deliberately permissive policy rather than inheriting the public site's
// strict one and breaking content editing.
const studioCsp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:",
  "style-src 'self' 'unsafe-inline' https:",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https:",
  "connect-src 'self' https: wss:",
].join("; ");

const securityHeaders = [
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
  { key: "Content-Security-Policy", value: csp },
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
        // Overrides the strict public CSP above with the permissive Studio
        // one -- Next applies header blocks in order, so a matching key
        // defined later wins for routes under /studio.
        source: "/studio/:path*",
        headers: [{ key: "Content-Security-Policy", value: studioCsp }],
      },
    ];
  },
};

export default nextConfig;
