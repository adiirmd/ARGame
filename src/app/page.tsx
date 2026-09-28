import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import GameCard from "@/components/GameCard";
import {
  getFeaturedGames,
  getRecentGames,
  getAllGames,
} from "@/data/games";
import { CATEGORY_LABELS, GAME_CATEGORIES } from "@/lib/types";
import { CATEGORY_COLOR, CATEGORY_GLYPH } from "@/lib/category-style";

export const metadata: Metadata = {
  title: "AR Game: Play Free Browser Games",
  description:
    "Play fun browser games you can start instantly. No downloads, no ads, just a growing catalog of free games in arcade, puzzle, action and more.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const featured = getFeaturedGames();
  const all = getAllGames();
  const recent = getRecentGames(8);

  // The hero shows a real game instead of a decorative illustration, so the
  // primary action lands the player straight into something playable.
  const hero = featured[0] ?? all[0];
  const heroRest = featured.slice(1, 9);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20">
      {/* Hero */}
      <section className="grid gap-5 py-8 sm:py-12 lg:grid-cols-[1.1fr_1fr] lg:items-stretch">
        <div className="nb nb-sh-lg flex flex-col justify-center gap-5 bg-[var(--pink)] p-6 sm:p-8">
          <span className="nb-2 w-fit bg-[var(--yellow)] px-2.5 py-1 font-display text-[10px] uppercase tracking-wide text-[var(--ink)]">
            {all.length} games, all free
          </span>
          <h1 className="font-display text-3xl uppercase leading-[1.05] text-[var(--panel)] ink-edge sm:text-5xl">
            Press start.
            <br />
            No download.
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-[var(--ink)]/80 sm:text-base">
            Arcade, puzzle, racing and more. Every game runs right in your
            browser, with no account and no ads.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/games"
              className="nb nb-sh nb-press bg-[var(--yellow)] px-6 py-3 font-display text-sm uppercase text-[var(--ink)]"
            >
              Play now ▸
            </Link>
            <Link
              href="/search"
              className="nb nb-sh nb-press bg-[var(--panel)] px-6 py-3 font-display text-sm uppercase text-[var(--ink)]"
            >
              Search
            </Link>
          </div>
        </div>

        {hero && (
          <Link
            href={`/game/${hero.slug}`}
            className="nb nb-sh-lg nb-lift group flex flex-col overflow-hidden bg-[var(--panel)]"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden border-b-[3px] border-[var(--ink)] bg-[var(--bg-deep)]">
              <Image
                src={hero.thumbnail}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
                priority
              />
              <span className="nb-2 absolute left-3 top-3 bg-[var(--cyan)] px-2.5 py-1 font-display text-[10px] uppercase tracking-wide text-[var(--ink)]">
                Start here
              </span>
            </div>
            <div className="flex items-center justify-between gap-3 p-4">
              <div className="min-w-0">
                <h2 className="truncate font-display text-lg uppercase text-[var(--ink)]">
                  {hero.title}
                </h2>
                <p className="mt-0.5 text-xs text-[var(--ink)]/65">
                  {CATEGORY_LABELS[hero.category]}
                </p>
              </div>
              <span
                aria-hidden="true"
                className="nb-2 shrink-0 bg-[var(--ink)] px-3 py-2 font-display text-xs uppercase text-[var(--panel)]"
              >
                Play ▸
              </span>
            </div>
          </Link>
        )}
      </section>

      {heroRest.length > 0 && (
        <>
          <SectionHeading title="Featured" accent="var(--yellow)" href="/games" />
          <GameGrid games={heroRest} />
        </>
      )}

      {/* Categories: a real navigation block, not a footnote. */}
      <section className="mt-14">
        <SectionHeading title="Browse by type" accent="var(--cyan)" />
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {GAME_CATEGORIES.map((cat) => {
            const count = all.filter((g) => g.category === cat).length;
            return (
              <Link
                key={cat}
                href={`/games/${cat}`}
                className="nb nb-sh nb-lift flex flex-col gap-1 p-4 text-[var(--ink)]"
                style={{ backgroundColor: CATEGORY_COLOR[cat] }}
              >
                <span aria-hidden="true" className="text-2xl leading-none">
                  {CATEGORY_GLYPH[cat]}
                </span>
                <span className="font-display text-sm uppercase">
                  {CATEGORY_LABELS[cat]}
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wide text-[var(--ink)]/60">
                  {count} {count === 1 ? "game" : "games"}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <SectionHeading
        title="Recently added"
        accent="var(--mint)"
        href="/games"
        className="mt-14"
      />
      <GameGrid games={recent} />

      {/* SEO copy */}
      <section className="nb nb-sh mt-14 bg-[var(--panel)] p-6">
        <h2 className="font-display text-base uppercase text-[var(--ink)]">
          Free online games, anytime, anywhere
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--ink)]/70">
          AR Game is a free online game portal where you can play browser games
          instantly. No downloads, no sign-ups, and no ads. Whether you&apos;re
          after quick arcade games, relaxing puzzle games, or a fast reflex
          challenge, our growing catalog of free games works great on desktop,
          tablet, and mobile. Every game listed here is either an original
          creation or used under a verified open-source license, so you can
          play with confidence.
        </p>
      </section>
    </div>
  );
}

function SectionHeading({
  title,
  accent,
  href,
  className = "mt-14",
}: {
  title: string;
  accent: string;
  href?: string;
  className?: string;
}) {
  return (
    <div className={`flex items-end justify-between gap-4 ${className}`}>
      <h2 className="font-display text-xl uppercase text-[var(--panel)] sm:text-2xl">
        <span
          aria-hidden="true"
          className="mr-2 inline-block h-4 w-4 border-2 border-[var(--ink)] align-middle"
          style={{ backgroundColor: accent }}
        />
        {title}
      </h2>
      {href && (
        <Link
          href={href}
          className="nb-2 nb-sh-sm nb-press inline-flex min-h-11 shrink-0 items-center bg-[var(--panel)] px-3 py-2 font-display text-[10px] uppercase text-[var(--ink)]"
        >
          See all
        </Link>
      )}
    </div>
  );
}

function GameGrid({ games }: { games: ReturnType<typeof getAllGames> }) {
  if (games.length === 0) {
    return (
      <p className="nb-2 mt-4 bg-[var(--panel)] p-4 text-sm text-[var(--ink)]/70">
        No games here yet.
      </p>
    );
  }
  return (
    <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}
