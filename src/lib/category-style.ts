import type { GameCategory } from "./types";

/**
 * One accent colour per category, used on cards, pills, and category tiles.
 *
 * Colours come from the CSS custom properties in globals.css so the palette
 * lives in one place. `text` is always near-black because every accent here
 * is a bright, high-luminance colour; white text on them fails contrast.
 */
export const CATEGORY_COLOR: Record<GameCategory, string> = {
  action: "var(--cat-action)",
  arcade: "var(--cat-arcade)",
  puzzle: "var(--cat-puzzle)",
  racing: "var(--cat-racing)",
  sports: "var(--cat-sports)",
  adventure: "var(--cat-adventure)",
  strategy: "var(--cat-strategy)",
  casual: "var(--cat-casual)",
};

/** Emoji glyph per category. Decorative only, always aria-hidden. */
export const CATEGORY_GLYPH: Record<GameCategory, string> = {
  action: "💥",
  arcade: "👾",
  puzzle: "🧩",
  racing: "🏁",
  sports: "🎱",
  adventure: "🗺️",
  strategy: "♟️",
  casual: "🎲",
};
