"use client";

import dynamic from "next/dynamic";
import React from "react";

const IdeaGenerator = dynamic(() => import("@/app/components/IdeaGenerator"), {
  ssr: false,
});

export default function HomeClient({ below }: { below?: React.ReactNode }) {
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
      below={below}
    />
  );
}
