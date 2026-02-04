"use client";

import IdeaGenerator from "../components/IdeaGenerator";

export default function ClientPage() {
  return (
    <IdeaGenerator
      useCase="friends"
      headline="Things to do with friends."
      subheadline="No plans? Get a solid idea and get everyone on board."
      shareText="No plans with friends? Use this:"
    />
  );
}
