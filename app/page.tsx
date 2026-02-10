import IdeaGenerator from "@/app/components/IdeaGenerator";
import PopularSearches from "@/app/components/PopularSearches";
import CityPresets from "@/app/components/CityPresets";
import NearbyCities from "@/app/components/NearbyCities";

import { CITY_GEO } from "@/lib/cities";
import { getNearbyCities } from "@/lib/nearby";

export default function HomePage() {
  // Gör startsidan “lika bra som city-sidan” genom att återanvända Stockholm-data
  const citySlug = "stockholm" as const;
  const cityTitle = CITY_GEO[citySlug]?.name ?? "Stockholm";
  const nearby = getNearbyCities(citySlug, 8);

  const below = (
    <div className="space-y-6">
      <PopularSearches citySlug={citySlug} cityName={cityTitle} />
      <CityPresets citySlug={citySlug} cityName={cityTitle} limit={10} />
      <NearbyCities currentCityName={cityTitle} items={nearby} />
    </div>
  );

  return (
    <IdeaGenerator
      useCase="date"
      headline="I got no plans."
      subheadline="Instant ideas for dates, day trips, and spontaneous fun."
      shareText="No plans? Try this:"
      defaultCity={cityTitle}
      presetDefaults={{
        timeWindow: "tonight",
        budget: "medium",
        mood: "romantic",
        indoorsOk: true,
        outdoorsOk: true,
      }}
      below={below}
    />
  );
}
