import { SEED_CITIES, CITY_GEO, type CitySlug } from "@/lib/cities";

export const metadata = {
  title: "Cities | I Got No Plans",
  description:
    "Browse cities and discover instant ideas for tonight, dates, friends, solo and family.",
};

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

const FEATURED_CITIES: CitySlug[] = [
  "stockholm",
  "london",
  "paris",
  "berlin",
  "new-york",
  "los-angeles",
  "miami",
  "san-francisco",
];

/** Helpers */
function cityName(slug: CitySlug) {
  return CITY_GEO[slug]?.name ?? slug;
}

export default function CitiesPage() {
  const featured = FEATURED_CITIES.filter((c) => SEED_CITIES.includes(c));
  const all = SEED_CITIES.slice().sort((a, b) => cityName(a).localeCompare(cityName(b)));

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <header className="mb-8">
          <div className="text-sm text-zinc-400">igotnoplans.com</div>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">Cities</h1>
          <p className="mt-3 text-zinc-300">
            Pick a city — or jump straight into popular presets like “Tonight” or “With friends”.
          </p>
        </header>

        {/* Popular presets hub (crawl booster) */}
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
          <h2 className="text-lg font-semibold">Popular right now</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Quick links to high-intent pages. Great for discoverability and sharing.
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {featured.map((city) => (
              <div
                key={city}
                className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <div className="text-base font-semibold">{cityName(city)}</div>
                  <a
                    href={`/things-to-do-in/${city}`}
                    className="text-sm text-zinc-300 underline-offset-4 hover:underline"
                  >
                    All ideas →
                  </a>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {POPULAR_PRESETS.map((p) => (
                    <a
                      key={p.preset}
                      href={`/things-to-do-in/${city}/${p.preset}`}
                      className="rounded-full border border-zinc-800 bg-zinc-900/30 px-3 py-1 text-sm text-zinc-200 hover:bg-zinc-900"
                    >
                      {p.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* All cities */}
        <section className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="text-lg font-semibold">Browse all cities</h2>
            <div className="text-sm text-zinc-400">{all.length} cities</div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {all.map((slug) => (
              <a
                key={slug}
                href={`/things-to-do-in/${slug}`}
                className="rounded-xl border border-zinc-800 bg-zinc-950/40 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-900"
              >
                {cityName(slug)}
              </a>
            ))}
          </div>
        </section>

        <footer className="mt-10 text-xs text-zinc-500">© {new Date().getFullYear()} igotnoplans.com</footer>
      </div>
    </main>
  );
}
