import Link from "next/link";
import type { Metadata } from "next";
import GameCard from "@/components/GameCard";
import {
  getFeaturedGames,
  getRecentGames,
  getAllGames,
} from "@/data/games";
import { CATEGORY_LABELS, GAME_CATEGORIES } from "@/lib/types";

export const metadata: Metadata = {
  title: "AR Game: Play Free Browser Games",
  description:
    "Play fun browser games you can start instantly. No downloads, no ads, just a growing catalog of free games in arcade, puzzle, action and more.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const featured = getFeaturedGames();
  const popular = getAllGames().slice(0, 8);
  const recent = getRecentGames(8);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20">
      {/* Hero */}
      <section className="flex flex-col items-center gap-6 py-16 text-center sm:py-24">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Play Free Browser Games
        </h1>
        <p className="max-w-xl text-lg text-slate-300">
          Discover fun browser games you can play instantly. No downloads. No
          ads. Just play.
        </p>
        <Link
          href="/games"
          className="rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-8 py-3 text-base font-bold text-white shadow-lg shadow-indigo-500/20 transition hover:brightness-110"
        >
          PLAY NOW
        </Link>
      </section>

      {/* Featured */}
      <SectionHeading title="Featured Games" href="/games" />
      <GameGrid games={featured} />

      {/* Popular */}
      <SectionHeading title="Popular Games" href="/games" />
      <GameGrid games={popular} />

      {/* Categories */}
      <section className="mt-16">
        <h2 className="mb-4 text-2xl font-bold text-white">Categories</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {GAME_CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/games/${cat}`}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-6 text-center font-semibold text-slate-200 transition hover:border-indigo-400/50 hover:bg-white/[0.06] hover:text-white"
            >
              {CATEGORY_LABELS[cat]}
            </Link>
          ))}
        </div>
      </section>

      {/* Recently added */}
      <SectionHeading title="Recently Added" href="/games" />
      <GameGrid games={recent} />

      {/* SEO content */}
      <section className="mt-16 rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-sm leading-relaxed text-slate-400">
        <h2 className="mb-2 text-lg font-semibold text-slate-200">
          Free online games, anytime, anywhere
        </h2>
        <p>
          AR Game is a free online game portal where you can play browser
          games instantly. No downloads, no sign-ups, and no ads. Whether
          you&apos;re after quick arcade games, relaxing puzzle games, or a
          fast reflex challenge, our growing catalog of free games
          works great on desktop, tablet, and mobile. Every game listed
          here is either an original creation or used under a verified
          open-source license, so you can play with confidence.
        </p>
      </section>
    </div>
  );
}

function SectionHeading({ title, href }: { title: string; href: string }) {
  return (
    <div className="mt-16 flex items-center justify-between">
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <Link href={href} className="text-sm font-medium text-indigo-300 hover:text-indigo-200">
        View all →
      </Link>
    </div>
  );
}

function GameGrid({ games }: { games: ReturnType<typeof getAllGames> }) {
  if (games.length === 0) {
    return <p className="mt-4 text-sm text-slate-500">No games yet.</p>;
  }
  return (
    <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}
