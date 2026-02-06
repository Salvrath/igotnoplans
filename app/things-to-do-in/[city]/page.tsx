import ClientPage from "./ClientPage";
import { SEED_CITIES } from "@/lib/cities";

export const dynamicParams = true; // tillåt även andra än listan (valfritt)

type Props = {
  params: { city: string };
};

function normalizeCity(slug: string) {
  const raw = decodeURIComponent(slug ?? "").trim();
  const spaced = raw ? raw.replace(/-/g, " ") : "stockholm";
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

// ✅ Bygg statiska sidor för dina 150 städer
export function generateStaticParams() {
  return SEED_CITIES.map((city) => ({ city }));
}

export function generateMetadata({ params }: Props) {
  const cityTitle = normalizeCity(params.city);
  const url = `https://igotnoplans.com/things-to-do-in/${params.city}`;

  return {
    title: `Things to do in ${cityTitle} | I Got No Plans`,
    description: `No plans in ${cityTitle}? Get instant ideas for dates, friends, solo and family.`,
    alternates: { canonical: url },
    openGraph: {
      title: `Things to do in ${cityTitle} | I Got No Plans`,
      description: `No plans in ${cityTitle}? Get instant ideas for dates, friends, solo and family.`,
      url,
      siteName: "I Got No Plans",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Things to do in ${cityTitle} | I Got No Plans`,
      description: `No plans in ${cityTitle}? Get instant ideas for dates, friends, solo and family.`,
    },
  };
}

export default function Page({ params }: Props) {
  const cityTitle = normalizeCity(params.city);
  return <ClientPage city={cityTitle} />;
}
