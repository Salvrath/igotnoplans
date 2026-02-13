import dynamic from "next/dynamic";
import HomeSeoBlocks from "@/app/components/HomeSeoBlocks";

const IdeaGenerator = dynamic(() => import("@/app/components/IdeaGenerator"), {
  ssr: false,
});

export const metadata = {
  title: "I Got No Plans | Instant ideas for dates, friends, solo and family",
  description:
    "Instant ideas for dates, day trips, and spontaneous fun. Pick your city, time, budget and mood.",
  alternates: { canonical: "https://igotnoplans.com/" },
};

export default function HomePage() {
  return (
    <IdeaGenerator
      useCase="date"
      headline="I got no plans."
      subheadline="Instant ideas for dates, day trips, and spontaneous fun."
      shareText="No plans? Try this:"
      presetDefaults={{
        timeWindow: "tonight",
        budget: "medium",
        mood: "romantic",
        indoorsOk: true,
        outdoorsOk: true,
      }}
      below={<HomeSeoBlocks />}
    />
  );
}
