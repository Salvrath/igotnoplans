// app/components/seo/PresetSeoBlocks.tsx

import {
  buildFaq,
  buildIntro,
  buildStaticIdeas,
  presetLabel,
  titleCaseCity,
} from "@/lib/seo/preset-seo";

type Props = { city: string; preset: string };
type LocalOverride = { title: string; paragraphs: string[]; ideas?: string[] };

// Search Console winners: keep this deliberately curated. These pages get
// genuinely local context while the long tail continues to use the generic
// programmatic template.
const LOCAL_PRESET_OVERRIDES: Record<string, Record<string, LocalOverride>> = {
  "the-hague": {
    date: {
      title: "Date ideas around The Hague",
      paragraphs: [
        "For an easy date in The Hague, combine the historic centre with the coast: walk around Hofvijver, stop for a drink near Grote Markt, or head to Scheveningen for the beach and sea views.",
        "For an indoor or culture-focused date, the Mauritshuis is a central option. Westbroekpark and the Palace Garden work well when you want a quieter, lower-cost plan outdoors.",
      ],
      ideas: ["Walk around Hofvijver and the historic centre", "Take a beach walk at Scheveningen", "Visit the Mauritshuis together", "Have a picnic or slow walk in Westbroekpark"],
    },
  },
  stockholm: {
    romantic: {
      title: "Romantic places and plans in Stockholm",
      paragraphs: [
        "Stockholm is particularly good for simple romantic plans because waterfront walks, viewpoints and compact neighbourhoods can be combined without much planning. Try Monteliusvägen for views, wander through Gamla Stan, or take a slow walk around Djurgården.",
        "For a more relaxed evening, Södermalm gives you cafés, bars and viewpoints within walking distance, while the city-centre islands make it easy to turn a short walk into a longer date.",
      ],
    },
    outdoor: {
      title: "Outdoor ideas in Stockholm",
      paragraphs: ["Walk Djurgården, follow the waterfront around Skeppsholmen, or take in the city view from Monteliusvägen. Stockholm's islands make outdoor plans easy to combine with cafés and public transport."],
    },
  },
  reykjavik: {
    "low-budget": {
      title: "Cheap and free things to do in Reykjavik",
      paragraphs: [
        "Reykjavik can be expensive, but several of its easiest sights cost nothing. Walk the waterfront to Sun Voyager, explore the streets around Hallgrímskirkja, and continue toward Harpa and the Old Harbour.",
        "A self-guided walk through central Reykjavik is one of the simplest ways to keep costs down. If you spend money, choose one paid stop and build the rest of the day around free neighbourhood and waterfront walks.",
      ],
      ideas: ["Walk the waterfront and see Sun Voyager", "Explore central Reykjavik on foot", "Visit the Old Harbour area", "Walk around Hallgrímskirkja and the surrounding streets"],
    },
  },
  riga: {
    date: {
      title: "Local date ideas in Riga",
      paragraphs: ["Riga works well for a walk-and-stop date: explore the Old Town, cross into the Art Nouveau district, or walk beside the city canal and Bastejkalns Park.", "For a casual first date, the Central Market and nearby riverfront give you plenty to see without committing to a long activity."],
    },
  },
  charlotte: {
    date: {
      title: "Date ideas in Charlotte",
      paragraphs: ["Build an easy Charlotte date around Uptown, Romare Bearden Park and the Rail Trail. For something more active, Freedom Park gives you a straightforward outdoor option close to the city."],
    },
  },
  montreal: {
    date: {
      title: "Date ideas in Montreal",
      paragraphs: ["Walk the cobbled streets of Old Montreal, head up Mount Royal for a view, or explore the cafés and streets of the Plateau. These areas make it easy to extend a short coffee date into a longer walk."],
    },
  },
  bath: {
    date: {
      title: "Date spots and ideas in Bath",
      paragraphs: ["Bath's compact centre makes a walking date simple: start around the Royal Crescent and Circus, continue through the historic streets, or follow the riverside near Pulteney Bridge."],
    },
  },
  marseille: {
    "half-day": {
      title: "How to spend half a day in Marseille",
      paragraphs: ["With only a few hours, keep the route compact: start at Vieux-Port, walk through Le Panier, and finish along the waterfront. This gives you a mix of old streets, harbour views and food stops without crossing the whole city."],
    },
  },
  trondheim: {
    date: {
      title: "Date ideas in Trondheim",
      paragraphs: ["Walk through Bakklandet and along the Nidelva, cross the Old Town Bridge, or combine the riverfront with a coffee stop. For an indoor date, central museums and cafés make a practical fallback when the weather turns."],
    },
    indoor: {
      title: "Indoor things to do in Trondheim when it rains",
      paragraphs: ["When Trondheim is wet or cold, build the day around central indoor stops such as Rockheim, museums, cafés and Nidaros Cathedral, with short walks between them."],
    },
  },
  melbourne: {
    "with-friends": {
      title: "Things to do with friends in Melbourne",
      paragraphs: ["Explore Melbourne's laneways together, meet around Queen Victoria Market, or walk the Yarra and Southbank. Fitzroy is another easy area for turning food, coffee and browsing into an unstructured group day."],
    },
  },
  gothenburg: {
    date: {
      title: "Romantic spots in Gothenburg",
      paragraphs: ["Start in Haga for cafés, walk through Slottsskogen, or climb to Skansen Kronan for a city view. The compact inner city makes these easy to combine into one relaxed date."],
    },
  },
  malmo: {
    indoor: {
      title: "Indoor activities in Malmö",
      paragraphs: ["Explore Moderna Museet Malmö, spend time around Malmö Live, or use the cafés and cultural venues in the centre for an easy weather-proof day. Triangeln and Emporia are straightforward options when shopping is part of the plan."],
    },
  },
};

