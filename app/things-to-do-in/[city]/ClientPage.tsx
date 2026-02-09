"use client";

import { useParams } from "next/navigation";
import IdeaGenerator from "@/app/components/IdeaGenerator";
import { getCityName } from "@/lib/cities";

export default function ClientPage({ below }: { below?: React.ReactNode }) {
  const params = useParams<{ city?: string | string[] }>();

  const cityParam = params?.city;
  const citySlug = Array.isArray(cityParam) ? cityParam[0] : cityParam;
  const slug = typeof citySlug === "string" ? citySlug : "stockholm";

  const cityTitle = getCityName(slug);

  return (
    <IdeaGenerator
      key={slug}
      useCase="date"
      headline={`Things to do in ${cityTitle}.`}
      subheadline={`No plans in ${cityTitle}? Get a solid idea and go.`}
      shareText={`No plans in ${cityTitle}? Try this:`}
      defaultCity={cityTitle}
      below={below}
    />
  );
}
