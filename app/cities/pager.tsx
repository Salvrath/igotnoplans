import { SEED_CITIES, titleizeCity } from "@/lib/cities";

export const metadata = {
  title: "Cities | I Got No Plans",
  description: "Pick a city and get instant ideas for dates, friends, solo and family.",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="text-sm text-zinc-400">igotnoplans.com</div>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">Cities</h1>
        <p className="mt-3 text-zinc-300">
          Pick a city to get instant ideas. (You can always change city inside the generator.)
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {SEED_CITIES.map((slug) => (
            <a
              key={slug}
              href={`/things-to-do-in/${slug}`}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 hover:bg-zinc-900"
            >
              <div className="text-lg font-medium">{titleizeCity(slug)}</div>
              <div className="mt-1 text-sm text-zinc-400">
                Things to do in {titleizeCity(slug)}
              </div>
            </a>
          ))}
        </div>

        <footer className="mt-10 text-xs text-zinc-500">© {new Date().getFullYear()} igotnoplans.com</footer>
      </div>
    </main>
  );
}
