import { SEED_CITIES } from "@/lib/cities";

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
  ].map((p) => ({
    url: `${baseUrl}${p}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.8,
  }));

  const cityRoutes = SEED_CITIES.map((city) => ({
    url: `${baseUrl}/things-to-do-in/${city}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...cityRoutes];
}