const RELATED_PRESETS = ["tonight", "date", "with-friends", "solo", "family", "indoor", "outdoor", "low-budget", "high-budget", "romantic", "chill"];

function presetPath(city: string, preset: string) { return `/things-to-do-in/${city}/${preset}`; }

export default function PresetSeoBlocks({ city, preset }: Props) {
  const cityName = titleCaseCity(city);
  const presetName = presetLabel(preset);
  const intro = buildIntro(cityName, preset);
  const ideas = buildStaticIdeas(cityName, preset);
  const faqs = buildFaq(cityName, preset);
  const override = LOCAL_PRESET_OVERRIDES[city]?.[preset];
  const relatedPresets = RELATED_PRESETS.filter((p) => p !== preset).slice(0, 8);

  const breadcrumbSchema = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://igotnoplans.com/" },
      { "@type": "ListItem", position: 2, name: `Things to do in ${cityName}`, item: `https://igotnoplans.com/things-to-do-in/${city}` },
      { "@type": "ListItem", position: 3, name: `${presetName} in ${cityName}`, item: `https://igotnoplans.com/things-to-do-in/${city}/${preset}` },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <section className="mt-10 space-y-8">
      <div className="rounded-xl border border-white/10 bg-white/5 p-5">
        <h2 className="text-xl font-semibold tracking-tight">{presetName} things to do in {cityName}</h2>
        <p className="mt-2 text-zinc-200 leading-relaxed">{intro}</p>
        {override ? (
          <div className="mt-4 rounded-lg border border-white/10 bg-black/20 p-4">
            <h3 className="font-semibold">{override.title}</h3>
            <div className="mt-2 space-y-2 text-zinc-200 leading-relaxed">{override.paragraphs.map((p, i) => <p key={i}>{p}</p>)}</div>
            {override.ideas?.length ? (
              <ul className="mt-4 list-disc space-y-1 pl-5 text-zinc-200">{override.ideas.map((idea) => <li key={idea}>{idea}</li>)}</ul>
            ) : null}
          </div>
        ) : null}
        <div className="mt-5 rounded-lg border border-white/10 bg-black/20 p-4">
          <h3 className="font-semibold">More ideas in {cityName}</h3>
          <div className="mt-3 flex flex-wrap gap-2">{relatedPresets.map((p) => <a key={p} href={presetPath(city, p)} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-zinc-200 hover:bg-white/10">{presetLabel(p)}</a>)}</div>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-5">
        <h2 className="text-xl font-semibold tracking-tight">Popular {presetName.toLowerCase()} ideas in {cityName}</h2>
        <ul className="mt-4 space-y-4">{ideas.map((idea) => <li key={idea.title} className="rounded-lg border border-white/10 bg-black/20 p-4"><h3 className="font-semibold">{idea.title}</h3><p className="mt-1 text-zinc-200 leading-relaxed">{idea.desc}</p></li>)}</ul>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-5">
        <h2 className="text-xl font-semibold tracking-tight">{presetName} in {cityName} – FAQ</h2>
        <div className="mt-4 space-y-4">{faqs.map((f) => <details key={f.q} className="rounded-lg border border-white/10 bg-black/20 p-4"><summary className="cursor-pointer font-semibold">{f.q}</summary><p className="mt-2 text-zinc-200 leading-relaxed">{f.a}</p></details>)}</div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </section>
  );
}
