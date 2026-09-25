import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GameCard from "@/components/GameCard";
import { getGamesByCategory } from "@/data/games";
import { CATEGORY_LABELS, GAME_CATEGORIES, isGameCategory } from "@/lib/types";

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

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-extrabold text-white">{label} Games</h1>
      <p className="mt-2 text-slate-400">
        {games.length} free {label.toLowerCase()} games to play online.
      </p>
      {games.length === 0 ? (
        <p className="mt-8 text-slate-500">
          No {label.toLowerCase()} games yet. Check back soon.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  );
}
