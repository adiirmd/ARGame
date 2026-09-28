/**
 * Game Validator, dijalankan lewat npm run validate-games
 *
 * Detects: duplicate slug, missing title, missing description, invalid
 * category, missing thumbnail, missing game entry point, invalid URL,
 * missing source, missing license. Exits non-zero if any game is invalid.
 */
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { games } from "../src/data/games";
import { GAME_CATEGORIES } from "../src/lib/types";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, "..", "public");

interface Issue {
  gameId: string;
  message: string;
}

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

function isValidUrlOrPath(v: string): boolean {
  if (v.startsWith("/")) return true;
  try {
    new URL(v);
    return true;
  } catch {
    return false;
  }
}

function localEntryPointExists(gameUrl: string): boolean {
  if (!gameUrl.startsWith("/")) return true; // external URL, can't check filesystem
  const relative = gameUrl.replace(/^\//, "");
  return existsSync(join(PUBLIC_DIR, relative));
}

function localThumbnailExists(thumbnail: string): boolean {
  if (!thumbnail.startsWith("/")) return true; // external URL
  const relative = thumbnail.replace(/^\//, "");
  return existsSync(join(PUBLIC_DIR, relative));
}

function validate(): Issue[] {
  const issues: Issue[] = [];
  const seenSlugs = new Map<string, number>();

  for (const game of games) {
    const label = game.id || game.slug || "(unknown game)";

    if (!isNonEmptyString(game.id)) {
      issues.push({ gameId: label, message: "missing id" });
    }
    if (!isNonEmptyString(game.slug)) {
      issues.push({ gameId: label, message: "missing slug" });
    } else {
      seenSlugs.set(game.slug, (seenSlugs.get(game.slug) ?? 0) + 1);
    }
    if (!isNonEmptyString(game.title)) {
      issues.push({ gameId: label, message: "missing title" });
    }
    if (!isNonEmptyString(game.description)) {
      issues.push({ gameId: label, message: "missing description" });
    }
    if (!(GAME_CATEGORIES as readonly string[]).includes(game.category)) {
      issues.push({
        gameId: label,
        message: `invalid category "${String(game.category)}"`,
      });
    }
    if (!isNonEmptyString(game.thumbnail)) {
      issues.push({ gameId: label, message: "missing thumbnail" });
    } else if (!isValidUrlOrPath(game.thumbnail)) {
      issues.push({ gameId: label, message: "invalid thumbnail URL" });
    } else if (!localThumbnailExists(game.thumbnail)) {
      issues.push({
        gameId: label,
        message: `thumbnail file not found: ${game.thumbnail}`,
      });
    }
    if (!isNonEmptyString(game.gameUrl)) {
      issues.push({ gameId: label, message: "missing game entry point (gameUrl)" });
    } else if (!isValidUrlOrPath(game.gameUrl)) {
      issues.push({ gameId: label, message: `invalid game URL: ${game.gameUrl}` });
    } else if (!localEntryPointExists(game.gameUrl)) {
      issues.push({
        gameId: label,
        message: `game entry point file not found: ${game.gameUrl}`,
      });
    }
    if (!isNonEmptyString(game.source)) {
      issues.push({ gameId: label, message: "missing source" });
    }
    if (!isNonEmptyString(game.license)) {
      issues.push({ gameId: label, message: "missing license" });
    }
  }

  for (const [slug, count] of seenSlugs) {
    if (count > 1) {
      issues.push({ gameId: slug, message: `duplicate slug "${slug}" (${count} occurrences)` });
    }
  }

  return issues;
}

function main() {
  const issues = validate();
  console.log(`Validating ${games.length} games...`);

  if (issues.length === 0) {
    console.log(`✔ All ${games.length} games are valid.`);
    process.exit(0);
  }

  console.error(`✘ Found ${issues.length} issue(s):`);
  for (const issue of issues) {
    console.error(`  - [${issue.gameId}] ${issue.message}`);
  }
  process.exit(1);
}

main();
