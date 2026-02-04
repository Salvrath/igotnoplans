"use client";

import IdeaGenerator from "../components/IdeaGenerator";

export default function ClientPage() {
  return (
    <IdeaGenerator
      useCase="date"
      headline="No plans tonight?"
      subheadline="Get an instant idea and make tonight count."
      shareText="No plans tonight? Use this:"
    />
  );
}
