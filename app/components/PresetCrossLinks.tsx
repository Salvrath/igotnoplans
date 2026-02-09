import { PRESETS, type PresetSlug } from "@/lib/presets";

const ORDER: PresetSlug[] = [
  "tonight",
  "date",
  "with-friends",
  "solo",
  "family",
  "indoor",
  "outdoor",
  "low-budget",
] as PresetSlug[];

function titleizeLabel(slug: PresetSlug) {
  return PRESETS[slug]?.label ?? slug;
}

export default function PresetCrossLinks({
  citySlug,
  cityName,
  current,
  limit = 8,
}: {
  citySlug: string;
  cityName: string;
  current: PresetSlug;
  limit?: number;
}) {
  const items = ORDER.filter((p) => p !== current).slice(0, limit);

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
      <h3 className="text-lg font-semibold">Try also</h3>
      <p className="mt-2 text-sm text-zinc-400">
        More presets for <span className="text-zinc-200">{cityName}</span>.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((p) => (
          <a
            key={p}
            href={`/things-to-do-in/${citySlug}/${p}`}
            className="rounded-full border border-zinc-800 bg-zinc-900/30 px-3 py-1 text-sm text-zinc-200 hover:bg-zinc-900"
          >
            {titleizeLabel(p)}
          </a>
        ))}
      </div>
    </section>
  );
}
