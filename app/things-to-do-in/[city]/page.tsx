import ClientPage from "./ClientPage";

type Props = {
  params: { city: string };
};

export function generateMetadata({ params }: Props) {
  const city = decodeURIComponent(params.city).replace(/-/g, " ");
  const cityTitle = city.charAt(0).toUpperCase() + city.slice(1);

  return {
    title: `Things to do in ${cityTitle} | I Got No Plans`,
    description: `No plans in ${cityTitle}? Get instant ideas for dates, friends, solo and family.`,
    alternates: {
      canonical: `https://igotnoplans.com/things-to-do-in/${params.city}`,
    },
  };
}

export default function Page({ params }: Props) {
  const city = decodeURIComponent(params.city).replace(/-/g, " ");
  return <ClientPage city={city} />;
}
