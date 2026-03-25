// app/components/seo/PresetSeoBlocks.tsx

import {
  buildFaq,
  buildIntro,
  buildStaticIdeas,
  presetLabel,
  titleCaseCity,
} from "@/lib/seo/preset-seo";

type Props = {
  city: string;
  preset: string;
};

type LocalOverride = {
  title?: string;
  paragraphs?: string[];
};

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

const RELATED_PRESETS = [
  "tonight",
  "date",
  "with-friends",
  "solo",
  "family",
  "indoor",
  "outdoor",
  "low-budget",
  "high-budget",
  "romantic",
  "chill",
];

function presetPath(city: string, preset: string) {
  return `/things-to-do-in/${city}/${preset}`;
}

function buildWhySection(cityName: string, presetName: string) {
  return {
    title: `Why ${cityName} works well for ${presetName.toLowerCase()} plans`,
    paragraphs: [
      `${cityName} gives you a good mix of quick plans, low-effort options, and more intentional activities, which makes it easier to match the mood of the day.`,
      `Whether you want something spontaneous, more relaxed, or a plan that feels a bit more special, ${cityName} usually has enough variety to make ${presetName.toLowerCase()} ideas work well.`,
    ],
  };
}

export default function PresetSeoBlocks({ city, preset }: Props) {
  const citySlug = city;
  const presetSlug = preset;

  const cityName = titleCaseCity(citySlug);
  const presetName = presetLabel(presetSlug);

  const intro = buildIntro(cityName, presetSlug);
  const ideas = buildStaticIdeas(cityName, presetSlug);
  const faqs = buildFaq(cityName, presetSlug);
  const override = LOCAL_PRESET_OVERRIDES[citySlug]?.[presetSlug];
  const why = buildWhySection(cityName, presetName);

  const relatedPresets = RELATED_PRESETS.filter((p) => p !== presetSlug).slice(0, 8);

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

        {/* Better internal links, higher up */}
        <div className="mt-5 rounded-lg border border-white/10 bg-black/20 p-4">
          <h3 className="font-semibold">More ideas in {cityName}</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {relatedPresets.map((p) => (
              <a
                key={p}
                href={presetPath(citySlug, p)}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-zinc-200 hover:bg-white/10"
              >
                {presetLabel(p)}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Why this city works */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-5">
        <h2 className="text-xl font-semibold tracking-tight">{why.title}</h2>
        <div className="mt-3 space-y-3 text-zinc-200 leading-relaxed">
          {why.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
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