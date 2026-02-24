// app/components/seo/PresetSeoBlocks.tsx

import {
  buildFaq,
  buildIntro,
  buildStaticIdeas,
  presetLabel,
  titleCaseCity,
} from "@/lib/seo/preset-seo";

type Props = {
  city: string; // slug, e.g. "valencia"
  preset: string; // slug, e.g. "date"
};

type LocalOverride = {
  title?: string;
  paragraphs?: string[];
};

// 1) Local boosts for winners (keep this small and curated)
const LOCAL_PRESET_OVERRIDES: Record<string, Record<string, LocalOverride>> = {
  leeds: {
    solo: {
      title: "Local solo ideas in Leeds",
      paragraphs: [
        "Exploring Leeds alone? Walk through Roundhay Park, grab coffee around Leeds Dock, or browse the historic Kirkgate Market.",
        "Leeds is compact and solo-friendly — from canalside walks near Granary Wharf to relaxed spots like Northern Monk Brewery.",
      ],
    },
  },
  gothenburg: {
    date: {
      title: "Romantic spots in Gothenburg",
      paragraphs: [
        "Start your date in Haga for cozy cafés, take a walk in Slottsskogen, or grab wine along Andra Långgatan.",
        "For views and atmosphere, Skansen Kronan is one of Gothenburg’s easiest low-effort romantic spots.",
      ],
    },
  },
  malmo: {
    indoor: {
      title: "Indoor activities in Malmö",
      paragraphs: [
        "Stay warm at Malmö Live, explore exhibitions at Moderna Museet Malmö, or catch indoor events at Folkets Park.",
        "For shopping or casual indoor time, both Triangeln and Emporia are easy central options.",
      ],
    },
  },
};

// 3) Optional: only show extra internal links for priority cities (winners)
const PRIORITY_CITIES = new Set(["leeds", "gothenburg", "malmo"]);

function presetPath(city: string, preset: string) {
  return `/things-to-do-in/${city}/${preset}`;
}

export default function PresetSeoBlocks({ city, preset }: Props) {
  const citySlug = city;
  const presetSlug = preset;

  const cityName = titleCaseCity(citySlug);
  const presetName = presetLabel(presetSlug);

  const intro = buildIntro(cityName, presetSlug);
  const ideas = buildStaticIdeas(cityName, presetSlug);
  const faqs = buildFaq(cityName, presetSlug);

  // 2) Apply override if exists
  const override = LOCAL_PRESET_OVERRIDES[citySlug]?.[presetSlug];

  // Breadcrumb schema: Home -> City -> Preset
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://igotnoplans.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: `Things to do in ${cityName}`,
        item: `https://igotnoplans.com/things-to-do-in/${citySlug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${presetName} in ${cityName}`,
        item: `https://igotnoplans.com/things-to-do-in/${citySlug}/${presetSlug}`,
      },
    ],
  };

  // FAQ schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <section className="mt-10 space-y-8">
      {/* Intro */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-5">
        <h2 className="text-xl font-semibold tracking-tight">
          {presetName} things to do in {cityName}
        </h2>
        <p className="mt-2 text-zinc-200 leading-relaxed">{intro}</p>

        {/* ✅ Local booster block (only if override exists) */}
        {override ? (
          <div className="mt-4 rounded-lg border border-white/10 bg-black/20 p-4">
            <h3 className="font-semibold">{override.title ?? `Local ideas in ${cityName}`}</h3>
            <div className="mt-2 space-y-2 text-zinc-200 leading-relaxed">
              {(override.paragraphs ?? []).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        ) : null}

        {/* ✅ Optional: extra internal links only for winners */}
        {PRIORITY_CITIES.has(citySlug) ? (
          <div className="mt-4 text-sm text-zinc-300">
            <div className="font-medium text-zinc-200">More ideas in this city</div>
            <div className="mt-2 flex flex-wrap gap-3">
              <a className="underline" href={presetPath(citySlug, "indoor")}>
                Indoor
              </a>
              <a className="underline" href={presetPath(citySlug, "date")}>
                Date
              </a>
              <a className="underline" href={presetPath(citySlug, "with-friends")}>
                Friends
              </a>
              <a className="underline" href={presetPath(citySlug, "solo")}>
                Solo
              </a>
            </div>
          </div>
        ) : null}
      </div>

      {/* Static ideas list */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-5">
        <h2 className="text-xl font-semibold tracking-tight">
          Popular {presetName.toLowerCase()} ideas in {cityName}
        </h2>
        <ul className="mt-4 space-y-4">
          {ideas.map((idea) => (
            <li
              key={idea.title}
              className="rounded-lg border border-white/10 bg-black/20 p-4"
            >
              <h3 className="font-semibold">{idea.title}</h3>
              <p className="mt-1 text-zinc-200 leading-relaxed">{idea.desc}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* FAQ */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-5">
        <h2 className="text-xl font-semibold tracking-tight">
          {presetName} in {cityName} – FAQ
        </h2>
        <div className="mt-4 space-y-4">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="rounded-lg border border-white/10 bg-black/20 p-4"
            >
              <summary className="cursor-pointer font-semibold">{f.q}</summary>
              <p className="mt-2 text-zinc-200 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>

      {/* JSON-LD schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </section>
  );
}