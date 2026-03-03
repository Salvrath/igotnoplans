// app/things-to-do-in/[city]/[preset]/page.tsx

import ClientPresetPage from "./ClientPresetPage";
import NearbyCities from "@/app/components/NearbyCities";
import PopularSearches from "@/app/components/PopularSearches";
import CityPresets from "@/app/components/CityPresets";
import PresetSeoBlocks from "@/app/components/seo/PresetSeoBlocks";

import { CITY_GEO, SEED_CITIES, type CitySlug } from "@/lib/cities";
import { getNearbyCities } from "@/lib/nearby";
import { notFound } from "next/navigation";
import { PRESETS, isPresetSlug, type PresetSlug } from "@/lib/presets";

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

/**
 * Stable pseudo-random number per page for CTR-friendly titles.
 * Important: stable per (city,preset) so titles don't change over time.
 */
function titleNumber(city: string, preset: PresetSlug): number {
  const seed = `${city}:${preset}`;
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;

  const ranges: Partial<Record<PresetSlug, [number, number]>> = {
    tonight: [9, 17],
    date: [15, 27],
    "with-friends": [17, 33],
    solo: [13, 25],
    family: [15, 29],
    indoor: [17, 35],
    outdoor: [15, 31],
    "low-budget": [17, 35],
    "high-budget": [13, 27],
    "half-day": [15, 29],
    "full-day": [17, 33],
  };

  const [min, max] = ranges[preset] ?? [15, 29];
  const span = max - min + 1;
  return min + (h % span);
}

function titleTemplate(cityName: string, preset: PresetSlug, n: number) {
  switch (preset) {
    case "date":
      return `${n} Romantic Date Ideas in ${cityName} (Local Spots)`;
    case "indoor":
      return `${n} Indoor Things to Do in ${cityName} (Rain-Proof Ideas)`;
    case "solo":
      return `${n} Solo Things to Do in ${cityName} (Hidden Gems)`;
    case "with-friends":
      return `${n} Things to Do in ${cityName} with Friends (Fun Ideas)`;
    case "family":
      return `${n} Family Things to Do in ${cityName} (Kid-Friendly)`;
    case "tonight":
      return `${n} Things to Do Tonight in ${cityName} (Quick Ideas)`;
    case "outdoor":
      return `${n} Outdoor Things to Do in ${cityName} (Best Picks)`;
    default:
      return `Things to do in ${cityName}`;
  }
}

function descriptionTemplate(cityName: string, preset: PresetSlug) {
  switch (preset) {
    case "date":
      return `No plans in ${cityName}? Try these romantic date ideas with local spots, simple steps, and options for any budget.`;
    case "indoor":
      return `No plans in ${cityName}? Here are indoor activities for rainy days, cozy nights, and easy plans you can do today.`;
    case "solo":
      return `No plans in ${cityName}? Solo-friendly ideas with calm options, hidden gems, and quick plans you can do alone.`;
    case "with-friends":
      return `No plans in ${cityName}? Fun things to do with friends — from low-key hangouts to more active plans.`;
    case "family":
      return `No plans in ${cityName}? Family-friendly activities with simple steps, indoor/outdoor options, and flexible budgets.`;
    case "tonight":
      return `No plans tonight in ${cityName}? Quick ideas you can do within a few hours — low effort, high payoff.`;
    case "outdoor":
      return `No plans in ${cityName}? Outdoor ideas for fresh air, scenic walks, and active plans — with simple steps.`;
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

  // Keep PRESETS import in file (used elsewhere + future extensibility)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const presetCfg = PRESETS[presetSlug];

  const n = titleNumber(citySlug, presetSlug);
  const titleCore = titleTemplate(cityTitle, presetSlug, n);

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
      {/* ✅ Server-renderad SEO (syns för Google) */}
      <PresetSeoBlocks city={citySlug} preset={presetSlug} />

      {/* Dina befintliga block */}
      <PopularSearches citySlug={citySlug} cityName={cityTitle} />
      <CityPresets citySlug={citySlug} cityName={cityTitle} limit={10} />
      <NearbyCities currentCityName={cityTitle} items={nearby} />
    </>
  );

  return <ClientPresetPage below={below} />;
}