export function getSiteUrl(): string {
  const raw = process.env.PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_SITE_URL;
  if (!raw) {
    // Safe local fallback only. Production must set PUBLIC_SITE_URL.
    return "http://127.0.0.1:4310";
  }
  return raw.replace(/\/+$/, "");
}
