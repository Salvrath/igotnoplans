import Link from "next/link";
import { SEED_CITIES, CITY_GEO, type CitySlug } from "@/lib/cities";
import CityPresets from "@/app/components/CityPresets";
import PopularSearches from "@/app/components/PopularSearches";

function pickTopCities(n: number) {
  return (SEED_CITIES.slice(0, n) as CitySlug[]).map((slug) => ({
    slug,
    name: CITY_GEO[slug]?.name ?? slug,
  }));
}

export default function HomeSeoBlocks() {
  const top = pickTopCities(12);

  return (
    <div className="space-y-6">
      {/* Popular cities */}
      <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
        <h2 className="text-lg font-semibold">Popular cities</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {top.map((c) => (
            <Link
              key={c.slug}
              href={`/things-to-do-in/${c.slug}`}
              className="rounded-full border border-zinc-800 bg-zinc-900/30 px-3 py-1 text-sm text-zinc-200 hover:bg-zinc-900"
            >
              Things to do in {c.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Popular searches – använder din befintliga komponent (med default city) */}
      <PopularSearches citySlug="stockholm" cityName="Stockholm" />

      {/* Explore ideas – via CityPresets (som du redan har) */}
      <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
        <h2 className="text-lg font-semibold">Explore ideas</h2>
        <p className="mt-1 text-sm text-zinc-400">
          Jump straight into common plans (try Stockholm first).
        </p>
        <div className="mt-4">
          <CityPresets citySlug="stockholm" cityName="Stockholm" limit={12} />
        </div>
      </section>

      {/* CTA till Cities hub */}
      <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
        <h2 className="text-lg font-semibold">All cities</h2>
        <p className="mt-1 text-sm text-zinc-400">Want everything in one place?</p>
        <div className="mt-4">
          <Link
            href="/cities"
            className="inline-flex rounded-xl border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-50 hover:bg-zinc-900"
          >
            Go to Cities →
          </Link>
        </div>
      </section>
    </div>
  );
}
