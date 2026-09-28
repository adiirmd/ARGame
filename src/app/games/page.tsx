import type { Metadata } from "next";
import Link from "next/link";
import GameCard from "@/components/GameCard";
import { getAllGames } from "@/data/games";
import { CATEGORY_LABELS, GAME_CATEGORIES } from "@/lib/types";
import { CATEGORY_COLOR } from "@/lib/category-style";

export const metadata: Metadata = {
  title: "All Games",
  description:
    "Browse every free browser game on AR Game: action, arcade, puzzle, racing, sports, adventure, strategy and casual games. Play online, instantly.",
  alternates: { canonical: "/games" },
};

export default function GamesPage() {
  const games = getAllGames();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="nb nb-sh bg-[var(--yellow)] p-5 sm:p-6">
        <h1 className="font-display text-2xl uppercase text-[var(--ink)] sm:text-3xl">
          All Games
        </h1>
        <p className="mt-1.5 text-sm font-medium text-[var(--ink)]/70">
          {games.length} free browser games, playable instantly.
        </p>
      </div>

      {/* Jump links, so a 30-item grid isn't the only way to navigate. */}
      <ul
        aria-label="Jump to category"
        className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1"
      >
        {GAME_CATEGORIES.map((cat) => (
          <li key={cat} className="shrink-0">
            <Link
              href={`/games/${cat}`}
              className="nb-2 nb-sh-sm nb-press flex min-h-11 items-center px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-[var(--ink)]"
              style={{ backgroundColor: CATEGORY_COLOR[cat] }}
            >
              {CATEGORY_LABELS[cat]}
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}
