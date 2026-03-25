// app/sitemap.ts

import { SEED_CITIES, CITY_GEO } from "@/lib/cities";

/**
 * SEO strategy:
 * - Index all city pages
 * - Index a controlled set of high-intent presets per city
 * - Include crawl hubs (/cities, /countries, /countries/[country])
 */

const PRESET_SLUGS = [
  "tonight",
  "half-day",
  "full-day",
  "date",
  "with-friends",
  "solo",
  "family",
  "indoor",
  "outdoor",
  "low-budget",
  "high-budget",
  "romantic",
  "chill",
] as const;

function getCountrySlugs() {
  return Array.from(
    new Set(SEED_CITIES.map((city) => CITY_GEO[city].country.toLowerCase()))
  ).sort();
}

export default function sitemap() {
  const baseUrl = "https://igotnoplans.com";
  const now = new Date().toISOString();

  const staticRoutes = [
    "",
    "/date-ideas",
    "/friends",
    "/solo",
    "/family",
    "/tonight",
    "/cities",
    "/countries",
  ].map((p) => ({
    url: `${baseUrl}${p}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.8,
  }));

  const countryRoutes = getCountrySlugs().map((country) => ({
    url: `${baseUrl}/countries/${country}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  const cityRoutes = SEED_CITIES.map((city) => ({
    url: `${baseUrl}/things-to-do-in/${city}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const presetRoutes = SEED_CITIES.flatMap((city) =>
    PRESET_SLUGS.map((preset) => ({
      url: `${baseUrl}/things-to-do-in/${city}/${preset}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.6,
    }))
  );

  return [...staticRoutes, ...countryRoutes, ...cityRoutes, ...presetRoutes];
}