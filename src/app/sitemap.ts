import type { MetadataRoute } from "next";
import { getAllGames } from "@/data/games";
import { GAME_CATEGORIES } from "@/lib/types";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, changeFrequency: "daily", priority: 1 },
    { url: `${siteUrl}/games`, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/search`, changeFrequency: "weekly", priority: 0.5 },
    { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${siteUrl}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/terms`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = GAME_CATEGORIES.map((c) => ({
    url: `${siteUrl}/games/${c}`,
    changeFrequency: "daily",
    priority: 0.7,
  }));

  const gameRoutes: MetadataRoute.Sitemap = getAllGames().map((g) => ({
    url: `${siteUrl}/game/${g.slug}`,
    lastModified: g.publishedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes, ...gameRoutes];
}
