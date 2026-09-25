"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import GameCard from "@/components/GameCard";
import { getAllGames } from "@/data/games";

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
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-extrabold text-white">Search Games</h1>
      <label htmlFor="search-input" className="sr-only">
        Search games by title, description, or category
      </label>
      <input
        id="search-input"
        type="search"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search by title, description, or category…"
        className="mt-4 w-full max-w-xl rounded-full border border-white/15 bg-white/5 px-5 py-3 text-slate-100 placeholder:text-slate-500 focus:border-indigo-400"
        autoComplete="off"
      />
      <p className="mt-3 text-sm text-slate-400" role="status" aria-live="polite">
        {results.length} result{results.length === 1 ? "" : "s"}
        {debouncedQuery ? ` for "${debouncedQuery}"` : ""}
      </p>

      {results.length === 0 ? (
        <p className="mt-8 text-slate-500">
          No games matched your search. Try another keyword.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
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
    <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-12 text-slate-400">Loading search…</div>}>
      <SearchInner />
    </Suspense>
  );
}
