import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSiteUrl } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AR Game: Play Free Browser Games",
    template: "%s | AR Game",
  },
  description:
    "Play free browser games instantly, no downloads and no ads. AR Game has arcade, puzzle, action, racing and more, ready whenever you want to play.",
  keywords: [
    "friv",
    "friv games",
    "free games",
    "free online games",
    "online games",
    "browser games",
    "game online",
    "game gratis",
    "games",
    "online game free",
  ],
  applicationName: "AR Game",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    siteName: "AR Game",
    title: "AR Game: Play Free Browser Games",
    description:
      "Fun browser games you can play right away, no downloads and no ads.",
    url: siteUrl,
    images: [{ url: "/images/og-default.svg", width: 1200, height: 630, alt: "AR Game" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AR Game: Play Free Browser Games",
    description:
      "Fun browser games you can play right away, no downloads and no ads.",
    images: ["/images/og-default.svg"],
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "AR Game",
      url: siteUrl,
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteUrl}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "AR Game",
      url: siteUrl,
      logo: `${siteUrl}/images/og-default.svg`,
    },
  ];

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#0b1020] text-slate-100">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-indigo-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        {/* Structured data for search engines: WebSite and Organization only.
            We don't fake ratings, reviews, or player counts here. */}
        <script
          type="application/ld+json"
          // This JSON is hardcoded above and never includes user input, so it's safe to inject.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
