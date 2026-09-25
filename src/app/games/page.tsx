import type { Metadata } from "next";
import GameCard from "@/components/GameCard";
import { getAllGames } from "@/data/games";

export const metadata: Metadata = {
  title: "All Games",
  description:
    "Browse every free browser game on AR Game: action, arcade, puzzle, racing, sports, adventure, strategy and casual games. Play online, instantly.",
  alternates: { canonical: "/games" },
};

export default function GamesPage() {
  const games = getAllGames();
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-extrabold text-white">All Games</h1>
      <p className="mt-2 text-slate-400">
        {games.length} free browser games, playable instantly.
      </p>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}
