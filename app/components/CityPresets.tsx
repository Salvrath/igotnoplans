import Link from "next/link";
import { PRESETS } from "@/lib/presets";

type Props = {
  citySlug: string;
  cityName: string;
  limit?: number; // hur många presets du vill visa (default 10)
};

export default function CityPresets({ citySlug, cityName, limit = 10 }: Props) {
  const items = Object.entries(PRESETS).slice(0, limit);

  if (!items.length) return null;

  return (
    <section className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
      <h2 className="text-lg font-semibold">Explore more in {cityName}</h2>
      <p className="mt-1 text-sm text-zinc-400">
        Jump straight to common plans.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {items.map(([presetSlug, preset]) => (
          <Link
            key={presetSlug}
            href={`/things-to-do-in/${citySlug}/${presetSlug}`}
            className="rounded-full border border-zinc-700 bg-zinc-950/40 px-3 py-1 text-sm text-zinc-100 hover:bg-zinc-800/40"
          >
            {preset.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
