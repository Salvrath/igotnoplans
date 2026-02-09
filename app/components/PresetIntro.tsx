import { PRESETS, type PresetSlug } from "@/lib/presets";

export default function PresetIntro({
  cityName,
  preset,
}: {
  cityName: string;
  preset: PresetSlug;
}) {
  const p = PRESETS[preset];

  return (
    <section className="mt-2 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
      <h2 className="text-lg font-semibold">
        {p.label} in {cityName}
      </h2>

      <p className="mt-2 text-zinc-300">
        Looking for things to do in <span className="text-zinc-100">{cityName}</span>{" "}
        {p.titleSuffix.replace(".", "").toLowerCase()}? These ideas are designed to be quick to execute,
        flexible, and easy to share.
      </p>

      <p className="mt-2 text-zinc-300">
        Use the filters to match your mood and budget, generate a new idea, and share a link that keeps the
        exact settings.
      </p>

      <div className="mt-3 text-sm text-zinc-400">
        Tip: Try a couple of rerolls — most people find a “yes” within 2–3.
      </div>
    </section>
  );
}
