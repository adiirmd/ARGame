import Link from "next/link";
import Image from "next/image";
import type { Game } from "@/lib/types";
import { CATEGORY_LABELS } from "@/lib/types";
import { CATEGORY_COLOR } from "@/lib/category-style";

export default function GameCard({ game }: { game: Game }) {
  const accent = CATEGORY_COLOR[game.category];

  return (
    <Link
      href={`/game/${game.slug}`}
      className="nb nb-sh nb-lift group flex flex-col overflow-hidden bg-[var(--panel)]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden border-b-[3px] border-[var(--ink)] bg-[var(--bg-deep)]">
        <Image
          src={game.thumbnail}
          alt=""
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover"
          // Every thumbnail is a hand-written SVG under 1KB (120KB for the
          // whole catalog), so lazy loading buys nothing and just leaves
          // blank cards during a fast scroll. Load them up front instead.
          loading="eager"
        />
        {game.featured && (
          <span className="nb-2 absolute left-2 top-2 bg-[var(--yellow)] px-2 py-0.5 font-display text-[10px] uppercase leading-5 tracking-wide text-[var(--ink)]">
            Hot
          </span>
        )}
        {/* Play affordance: hidden until hover or keyboard focus on the card. */}
        <span
          aria-hidden="true"
          className="nb-2 pointer-events-none absolute bottom-2 right-2 bg-[var(--ink)] px-2 py-1 font-display text-[10px] uppercase tracking-wide text-[var(--panel)] opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          Play ▸
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <h3 className="line-clamp-2 font-display text-sm uppercase leading-tight text-[var(--ink)]">
          {game.title}
        </h3>
        <p className="line-clamp-2 text-xs leading-snug text-[var(--ink)]/65">
          {game.description}
        </p>
        <span
          className="nb-2 mt-auto inline-block w-fit px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[var(--ink)]"
          style={{ backgroundColor: accent }}
        >
          {CATEGORY_LABELS[game.category]}
        </span>
      </div>
    </Link>
  );
}
