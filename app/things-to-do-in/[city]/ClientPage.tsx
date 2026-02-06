"use client";
import IdeaGenerator from "@/app/components/IdeaGenerator";

export default function ClientPage({ city }: { city: string }) {
  return (
    <IdeaGenerator
      useCase="date"
      headline={`Things to do in ${city}.`}
      subheadline={`No plans in ${city}? Get a solid idea and go.`}
      shareText={`No plans in ${city}? Try this:`}
      defaultCity={city}
    />
  );
}
