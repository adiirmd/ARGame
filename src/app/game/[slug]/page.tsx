import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import GamePlayer from "@/components/GamePlayer";
import GameCard from "@/components/GameCard";
import { getAllGames, getGameBySlug, getGamesByCategory } from "@/data/games";
import { CATEGORY_LABELS } from "@/lib/types";
import { CATEGORY_COLOR } from "@/lib/category-style";
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
  const accent = CATEGORY_COLOR[game.category];
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
    <div className="mx-auto max-w-6xl px-4 py-6">
      <nav
        aria-label="Breadcrumb"
        className="mb-4 flex flex-wrap items-center gap-1.5 text-xs text-[var(--panel)]/60"
      >
        <Link href="/" className="underline-offset-4 hover:text-[var(--panel)] hover:underline">
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <Link
          href={`/games/${game.category}`}
          className="underline-offset-4 hover:text-[var(--panel)] hover:underline"
        >
          {CATEGORY_LABELS[game.category]}
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-[var(--panel)]/85">{game.title}</span>
      </nav>

      {/* Title block sits above the player so the game itself stays the
          largest thing on screen. */}
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="font-display text-2xl uppercase leading-tight text-[var(--panel)] sm:text-3xl">
            {game.title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--panel)]/70">
            {game.description}
          </p>
        </div>
        <span
          className="nb-2 nb-sh-sm shrink-0 px-3 py-1.5 font-display text-[10px] uppercase text-[var(--ink)]"
          style={{ backgroundColor: accent }}
        >
          {CATEGORY_LABELS[game.category]}
        </span>
      </div>

      <GamePlayer game={game} />

      <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Info label="Category" value={CATEGORY_LABELS[game.category]} />
        <Info label="Controls" value={game.controls ?? "Not specified"} />
        <Info label="Orientation" value={game.orientation ?? "any"} />
        <Info label="Published" value={game.publishedAt} />
      </dl>

      <div className="nb-2 mt-4 bg-[var(--panel)] p-3 text-xs leading-relaxed text-[var(--ink)]/65">
        <span className="font-bold uppercase text-[var(--ink)]">Source: </span>
        {game.source}
        <span className="mx-2 text-[var(--ink)]/30">|</span>
        <span className="font-bold uppercase text-[var(--ink)]">License: </span>
        {game.license}
      </div>

      <div className="mt-6">
        <Link
          href={`/games/${game.category}`}
          className="nb-2 nb-sh-sm nb-press inline-block bg-[var(--panel)] px-4 py-2 font-display text-[11px] uppercase text-[var(--ink)]"
        >
          ◂ More {CATEGORY_LABELS[game.category]}
        </Link>
      </div>

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="font-display text-xl uppercase text-[var(--panel)]">
            <span
              aria-hidden="true"
              className="mr-2 inline-block h-4 w-4 border-2 border-[var(--ink)] align-middle"
              style={{ backgroundColor: accent }}
            />
            More {CATEGORY_LABELS[game.category]} games
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
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
    <div className="nb-2 bg-[var(--panel)] p-3">
      <dt className="font-display text-[10px] uppercase tracking-wide text-[var(--ink)]/55">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-medium leading-snug text-[var(--ink)]">
        {value}
      </dd>
    </div>
  );
}
