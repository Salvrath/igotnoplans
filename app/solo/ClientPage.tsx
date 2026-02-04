"use client";

import IdeaGenerator from "../components/IdeaGenerator";

export default function ClientPage() {
  return (
    <IdeaGenerator
      useCase="solo"
      headline="Things to do solo."
      subheadline="No plans. No pressure. Just something good to do."
      shareText="No plans? Try this:"
    />
  );
}
