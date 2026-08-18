import ClientPage from "./ClientPage";
import NearbyCities from "@/app/components/NearbyCities";
import { CITY_GEO, SEED_CITIES, type CitySlug } from "@/lib/cities";
import { getNearbyCities } from "@/lib/nearby";
import { notFound, permanentRedirect } from "next/navigation";
import PopularSearches from "@/app/components/PopularSearches";
import CityPresets from "@/app/components/CityPresets";
import type { PresetSlug } from "@/lib/presets";

type Params = { city?: string };
type SearchParams = Record<string, string | string[] | undefined>;
type Props = {
  params: Params | Promise<Params>;
  searchParams?: SearchParams | Promise<SearchParams>;
};

async function unwrapParams<T extends object>(p: T | Promise<T>): Promise<T> {
  const maybeThen = (p as unknown as { then?: unknown })?.then;
  if (typeof maybeThen === "function") return await (p as Promise<T>);
  return p as T;
}

async function unwrapSearchParams(
  p?: SearchParams | Promise<SearchParams>
): Promise<SearchParams> {
  if (!p) return {};

  const maybeThen = (p as unknown as { then?: unknown })?.then;
  if (typeof maybeThen === "function") return await (p as Promise<SearchParams>);
  return p as SearchParams;
}

function getCitySlug(paramsCity?: string): CitySlug {
  const raw = decodeURIComponent(paramsCity ?? "").trim().toLowerCase();
  const slug = (raw || "stockholm") as CitySlug;
  if (!SEED_CITIES.includes(slug)) notFound();
  return slug;
}

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function normalize(value: string | undefined) {
  return value?.trim().toLowerCase();
}

/**
 * Maps legacy/simple filter URLs to the clean preset route.
 *
 * Examples:
 *   ?budget=low   -> /low-budget
 *   ?place=indoor -> /indoor
 *   ?useCase=date -> /date
 *
 * We only redirect when exactly one semantic filter is active. Full share URLs
 * contain several filters and must keep their exact configuration, so they stay
 * accessible but point their canonical at the clean city URL.
 */
function getSingleFilterPreset(searchParams: SearchParams): PresetSlug | null {
  const filters: Array<{ key: string; value: string | undefined }> = [
    { key: "useCase", value: normalize(firstValue(searchParams.useCase)) },
    { key: "budget", value: normalize(firstValue(searchParams.budget)) },
    { key: "place", value: normalize(firstValue(searchParams.place)) },
    { key: "mood", value: normalize(firstValue(searchParams.mood)) },
    { key: "time", value: normalize(firstValue(searchParams.time)) },
    { key: "indoor", value: normalize(firstValue(searchParams.indoor)) },
    { key: "outdoor", value: normalize(firstValue(searchParams.outdoor)) },
  ];

  const active = filters.filter(({ value }) => value !== undefined && value !== "");
  if (active.length !== 1) return null;

  const { key, value } = active[0];

  if (key === "useCase") {
    if (value === "date") return "date";
    if (value === "friends" || value === "with-friends") return "with-friends";
    if (value === "solo") return "solo";
    if (value === "family") return "family";
    if (value === "tonight") return "tonight";
  }

  if (key === "budget") {
    if (value === "low") return "low-budget";
    if (value === "high") return "high-budget";
  }

  if (key === "place") {
    if (value === "indoor" || value === "indoors") return "indoor";
    if (value === "outdoor" || value === "outdoors") return "outdoor";
  }

  if (key === "mood") {
    if (value === "romantic") return "romantic";
    if (value === "chill") return "chill";
  }

  if (key === "time") {
    if (value === "tonight") return "tonight";
    if (value === "half-day" || value === "halfday") return "half-day";
    if (value === "full-day" || value === "fullday") return "full-day";
  }

  // Legacy single-toggle URLs seen by Google.
  if (key === "indoor" && (value === "1" || value === "true")) return "indoor";
  if (key === "outdoor" && (value === "1" || value === "true")) return "outdoor";

  return null;
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

export default async function Page({ params, searchParams }: Props) {
  const p = await unwrapParams(params);
  const query = await unwrapSearchParams(searchParams);
  const citySlug = getCitySlug(p.city);

  const presetRedirect = getSingleFilterPreset(query);
  if (presetRedirect) {
    permanentRedirect(`/things-to-do-in/${citySlug}/${presetRedirect}`);
  }

  const cityTitle = CITY_GEO[citySlug]?.name ?? citySlug;
  const nearby = getNearbyCities(citySlug, 8);

  const below = (
    <>
      <PopularSearches citySlug={citySlug} cityName={cityTitle} />
      <CityPresets citySlug={citySlug} cityName={cityTitle} limit={10} />
      <NearbyCities currentCityName={cityTitle} items={nearby} />
    </>
  );

  return <ClientPage below={below} />;
}
