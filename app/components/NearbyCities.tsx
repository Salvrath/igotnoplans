import Link from "next/link";
import type { NearbyCity } from "@/lib/nearby";

type Props = {
  currentCityName: string;
  items: NearbyCity[];
};

export default function NearbyCities({ currentCityName, items }: Props) {
  if (!items?.length) return null;

  return (
    <section className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
      <h2 className="text-lg font-semibold">
        Nearby cities from {currentCityName}
      </h2>
      <p className="mt-1 text-sm text-zinc-400">
        More ideas if you&apos;re flexible with location.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((c) => (
          <Link
            key={c.slug}
            href={`/things-to-do-in/${c.slug}`}
            className="rounded-full border border-zinc-700 bg-zinc-950/40 px-3 py-1 text-sm text-zinc-100 hover:bg-zinc-800/40"
          >
            {c.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
