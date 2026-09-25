import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import GamePlayer from "@/components/GamePlayer";
import GameCard from "@/components/GameCard";
import { getAllGames, getGameBySlug, getGamesByCategory } from "@/data/games";
import { CATEGORY_LABELS } from "@/lib/types";
import { getSiteUrl } from "@/lib/site";

type Params = Promise<{ slug: string }>;

// Rendered per request instead of statically prerendered, so the CSP nonce
// set in src/middleware.ts matches the nonce embedded in this page's inline
// hydration scripts. Static/SSG output bakes scripts in at build time with
// no nonce at all, which permanently mismatches a per-request nonce header
// and leaves the app stuck un-hydrated (React error #412). Only these
// game pages need this trade-off. Metadata and SEO still work per request.
export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return getAllGames().map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) return {};
  const url = `/game/${game.slug}`;
  return {
    title: game.title,
    description: game.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${game.title}: Play Free on AR Game`,
      description: game.description,
      url,
      images: [{ url: game.thumbnail }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: game.title,
      description: game.description,
      images: [game.thumbnail],
    },
  };
}

export default async function GameDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) notFound();

  const siteUrl = getSiteUrl();
  const related = getGamesByCategory(game.category)
    .filter((g) => g.slug !== game.slug)
    .slice(0, 4);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "VideoGame",
      name: game.title,
      description: game.description,
      genre: CATEGORY_LABELS[game.category],
      url: `${siteUrl}/game/${game.slug}`,
      image: `${siteUrl}${game.thumbnail}`,
      applicationCategory: "Game",
      operatingSystem: "Any (Web Browser)",
      datePublished: game.publishedAt,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: CATEGORY_LABELS[game.category],
          item: `${siteUrl}/games/${game.category}`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: game.title,
          item: `${siteUrl}/game/${game.slug}`,
        },
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-400">
        <Link href="/" className="hover:text-white">
          Home
        </Link>{" "}
        /{" "}
        <Link href={`/games/${game.category}`} className="hover:text-white">
          {CATEGORY_LABELS[game.category]}
        </Link>{" "}
        / <span className="text-slate-300">{game.title}</span>
      </nav>

      <Link
        href={`/games/${game.category}`}
        className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-indigo-300 hover:text-indigo-200"
      >
        ← Back to {CATEGORY_LABELS[game.category]} games
      </Link>

      <h1 className="mt-2 text-3xl font-extrabold text-white">{game.title}</h1>
      <p className="mt-2 max-w-2xl text-slate-400">{game.description}</p>

      <div className="mt-6">
        <GamePlayer game={game} />
      </div>

      <dl className="mt-8 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
        <Info label="Category" value={CATEGORY_LABELS[game.category]} />
        <Info label="Controls" value={game.controls ?? "Not specified"} />
        <Info label="Orientation" value={game.orientation ?? "any"} />
        <Info label="Published" value={game.publishedAt} />
      </dl>

      <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-xs text-slate-500">
        Source: {game.source} | License: {game.license}
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-4 text-xl font-bold text-white">
            More {CATEGORY_LABELS[game.category]} games
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {related.map((g) => (
              <GameCard key={g.id} game={g} />
            ))}
          </div>
        </section>
      )}

      <script
        type="application/ld+json"
        // This JSON comes straight from our own typed catalog with no user input, so it's safe here.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
      <dt className="text-slate-500">{label}</dt>
      <dd className="mt-1 font-medium text-slate-200">{value}</dd>
    </div>
  );
}
