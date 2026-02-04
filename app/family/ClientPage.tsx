"use client";

import IdeaGenerator from "../components/IdeaGenerator";

export default function ClientPage() {
  return (
    <IdeaGenerator
      useCase="family"
      headline="Things to do with family."
      subheadline="Easy ideas that work for everyone."
      shareText="Family plans solved:"
    />
  );
}
