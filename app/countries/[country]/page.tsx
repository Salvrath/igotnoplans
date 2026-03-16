// app/countries/[country]/page.tsx

import { notFound } from "next/navigation";
import { CITY_GEO, type CitySlug } from "@/lib/cities";
import {
  getCitiesByCountry,
  getCountryCodeFromSlug,
  getCountryEntries,
  getCountryName,
} from "@/lib/country-hubs";

type Params = { country?: string };
type Props = { params: Params | Promise<Params> };

const POPULAR_PRESETS = [
  { preset: "tonight", label: "Tonight" },
  { preset: "date", label: "Date" },
  { preset: "with-friends", label: "With friends" },
  { preset: "solo", label: "Solo" },
  { preset: "family", label: "Family" },
  { preset: "indoor", label: "Indoor" },
  { preset: "outdoor", label: "Outdoor" },
  { preset: "low-budget", label: "Low budget" },
] as const;

async function unwrapParams<T extends object>(p: T | Promise<T>): Promise<T> {
  const maybeThen = (p as unknown as { then?: unknown })?.then;
  if (typeof maybeThen === "function") return await (p as Promise<T>);
  return p as T;
}

function getCountryOr404(countrySlug?: string) {
  const slug = decodeURIComponent(countrySlug ?? "").trim().toLowerCase();
  if (!slug) notFound();

  const code = getCountryCodeFromSlug(slug);
  const entries = getCountryEntries();
  const exists = entries.some((c) => c.code === code);
  if (!exists) notFound();

  return {
    code,
    slug,
    name: getCountryName(code),
    cities: getCitiesByCountry(code),
  };
}

function cityName(slug: CitySlug) {
  return CITY_GEO[slug]?.name ?? slug;
}

export async function generateMetadata({ params }: Props) {
  const p = await unwrapParams(params);
  const country = getCountryOr404(p.country);

  const canonical = `https://igotnoplans.com/countries/${country.slug}`;

  return {
    title: `Things to Do in ${country.name} Cities | I Got No Plans`,
    description: `Browse cities in ${country.name} and jump straight into date ideas, indoor activities, low-budget plans, and more.`,
    alternates: { canonical },
    openGraph: {
      title: `Things to Do in ${country.name} Cities | I Got No Plans`,
      description: `Browse cities in ${country.name} and jump straight into date ideas, indoor activities, low-budget plans, and more.`,
      url: canonical,
      siteName: "I Got No Plans",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Things to Do in ${country.name} Cities | I Got No Plans`,
      description: `Browse cities in ${country.name} and jump straight into date ideas, indoor activities, low-budget plans, and more.`,
    },
  };
}

export default async function CountryPage({ params }: Props) {
  const p = await unwrapParams(params);
  const country = getCountryOr404(p.country);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <header className="mb-8">
          <div className="text-sm text-zinc-400">igotnoplans.com</div>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            Things to do in {country.name}
          </h1>
          <p className="mt-3 text-zinc-300">
            Explore city pages in {country.name} and jump into presets like Tonight,
            Date, Indoor, Solo, Family, and Low budget.
          </p>
        </header>

        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="text-lg font-semibold">Cities in {country.name}</h2>
            <div className="text-sm text-zinc-400">{country.cities.length} cities</div>
          </div>

          <div className="mt-4 space-y-4">
            {country.cities.map((city) => (
              <div
                key={city}
                className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <div className="font-semibold">{cityName(city)}</div>
                  <a
                    href={`/things-to-do-in/${city}`}
                    className="text-sm text-zinc-300 underline-offset-4 hover:underline"
                  >
                    All ideas →
                  </a>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {POPULAR_PRESETS.map((pItem) => (
                    <a
                      key={pItem.preset}
                      href={`/things-to-do-in/${city}/${pItem.preset}`}
                      className="rounded-full border border-zinc-800 bg-zinc-900/30 px-3 py-1 text-sm text-zinc-200 hover:bg-zinc-900"
                    >
                      {pItem.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className="mt-10 text-xs text-zinc-500">
          © {new Date().getFullYear()} igotnoplans.com
        </footer>
      </div>
    </main>
  );
}