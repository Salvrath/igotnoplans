"use client";

import dynamic from "next/dynamic";
import { getCityName } from "@/lib/cities";
import { useParams } from "next/navigation";

const IdeaGenerator = dynamic(() => import("@/app/components/IdeaGenerator"), {
  ssr: false,
});

export default function ClientPage() {
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
    />
  );
}
