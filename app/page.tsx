import IdeaGenerator from "@/app/components/IdeaGenerator";
import HomeSeoBlocks from "@/app/components/HomeSeoBlocks";

export const metadata = {
  title: "I Got No Plans | Instant ideas for dates, friends, solo and family",
  description:
    "Get instant ideas for dates, friends, solo and family. Pick city, time, budget and mood.",
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
