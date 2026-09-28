"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import GameCard from "@/components/GameCard";
import { getAllGames } from "@/data/games";
import { CATEGORY_LABELS, GAME_CATEGORIES } from "@/lib/types";
import { CATEGORY_COLOR } from "@/lib/category-style";

function SearchInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";

  const [inputValue, setInputValue] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

  // Debounce: wait 300ms after the user stops typing before filtering /
  // updating the URL, so we don't re-render on every keystroke.
  useEffect(() => {
    const handle = setTimeout(() => setDebouncedQuery(inputValue), 300);
    return () => clearTimeout(handle);
  }, [inputValue]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedQuery) params.set("q", debouncedQuery);
    const qs = params.toString();
    router.replace(qs ? `/search?${qs}` : "/search", { scroll: false });
  }, [debouncedQuery, router]);

  const allGames = useMemo(() => getAllGames(), []);

  const results = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return allGames;
    return allGames.filter((g) =>
      [g.title, g.description, g.category].some((field) =>
        field.toLowerCase().includes(q),
      ),
    );
  }, [debouncedQuery, allGames]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="nb nb-sh bg-[var(--cyan)] p-5 sm:p-6">
        <h1 className="font-display text-2xl uppercase text-[var(--ink)] sm:text-3xl">
          Search Games
        </h1>
        <label htmlFor="search-input" className="sr-only">
          Search games by title, description, or category
        </label>
        <input
          id="search-input"
          type="search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Try snake, puzzle, racing…"
          className="nb mt-4 w-full max-w-xl bg-[var(--panel)] px-4 py-3 text-[var(--ink)] placeholder:text-[var(--ink)]/40"
          autoComplete="off"
        />
        <p
          className="mt-3 text-sm font-bold uppercase tracking-wide text-[var(--ink)]/70"
          role="status"
          aria-live="polite"
        >
          {results.length} result{results.length === 1 ? "" : "s"}
          {debouncedQuery ? ` for "${debouncedQuery}"` : ""}
        </p>
      </div>

      {/* Category shortcuts double as search suggestions when the field is
          empty, which gives the page something useful to do on first load. */}
      {!debouncedQuery && (
        <ul
          aria-label="Search by category"
          className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1"
        >
          {GAME_CATEGORIES.map((cat) => (
            <li key={cat} className="shrink-0">
              <button
                type="button"
                onClick={() => setInputValue(cat)}
                className="nb-2 nb-sh-sm nb-press flex min-h-11 items-center px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-[var(--ink)]"
                style={{ backgroundColor: CATEGORY_COLOR[cat] }}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            </li>
          ))}
        </ul>
      )}

      {results.length === 0 ? (
        <div className="nb nb-sh mt-6 bg-[var(--panel)] p-8 text-center">
          <span aria-hidden="true" className="text-4xl">
            🔍
          </span>
          <p className="mt-3 font-display text-sm uppercase text-[var(--ink)]">
            No match
          </p>
          <p className="mt-2 text-sm text-[var(--ink)]/65">
            Nothing matched &quot;{debouncedQuery}&quot;. Try a shorter word or
            pick a category above.
          </p>
          <button
            type="button"
            onClick={() => setInputValue("")}
            className="nb-2 nb-sh-sm nb-press mt-5 bg-[var(--yellow)] px-4 py-2 font-display text-[11px] uppercase text-[var(--ink)]"
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {results.map((g) => (
            <GameCard key={g.id} game={g} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="nb nb-sh bg-[var(--panel)] p-6 font-display text-sm uppercase text-[var(--ink)]">
            Loading search…
          </div>
        </div>
      }
    >
      <SearchInner />
    </Suspense>
  );
}
