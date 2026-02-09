import ClientPresetPage from "./ClientPresetPage";
import NearbyCities from "@/app/components/NearbyCities";
import PopularSearches from "@/app/components/PopularSearches";
import { CITY_GEO, SEED_CITIES, type CitySlug } from "@/lib/cities";
import { getNearbyCities } from "@/lib/nearby";
import { PRESETS, isPresetSlug, type PresetSlug } from "@/lib/presets";
import { notFound } from "next/navigation";
import CityPresets from "@/app/components/CityPresets";

type Params = { city?: string; preset?: string };
type Props = { params: Params | Promise<Params> };

async function unwrapParams(p: Props["params"]): Promise<Params> {
  return (p as any)?.then ? await (p as Promise<Params>) : (p as Params);
}

function getCitySlug(x?: string): CitySlug {
  const raw = decodeURIComponent(x ?? "").trim().toLowerCase();
  const slug = (raw || "stockholm") as CitySlug;
  if (!SEED_CITIES.includes(slug)) notFound();
  return slug;
}

function getPresetSlug(x?: string): PresetSlug {
  const raw = decodeURIComponent(x ?? "").trim().toLowerCase();
  if (!raw || !isPresetSlug(raw)) notFound();
  return raw;
}

export async function generateMetadata({ params }: Props) {
  const p = await unwrapParams(params);
  const citySlug = getCitySlug(p.city);
  const presetSlug = getPresetSlug(p.preset);

  const cityTitle = CITY_GEO[citySlug]?.name ?? citySlug;
  const preset = PRESETS[presetSlug];

  const canonical = `https://igotnoplans.com/things-to-do-in/${citySlug}/${presetSlug}`;

  const title = `Things to do in ${cityTitle} ${preset.titleSuffix} | I Got No Plans`;
  const description = `No plans in ${cityTitle}? Get instant ${preset.label.toLowerCase()} ideas for dates, friends, solo and family.`;

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

  return (
    <>
      <ClientPresetPage />
      <div className="mx-auto max-w-3xl px-4 pb-10">
        <PopularSearches citySlug={citySlug} cityName={cityTitle} />
        <CityPresets citySlug={citySlug} cityName={cityTitle} limit={10} />
        <NearbyCities currentCityName={cityTitle} items={nearby} />
      </div>
    </>
  );
}
