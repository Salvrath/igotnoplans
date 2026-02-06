import ClientPage from "./ClientPage";

type Props = {
  params: { city?: string };
};

function normalizeCity(slug?: string) {
  const raw = decodeURIComponent(slug ?? "").trim();
  if (!raw) return "Stockholm";
  const spaced = raw.replace(/-/g, " ");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

export function generateMetadata({ params }: Props) {
  const cityTitle = normalizeCity(params.city);

  return {
    title: `Things to do in ${cityTitle} | I Got No Plans`,
    description: `No plans in ${cityTitle}? Get instant ideas for dates, friends, solo and family.`,
    alternates: {
      canonical: `https://igotnoplans.com/things-to-do-in/${params.city ?? "stockholm"}`,
    },
    openGraph: {
      title: `Things to do in ${cityTitle} | I Got No Plans`,
      description: `No plans in ${cityTitle}? Get instant ideas for dates, friends, solo and family.`,
      url: `https://igotnoplans.com/things-to-do-in/${params.city ?? "stockholm"}`,
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

export default function Page() {
  return <ClientPage />;
}
