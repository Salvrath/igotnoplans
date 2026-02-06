import ClientPage from "./ClientPage";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Props = {
  params: { city: string };
};

function normalizeCity(slug: string) {
  const raw = decodeURIComponent(slug ?? "").trim();
  const spaced = raw ? raw.replace(/-/g, " ") : "stockholm";
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

export async function generateMetadata({ params }: Props) {
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
