import ClientPage from "@/app/things-to-do-in/[city]/ClientPage";
import NearbyCities from "@/app/components/NearbyCities";
import PopularSearches from "@/app/components/PopularSearches";
import CityPresets from "@/app/components/CityPresets";
import { CITY_GEO } from "@/lib/cities";
import { getNearbyCities } from "@/lib/nearby";

export default function HomePage() {
  const citySlug = "stockholm";
  const cityTitle = CITY_GEO[citySlug]?.name ?? "Stockholm";
  const nearby = getNearbyCities(citySlug as any, 8);

  const below = (
    <>
      <PopularSearches citySlug={citySlug as any} cityName={cityTitle} />
      <CityPresets citySlug={citySlug as any} cityName={cityTitle} limit={10} />
      <NearbyCities currentCityName={cityTitle} items={nearby} />
    </>
  );

  return (
    <ClientPage
      below={below}
      headlineOverride="I got no plans."
      subheadlineOverride="Pick a city, mood and time — get a solid idea in seconds."
    />
  );
}
