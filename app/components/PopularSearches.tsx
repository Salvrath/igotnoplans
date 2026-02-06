import Link from "next/link";

type Props = {
  citySlug: string;
  cityName: string;
};

export default function PopularSearches({ citySlug, cityName }: Props) {
  const items = [
    {
      label: `Things to do in ${cityName} tonight`,
      href: `/things-to-do-in/${citySlug}?time=tonight`,
    },
    {
      label: `Date ideas in ${cityName}`,
      href: `/things-to-do-in/${citySlug}?useCase=date`,
    },
    {
      label: `Things to do in ${cityName} with friends`,
      href: `/things-to-do-in/${citySlug}?useCase=friends`,
    },
    {
      label: `Free things to do in ${cityName}`,
      href: `/things-to-do-in/${citySlug}?budget=low`,
    },
    {
      label: `Indoor activities in ${cityName}`,
      href: `/things-to-do-in/${citySlug}?place=indoor`,
    },
  ];

  return (
    <section className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
      <h2 className="text-lg font-semibold">
        Popular searches in {cityName}
      </h2>

      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-zinc-200 hover:underline"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
