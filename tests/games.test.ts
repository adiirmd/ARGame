import { test } from "node:test";
import assert from "node:assert/strict";
import { games, getAllGames, getGameBySlug, getGamesByCategory, getFeaturedGames } from "../src/data/games";
import { GAME_CATEGORIES, isGameCategory } from "../src/lib/types";

test("games catalog is non-empty", () => {
  assert.ok(games.length > 0, "expected at least one game in the catalog");
});

test("every game has a unique slug", () => {
  const slugs = games.map((g) => g.slug);
  const unique = new Set(slugs);
  assert.equal(unique.size, slugs.length, "duplicate slugs found");
});

test("every game has a valid category", () => {
  for (const g of games) {
    assert.ok(
      (GAME_CATEGORIES as readonly string[]).includes(g.category),
      `invalid category for ${g.slug}: ${g.category}`,
    );
  }
});

test("every game has source and license metadata", () => {
  for (const g of games) {
    assert.ok(g.source && g.source.trim().length > 0, `missing source for ${g.slug}`);
    assert.ok(g.license && g.license.trim().length > 0, `missing license for ${g.slug}`);
  }
});

test("getGameBySlug returns the correct game", () => {
  const first = games[0];
  const found = getGameBySlug(first.slug);
  assert.equal(found?.id, first.id);
});

test("getGameBySlug returns undefined for unknown slug", () => {
  assert.equal(getGameBySlug("does-not-exist"), undefined);
});

test("getGamesByCategory only returns matching games", () => {
  const puzzleGames = getGamesByCategory("puzzle");
  for (const g of puzzleGames) {
    assert.equal(g.category, "puzzle");
  }
});

test("getFeaturedGames only returns featured games", () => {
  for (const g of getFeaturedGames()) {
    assert.equal(g.featured, true);
  }
});

test("getAllGames returns every game", () => {
  assert.equal(getAllGames().length, games.length);
});

test("isGameCategory rejects invalid categories", () => {
  assert.equal(isGameCategory("not-a-category"), false);
  assert.equal(isGameCategory("puzzle"), true);
});
