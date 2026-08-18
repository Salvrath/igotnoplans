// app/sitemap.ts

import { SEED_CITIES, CITY_GEO } from "@/lib/cities";

/**
 * Sitemap strategy:
 * - Include only clean, canonical indexable routes.
 * - Keep all city and preset landing pages discoverable.
 * - Include geographic hubs.
 * - Omit synthetic lastModified/changeFrequency/priority values.
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

  const staticRoutes = [
    "",
    "/date-ideas",
    "/friends",
    "/solo",
    "/family",
    "/tonight",
    "/cities",
    "/countries",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
  }));

  const countryRoutes = getCountrySlugs().map((country) => ({
    url: `${baseUrl}/countries/${country}`,
  }));

  const cityRoutes = SEED_CITIES.map((city) => ({
    url: `${baseUrl}/things-to-do-in/${city}`,
  }));

  const presetRoutes = SEED_CITIES.flatMap((city) =>
    PRESET_SLUGS.map((preset) => ({
      url: `${baseUrl}/things-to-do-in/${city}/${preset}`,
    }))
  );

  return [...staticRoutes, ...countryRoutes, ...cityRoutes, ...presetRoutes];
}
