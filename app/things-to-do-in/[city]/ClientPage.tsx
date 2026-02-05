"use client";

import IdeaGenerator from "@/app/components/IdeaGenerator";

export default function ClientPage({ city }: { city: string }) {
  const cityTitle = city.charAt(0).toUpperCase() + city.slice(1);

  return (
    <IdeaGenerator
      useCase="date"
      headline={`Things to do in ${cityTitle}.`}
      subheadline={`No plans in ${cityTitle}? Get a solid idea and go.`}
      shareText={`No plans in ${cityTitle}? Try this:`}
      defaultCity={cityTitle}
    />
  );
}
