"use client";

import IdeaGenerator from "@/app/components/IdeaGenerator";
import { useParams } from "next/navigation";

function normalizeCity(slug?: string) {
  const raw = decodeURIComponent(slug ?? "").trim();
  if (!raw) return "Stockholm";
  const spaced = raw.replace(/-/g, " ");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

export default function ClientPage() {
  const params = useParams();

  const cityParam = (params as any)?.city;
  const citySlug = Array.isArray(cityParam) ? cityParam[0] : cityParam;
  const cityTitle = normalizeCity(typeof citySlug === "string" ? citySlug : "");

  return (
    <IdeaGenerator
      key={citySlug ?? cityTitle}
      useCase="date"
      headline={`Things to do in ${cityTitle}.`}
      subheadline={`No plans in ${cityTitle}? Get a solid idea and go.`}
      shareText={`No plans in ${cityTitle}? Try this:`}
      defaultCity={cityTitle}
    />
  );
}
