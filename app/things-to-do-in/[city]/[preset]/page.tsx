// app/things-to-do-in/[city]/[preset]/page.tsx

import ClientPresetPage from "./ClientPresetPage";
import NearbyCities from "@/app/components/NearbyCities";
import PopularSearches from "@/app/components/PopularSearches";
import CityPresets from "@/app/components/CityPresets";
import PresetSeoBlocks from "@/app/components/seo/PresetSeoBlocks";

import { CITY_GEO, SEED_CITIES, type CitySlug } from "@/lib/cities";
import { getNearbyCities } from "@/lib/nearby";
import { notFound } from "next/navigation";
import { isPresetSlug, type PresetSlug } from "@/lib/presets";

type Params = { city?: string; preset?: string };
type Props = { params: Params | Promise<Params> };

async function unwrapParams<T extends object>(p: T | Promise<T>): Promise<T> {
  const maybeThen = (p as unknown as { then?: unknown })?.then;
  if (typeof maybeThen === "function") return await (p as Promise<T>);
  return p as T;
}

function getCitySlug(paramsCity?: string): CitySlug {
  const raw = decodeURIComponent(paramsCity ?? "").trim().toLowerCase();
  const slug = (raw || "stockholm") as CitySlug;
  if (!SEED_CITIES.includes(slug)) notFound();
  return slug;
}

function getPresetSlug(paramsPreset?: string): PresetSlug {
  const raw = decodeURIComponent(paramsPreset ?? "").trim().toLowerCase();
  if (!raw || !isPresetSlug(raw)) notFound();
  return raw as PresetSlug;
}

function titleTemplate(cityName: string, preset: PresetSlug) {
  switch (preset) {
    case "date":
      return `Best Date Ideas in ${cityName}: Romantic & Local Spots`;
    case "indoor":
      return `Indoor Things to Do in ${cityName}: Rainy-Day Ideas`;
    case "solo":
      return `Solo Things to Do in ${cityName}: Easy Local Ideas`;
    case "with-friends":
      return `Things to Do in ${cityName} with Friends`;
    case "family":
      return `Family Things to Do in ${cityName}: Kid-Friendly Ideas`;
    case "tonight":
      return `Things to Do Tonight in ${cityName}: Quick Ideas`;
    case "outdoor":
      return `Outdoor Things to Do in ${cityName}: Local Ideas`;
    case "low-budget":
      return `Cheap Things to Do in ${cityName}: Low-Budget Ideas`;
    case "high-budget":
      return `Premium Things to Do in ${cityName}: Special Ideas`;
    case "half-day":
      return `Half-Day Things to Do in ${cityName}: Easy Itinerary Ideas`;
    case "full-day":
      return `Full-Day Things to Do in ${cityName}: Day Plan Ideas`;
    case "romantic":
      return `Romantic Things to Do in ${cityName}: Date Night Ideas`;
    case "chill":
      return `Relaxing Things to Do in ${cityName}: Chill Ideas`;
    default:
      return `Things to Do in ${cityName}`;
  }
}

function descriptionTemplate(cityName: string, preset: PresetSlug) {
  switch (preset) {
    case "date":
      return `Find date ideas in ${cityName}, from relaxed first-date plans to romantic local spots and easy evening ideas.`;
    case "indoor":
      return `Find indoor things to do in ${cityName} for rainy days, cold weather, cozy plans, and easy activities.`;
    case "solo":
      return `Explore solo things to do in ${cityName}, with easy local ideas for relaxed, active, and spontaneous plans.`;
    case "with-friends":
      return `Find fun things to do with friends in ${cityName}, from low-key hangouts to group activities and nights out.`;
    case "family":
      return `Discover family-friendly things to do in ${cityName}, including flexible indoor, outdoor, and budget-friendly ideas.`;
    case "tonight":
      return `No plans tonight in ${cityName}? Find quick ideas you can do within a few hours, from relaxed to spontaneous.`;
    case "outdoor":
      return `Find outdoor things to do in ${cityName}, including walks, active plans, scenic ideas, and easy local activities.`;
    case "low-budget":
      return `Find cheap and low-budget things to do in ${cityName}, including free ideas, affordable activities, and simple plans.`;
    case "high-budget":
      return `Find premium things to do in ${cityName} when you want a more special day, date, or experience.`;
    case "half-day":
      return `Only have half a day in ${cityName}? Find practical ideas and flexible plans that fit into a few hours.`;
    case "full-day":
      return `Plan a full day in ${cityName} with flexible ideas for food, activities, sightseeing, and downtime.`;
    case "romantic":
      return `Find romantic things to do in ${cityName}, with date-night ideas, relaxed plans, and local spots for couples.`;
    case "chill":
      return `Find relaxing things to do in ${cityName}, with low-effort ideas for slow days, quiet plans, and easy downtime.`;
    default:
      return `No plans in ${cityName}? Get instant ideas for dates, friends, solo and family.`;
  }
}

export async function generateMetadata({ params }: Props) {
  const p = await unwrapParams(params);
  const citySlug = getCitySlug(p.city);
  const presetSlug = getPresetSlug(p.preset);
  const cityTitle = CITY_GEO[citySlug]?.name ?? citySlug;

  const canonical = `https://igotnoplans.com/things-to-do-in/${citySlug}/${presetSlug}`;
  const titleCore = titleTemplate(cityTitle, presetSlug);
  const title = `${titleCore} | I Got No Plans`;
  const description = descriptionTemplate(cityTitle, presetSlug);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "I Got No Plans",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function Page({ params }: Props) {
  const p = await unwrapParams(params);
  const citySlug = getCitySlug(p.city);
  const presetSlug = getPresetSlug(p.preset);

  const cityTitle = CITY_GEO[citySlug]?.name ?? citySlug;
  const nearby = getNearbyCities(citySlug, 8);

  const below = (
    <>
      <PresetSeoBlocks city={citySlug} preset={presetSlug} />
      <PopularSearches citySlug={citySlug} cityName={cityTitle} />
      <CityPresets citySlug={citySlug} cityName={cityTitle} limit={30} />
      <NearbyCities currentCityName={cityTitle} items={nearby.slice(0, 5)} />
    </>
  );

  return <ClientPresetPage below={below} />;
}
