import { SEED_CITIES, CITY_GEO, type CitySlug } from "@/lib/cities";
import { distanceKm } from "@/lib/geo";

export type NearbyCity = {
  slug: CitySlug;
  name: string;
  country: string;
  lat: number;
  lng: number;
  distKm: number;
};

export function getNearbyCities(currentSlug: CitySlug, limit = 8): NearbyCity[] {
  const current = CITY_GEO[currentSlug];
  if (!current) return [];

  const currentPos = { lat: current.lat, lng: current.lng };

  return SEED_CITIES
    .filter((slug) => slug !== currentSlug)
    .map((slug) => {
      const c = CITY_GEO[slug];
      const distKm = distanceKm(currentPos, { lat: c.lat, lng: c.lng });
      return {
        slug,
        name: c.name,
        country: c.country,
        lat: c.lat,
        lng: c.lng,
        distKm,
      };
    })
    .sort((a, b) => a.distKm - b.distKm)
    .slice(0, limit);
}
