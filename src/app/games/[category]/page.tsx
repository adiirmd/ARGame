import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import GameCard from "@/components/GameCard";
import { getGamesByCategory } from "@/data/games";
import { CATEGORY_LABELS, GAME_CATEGORIES, isGameCategory } from "@/lib/types";
import { CATEGORY_COLOR, CATEGORY_GLYPH } from "@/lib/category-style";

export function generateStaticParams() {
  return GAME_CATEGORIES.map((category) => ({ category }));
}

type Params = Promise<{ category: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { category } = await params;
  if (!isGameCategory(category)) return {};
  const label = CATEGORY_LABELS[category];
  return {
    title: `${label} Games`,
    description: `Play free ${label.toLowerCase()} browser games online on AR Game. No downloads, no ads. Just instant free games.`,
    alternates: { canonical: `/games/${category}` },
  };
}

export default async function CategoryPage({ params }: { params: Params }) {
  const { category } = await params;
  if (!isGameCategory(category)) notFound();
  const games = getGamesByCategory(category);
  const label = CATEGORY_LABELS[category];
  const accent = CATEGORY_COLOR[category];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div
        className="nb nb-sh flex items-center gap-4 p-5 sm:p-6"
        style={{ backgroundColor: accent }}
      >
        <span aria-hidden="true" className="text-4xl leading-none">
          {CATEGORY_GLYPH[category]}
        </span>
        <div>
          <h1 className="font-display text-2xl uppercase text-[var(--ink)] sm:text-3xl">
            {label} Games
          </h1>
          <p className="mt-1 text-sm font-medium text-[var(--ink)]/70">
            {games.length} free {label.toLowerCase()}{" "}
            {games.length === 1 ? "game" : "games"} to play online.
          </p>
        </div>
      </div>

      {games.length === 0 ? (
        <div className="nb nb-sh mt-6 bg-[var(--panel)] p-8 text-center">
          <span aria-hidden="true" className="text-4xl">
            🎮
          </span>
          <p className="mt-3 font-display text-sm uppercase text-[var(--ink)]">
            Nothing here yet
          </p>
          <p className="mt-2 text-sm text-[var(--ink)]/65">
            No {label.toLowerCase()} games in the catalog right now.
          </p>
          <Link
            href="/games"
            className="nb-2 nb-sh-sm nb-press mt-5 inline-block bg-[var(--yellow)] px-4 py-2 font-display text-[11px] uppercase text-[var(--ink)]"
          >
            Browse all games
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  );
}
