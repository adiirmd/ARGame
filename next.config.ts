import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

// Security headers per PRD: restrictive CSP (no wildcards), sensible isolation headers.
// HSTS is only ever sent when the app is actually served over HTTPS in production —
// we do not force it in dev, and the header value itself is conditional below.
//
// NOTE: Content-Security-Policy for these routes is NOT set here. A static
// CSP here would need `script-src 'self'` (no `unsafe-inline`), which blocks
// Next.js's own inline hydration bootstrap scripts and breaks the app
// (React error #412, page stuck hydrating forever). Instead `src/middleware.ts`
// generates a per-request nonce and sets the CSP response header dynamically
// so Next.js can nonce its own inline scripts while everything else stays
// exactly as strict (no wildcards, no blanket `unsafe-inline` for scripts).
const baseSecurityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=(), fullscreen=(self)",
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
];

// The vendored/original playable games under /games/* are meant to be
// embedded in an <iframe> by our own /game/[slug] player page (same
// origin). A global X-Frame-Options: DENY / frame-ancestors 'none' would
// block that self-embed, so this route gets its own, slightly relaxed
// framing policy — restricted to same-origin only, never a wildcard.
const gameAssetHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "connect-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'none'",
      "frame-ancestors 'self'",
      "worker-src 'self' blob:",
    ].join("; "),
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
];

if (isProd) {
  baseSecurityHeaders.push({
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  });
  gameAssetHeaders.push({
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  });
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/games/:path*",
        headers: gameAssetHeaders,
      },
      {
        source: "/((?!games/).*)",
        headers: baseSecurityHeaders,
      },
    ];
  },
};

export default nextConfig;
