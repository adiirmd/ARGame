import type { Metadata } from "next";
import { Bungee, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSiteUrl } from "@/lib/site";

// Display face for headings and the logo: a single heavy arcade weight.
const bungee = Bungee({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

// Body face: geometric, a little quirky, still comfortable at small sizes.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
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
  authors: [{ name: "Adi Romadhon", url: "https://adiirmd.id" }],
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
      founder: {
        "@type": "Person",
        name: "Adi Romadhon",
        alternateName: "adiirmd",
        url: "https://adiirmd.id",
        sameAs: [
          "https://github.com/adiirmd",
          "https://link.adiirmd.id",
          "https://www.linkedin.com/in/adi-romadhon-a925062b7/",
          "https://medium.com/@adiirmd",
        ],
      },
    },
  ];

  return (
    <html
      lang="en"
      className={`${bungee.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:nb focus:nb-sh focus:bg-[var(--yellow)] focus:px-4 focus:py-2 focus:font-display focus:text-sm focus:uppercase focus:text-[var(--ink)]"
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
