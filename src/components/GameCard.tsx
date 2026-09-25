import Link from "next/link";
import Image from "next/image";
import type { Game } from "@/lib/types";
import { CATEGORY_LABELS } from "@/lib/types";

export default function GameCard({ game }: { game: Game }) {
  return (
    <Link
      href={`/game/${game.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition hover:-translate-y-1 hover:border-indigo-400/50 hover:bg-white/[0.06] motion-reduce:hover:translate-y-0"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-800">
        <Image
          src={game.thumbnail}
          alt={`${game.title} thumbnail`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition duration-300 group-hover:scale-105 motion-reduce:group-hover:scale-100"
        />
        {game.featured && (
          <span className="absolute left-2 top-2 rounded-full bg-fuchsia-500 px-2 py-0.5 text-xs font-bold text-white shadow">
            Featured
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="line-clamp-1 font-semibold text-white">{game.title}</h3>
        <p className="line-clamp-2 text-xs text-slate-400">{game.description}</p>
        <span className="mt-auto inline-block w-fit rounded-full bg-indigo-500/15 px-2 py-0.5 text-[11px] font-medium text-indigo-300">
          {CATEGORY_LABELS[game.category]}
        </span>
      </div>
    </Link>
  );
}
