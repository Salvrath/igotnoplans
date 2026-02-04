"use client";

import IdeaGenerator from "../components/IdeaGenerator";

export default function ClientPage() {
  return (
    <IdeaGenerator
      useCase="date"
      headline="Date ideas, instantly."
      subheadline="No overthinking. Just pick a vibe and go."
      shareText="Need date ideas? Try this:"
    />
  );
}
