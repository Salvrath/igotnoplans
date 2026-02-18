// components/seo/PresetSeoBlocks.tsx

import { buildFaq, buildIntro, buildStaticIdeas, presetLabel, titleCaseCity } from "@/lib/seo/preset-seo";

type Props = {
  city: string;     // slug, e.g. "valencia"
  preset: string;   // slug, e.g. "date"
};

export default function PresetSeoBlocks({ city, preset }: Props) {
  const cityName = titleCaseCity(city);
  const presetName = presetLabel(preset);

  const intro = buildIntro(cityName, preset);
  const ideas = buildStaticIdeas(cityName, preset);
  const faqs = buildFaq(cityName, preset);

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
        item: `https://igotnoplans.com/things-to-do-in/${city}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${presetName} in ${cityName}`,
        item: `https://igotnoplans.com/things-to-do-in/${city}/${preset}`,
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
      </div>

      {/* Static ideas list */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-5">
        <h2 className="text-xl font-semibold tracking-tight">
          Popular {presetName.toLowerCase()} ideas in {cityName}
        </h2>
        <ul className="mt-4 space-y-4">
          {ideas.map((idea) => (
            <li key={idea.title} className="rounded-lg border border-white/10 bg-black/20 p-4">
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
            <details key={f.q} className="rounded-lg border border-white/10 bg-black/20 p-4">
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
