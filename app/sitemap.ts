import { SEED_CITIES } from "@/lib/cities";

/**
 * SEO strategy:
 * - Index all city pages
 * - Index a limited, high-intent set of presets per city
 * - Avoid thin / overexpanded sitemap
 */

const PRESET_SLUGS = [
  "tonight",
  "date",
  "with-friends",
  "solo",
  "family",
  "indoor",
  "outdoor",
  "low-budget",
] as const;

export default function sitemap() {
  const baseUrl = "https://igotnoplans.com";
  const now = new Date().toISOString();

  // Core static pages
  const staticRoutes = [
    "",
    "/date-ideas",
    "/friends",
    "/solo",
    "/family",
    "/tonight",
    "/cities",
  ].map((p) => ({
    url: `${baseUrl}${p}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.8,
  }));

  // /things-to-do-in/{city}
  const cityRoutes = SEED_CITIES.map((city) => ({
    url: `${baseUrl}/things-to-do-in/${city}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // /things-to-do-in/{city}/{preset}
  const presetRoutes = SEED_CITIES.flatMap((city) =>
    PRESET_SLUGS.map((preset) => ({
      url: `${baseUrl}/things-to-do-in/${city}/${preset}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }))
  );

  return [...staticRoutes, ...cityRoutes, ...presetRoutes];
}
