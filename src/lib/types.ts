export const GAME_CATEGORIES = [
  "action",
  "arcade",
  "puzzle",
  "racing",
  "sports",
  "adventure",
  "strategy",
  "casual",
] as const;

export type GameCategory = (typeof GAME_CATEGORIES)[number];

export function isGameCategory(value: string): value is GameCategory {
  return (GAME_CATEGORIES as readonly string[]).includes(value);
}

export const CATEGORY_LABELS: Record<GameCategory, string> = {
  action: "Action",
  arcade: "Arcade",
  puzzle: "Puzzle",
  racing: "Racing",
  sports: "Sports",
  adventure: "Adventure",
  strategy: "Strategy",
  casual: "Casual",
};

export interface Game {
  /** Stable unique identifier, independent from the slug. */
  id: string;
  /** URL-safe unique slug used in /game/[slug]. */
  slug: string;
  title: string;
  description: string;
  category: GameCategory;
  /** Path to a thumbnail image under /public, e.g. "/images/games/snake-arena.svg". */
  thumbnail: string;
  /** Path or URL to the actual playable entry point (local HTML5 game or approved external iframe). */
  gameUrl: string;
  featured: boolean;
  /** ISO-8601 date string. */
  publishedAt: string;
  controls?: string;
  orientation?: "landscape" | "portrait" | "any";
  /** Where this game's code originates from (repo URL, or "Original, built for AR Game"). */
  source: string;
  /** SPDX-style license identifier verified against the source, e.g. "MIT". */
  license: string;
}
