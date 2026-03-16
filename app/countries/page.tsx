// app/countries/page.tsx

import { getCountryEntries } from "@/lib/country-hubs";

export const metadata = {
  title: "Countries | I Got No Plans",
  description:
    "Browse countries and jump into city-based things to do, from date ideas to indoor plans and low-budget activities.",
};

export default function CountriesPage() {
  const countries = getCountryEntries();

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <header className="mb-8">
          <div className="text-sm text-zinc-400">igotnoplans.com</div>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">Countries</h1>
          <p className="mt-3 text-zinc-300">
            Browse country hubs and discover city pages for dates, indoor activities,
            low-budget plans, solo ideas, and more.
          </p>
        </header>

        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="text-lg font-semibold">All country hubs</h2>
            <div className="text-sm text-zinc-400">{countries.length} countries</div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {countries.map((country) => (
              <a
                key={country.code}
                href={`/countries/${country.slug}`}
                className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4 hover:bg-zinc-900"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <div className="font-semibold">{country.name}</div>
                  <div className="text-xs text-zinc-400">{country.code}</div>
                </div>
                <div className="mt-2 text-sm text-zinc-400">
                  {country.cityCount} cities
                </div>
              </a>
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