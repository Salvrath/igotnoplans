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

export async function generateMetadata({ params }: Props) {
  const p = await unwrapParams(params);
  const citySlug = getCitySlug(p.city);
  const presetSlug = getPresetSlug(p.preset);

  const cityTitle = CITY_GEO[citySlug]?.name ?? citySlug;
  const presetCfg = PRESETS[presetSlug];

  const canonical = `https://igotnoplans.com/things-to-do-in/${citySlug}/${presetSlug}`;

  const title = `Things to do in ${cityTitle} ${presetCfg.titleSuffix}. | I Got No Plans`;
  const description = `No plans in ${cityTitle}? Get instant ${presetCfg.label.toLowerCase()} ideas for ${cityTitle}.`;

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
