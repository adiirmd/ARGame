import type { Game } from "@/lib/types";

/**
 * Game catalog for AR Game.
 *
 * Legality note (see PRD): every entry here is either an original game built
 * for this project, or a vendored copy of an explicitly open-source project
 * whose license was verified against its upstream LICENSE file before being
 * copied into /public/games. No game is scraped, mirrored, or copied from
 * Friv, CrazyGames, Poki, Games.co.id, or any other portal without
 * permission. See each entry's `source` and `license` fields.
 */
export const games: Game[] = [
  {
    id: "g-2048",
    slug: "2048",
    title: "2048",
    description:
      "Slide numbered tiles on a grid and combine matching values to reach the legendary 2048 tile. A fast, minimalist puzzle classic you can pick up in seconds.",
    category: "puzzle",
    thumbnail: "/images/games/2048.svg",
    gameUrl: "/games/2048/index.html",
    featured: true,
    publishedAt: "2026-09-26",
    controls: "Arrow keys or WASD on desktop; swipe on touchscreens.",
    orientation: "any",
    source: "https://github.com/gabrielecirulli/2048",
    license: "MIT",
  },
  {
    id: "g-snake-arena",
    slug: "snake-arena",
    title: "Snake Arena",
    description:
      "The classic snake game, rebuilt for AR Game: eat food, grow longer, and avoid crashing into the walls or your own tail. Simple to learn, tough to master.",
    category: "arcade",
    thumbnail: "/images/games/snake-arena.svg",
    gameUrl: "/games/snake-arena/index.html",
    featured: true,
    publishedAt: "2026-09-26",
    controls: "Arrow keys / WASD, on-screen D-pad on mobile, or swipe.",
    orientation: "any",
    source: "Original, built for AR Game",
    license: "MIT (project license, see repository LICENSE)",
  },
  {
    id: "g-mind-tiles",
    slug: "mind-tiles",
    title: "Mind Tiles",
    description:
      "A cozy memory-matching game: flip tiles two at a time and find every pair in as few moves as possible. Great for a quick brain break.",
    category: "casual",
    thumbnail: "/images/games/mind-tiles.svg",
    gameUrl: "/games/mind-tiles/index.html",
    featured: true,
    publishedAt: "2026-09-26",
    controls: "Tap or click tiles; keyboard-accessible via Tab + Enter.",
    orientation: "any",
    source: "Original, built for AR Game",
    license: "MIT (project license, see repository LICENSE)",
  },
  {
    id: "g-reflex-rush",
    slug: "reflex-rush",
    title: "Reflex Rush",
    description:
      "A 30-second reflex challenge: tap the glowing targets as fast as you can before time runs out and rack up the highest score you can.",
    category: "action",
    thumbnail: "/images/games/reflex-rush.svg",
    gameUrl: "/games/reflex-rush/index.html",
    featured: false,
    publishedAt: "2026-09-26",
    controls: "Tap or click the orange targets as they appear.",
    orientation: "any",
    source: "Original, built for AR Game",
    license: "MIT (project license, see repository LICENSE)",
  },
  {
    id: "g-climb-racing",
    slug: "climb-racing",
    title: "Hill Climb Racing",
    description:
      "Gas and brake your way across endless procedurally-generated hills. Keep your fuel topped up, collect coins, and don't flip over. Go too long upside down and it's game over.",
    category: "racing",
    thumbnail: "/images/games/climb-racing.svg",
    gameUrl: "/games/climb-racing/index.html",
    featured: true,
    publishedAt: "2026-09-26",
    controls: "Right/D to gas, Left/A to brake, or on-screen buttons on mobile.",
    orientation: "landscape",
    source: "https://github.com/vibeopsde/vibeClimbRacing",
    license: "MIT",
  },
  {
    id: "g-fish-eater",
    slug: "fish-eater",
    title: "Fish Eater",
    description:
      "Eat fish smaller than you to grow bigger, avoid anything larger, and rule the pond. A classic feeding-frenzy style arcade game.",
    category: "arcade",
    thumbnail: "/images/games/fish-eater.svg",
    gameUrl: "/games/fish-eater/index.html",
    featured: true,
    publishedAt: "2026-09-26",
    controls: "Arrow keys, WASD, mouse, or touch to swim.",
    orientation: "any",
    source: "https://github.com/duckbrain/fish-eater",
    license: "MIT",
  },
  {
    id: "g-tower-defense",
    slug: "tower-defense",
    title: "HTML5 Tower Defense",
    description:
      "A classic tower defense game. Place towers along the path to stop waves of enemies from reaching the end. Fully drawn with HTML5, no image assets needed.",
    category: "strategy",
    thumbnail: "/images/games/tower-defense.svg",
    gameUrl: "/games/tower-defense/index.html",
    featured: false,
    publishedAt: "2026-09-26",
    controls: "Mouse/tap to place and upgrade towers.",
    orientation: "any",
    source: "https://github.com/bubbafat/html5-tower-defense (originally by oldj/html5-tower-defense)",
    license: "MIT",
  },
  {
    id: "g-pimenta",
    slug: "pimenta",
    title: "Pimenta Sky Defender",
    description:
      "A cute retro vertical-scrolling shooter starring a chili pepper pilot defending the sky from food invaders. Collect power-ups and chain kills for combo points.",
    category: "action",
    thumbnail: "/images/games/pimenta.svg",
    gameUrl: "/games/pimenta/index.html",
    featured: false,
    publishedAt: "2026-09-26",
    controls: "Arrow keys or WASD to move, Space to shoot; touch controls on mobile.",
    orientation: "portrait",
    source: "https://github.com/izag8216/pimenta",
    license: "MIT",
  },
  {
    id: "g-flappy-bird",
    slug: "flappy-bird",
    title: "Flappy Bird",
    description:
      "The addictive classic: tap to flap and thread your bird through an endless series of pipes. One touch, one mistake, one more try.",
    category: "arcade",
    thumbnail: "/images/games/flappy-bird.svg",
    gameUrl: "/games/flappy-bird/index.html",
    featured: true,
    publishedAt: "2026-09-26",
    controls: "Space, click, or tap to flap.",
    orientation: "any",
    source: "https://github.com/vedantmerc/flappy-bird",
    license: "MIT",
  },
  {
    id: "g-endless-runner",
    slug: "endless-runner",
    title: "Endless Runner",
    description:
      "A Chrome-Dino-style endless runner: jump the obstacles, survive as long as you can, and beat your own high score.",
    category: "casual",
    thumbnail: "/images/games/endless-runner.svg",
    gameUrl: "/games/endless-runner/index.html",
    featured: false,
    publishedAt: "2026-09-26",
    controls: "Space, Up arrow, or tap to jump.",
    orientation: "any",
    source: "https://github.com/Zazilicious/endless_runner",
    license: "GPL-3.0",
  },
];

export function getAllGames(): Game[] {
  return games;
}

export function getGameBySlug(slug: string): Game | undefined {
  return games.find((g) => g.slug === slug);
}

export function getGamesByCategory(category: string): Game[] {
  return games.filter((g) => g.category === category);
}

export function getFeaturedGames(): Game[] {
  return games.filter((g) => g.featured);
}

export function getRecentGames(limit = 8): Game[] {
  return [...games]
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .slice(0, limit);
}
