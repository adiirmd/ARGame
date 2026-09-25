import { NextRequest, NextResponse } from "next/server";

// Next.js App Router streams its hydration bootstrap as inline <script>
// tags. A strict CSP with only `script-src 'self'` (no `unsafe-inline`)
// blocks those inline scripts, and the app never hydrates. The client
// waits forever for a stream that can't run and throws React error #412
// ("Connection closed"). Confirmed by reproducing directly against
// Next.js on 127.0.0.1:4310 (Apache and Cloudflare were not the cause) and by
// capturing `securitypolicyviolation` events pointing at
// `script-src-elem | inline`.
//
// The fix that keeps CSP strict (no `unsafe-inline`, no wildcard) AND
// lets hydration work is Next.js's documented nonce pattern
// (https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy):
// generate a per-request nonce here, forward it to the render via the
// `x-nonce` request header, and put `'nonce-<value>'` directly in the
// CSP response header. Next.js reads that response header at render time
// and automatically nonces its own inline bootstrap scripts to match.
export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    "connect-src 'self'",
    "frame-src 'self'",
    "child-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "worker-src 'self' blob:",
    "manifest-src 'self'",
    "upgrade-insecure-requests",
  ].join("; ");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  matcher: [
    // Run on every route except static assets and the vendored game files
    // (those are plain static HTML/JS shipped as-is, not Next.js pages,
    // and keep their own relaxed same-origin-framing CSP from next.config.ts).
    "/((?!_next/static|_next/image|favicon.ico|games/).*)",
  ],
};
