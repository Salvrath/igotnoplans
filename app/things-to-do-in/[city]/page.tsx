import ClientPage from "./ClientPage";
import NearbyCities from "@/app/components/NearbyCities";
import { CITY_GEO, SEED_CITIES, type CitySlug } from "@/lib/cities";
import { getNearbyCities } from "@/lib/nearby";
import { notFound } from "next/navigation";
import PopularSearches from "@/app/components/PopularSearches";
import CityPresets from "@/app/components/CityPresets";

type Params = { city?: string };
type Props = { params: Params | Promise<Params> };

async function unwrapParams(p: Props["params"]): Promise<Params> {
  return (p as any)?.then ? await (p as Promise<Params>) : (p as Params);
}

function getCitySlug(paramsCity?: string): CitySlug {
  const raw = decodeURIComponent(paramsCity ?? "").trim().toLowerCase();
  const slug = (raw || "stockholm") as CitySlug;
  if (!SEED_CITIES.includes(slug)) notFound();
  return slug;
}

export async function generateMetadata({ params }: Props) {
  const p = await unwrapParams(params);
  const citySlug = getCitySlug(p.city);
  const cityTitle = CITY_GEO[citySlug]?.name ?? citySlug;

  const canonical = `https://igotnoplans.com/things-to-do-in/${citySlug}`;

  return {
    title: `Things to do in ${cityTitle} | I Got No Plans`,
    description: `No plans in ${cityTitle}? Get instant ideas for dates, friends, solo and family.`,
    alternates: { canonical },
    openGraph: {
      title: `Things to do in ${cityTitle} | I Got No Plans`,
      description: `No plans in ${cityTitle}? Get instant ideas for dates, friends, solo and family.`,
      url: canonical,
      siteName: "I Got No Plans",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Things to do in ${cityTitle} | I Got No Plans`,
      description: `No plans in ${cityTitle}? Get instant ideas for dates, friends, solo and family.`,
    },
  };
}

export default async function Page({ params }: Props) {
  const p = await unwrapParams(params);
  const citySlug = getCitySlug(p.city);
  const cityTitle = CITY_GEO[citySlug]?.name ?? citySlug;

  const nearby = getNearbyCities(citySlug, 8);

  return (
    <ClientPage
      below={
        <>
          <PopularSearches citySlug={citySlug} cityName={cityTitle} />
          <CityPresets citySlug={citySlug} cityName={cityTitle} limit={10} />
          <NearbyCities currentCityName={cityTitle} items={nearby} />
        </>
      }
    />
  );
}
