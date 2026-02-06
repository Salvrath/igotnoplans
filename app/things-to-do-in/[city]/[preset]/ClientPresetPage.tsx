"use client";

import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { getCityName } from "@/lib/cities";
import { PRESETS, type PresetSlug, isPresetSlug } from "@/lib/presets";

const IdeaGenerator = dynamic(() => import("@/app/components/IdeaGenerator"), {
  ssr: false,
});

export default function ClientPresetPage() {
  const params = useParams<{ city?: string | string[]; preset?: string | string[] }>();

  const cityParam = params?.city;
  const presetParam = params?.preset;

  const citySlug = Array.isArray(cityParam) ? cityParam[0] : cityParam;
  const presetSlug = Array.isArray(presetParam) ? presetParam[0] : presetParam;

  const city = typeof citySlug === "string" ? citySlug : "stockholm";
  const preset = typeof presetSlug === "string" && isPresetSlug(presetSlug) ? (presetSlug as PresetSlug) : "tonight";

  const cityTitle = getCityName(city);
  const presetConfig = PRESETS[preset];

  return (
    <IdeaGenerator
      key={`${city}:${preset}`}
      presetDefaults={{ timeWindow: "tonight", budget: "low", mood: "chill", indoorsOk: true, outdoorsOk: false }}
      useCase={(presetConfig.defaults.useCase ?? "date") as any}
      headline={`Things to do in ${cityTitle} ${presetConfig.titleSuffix}.`}
      subheadline={`No plans in ${cityTitle}? Here are ${presetConfig.label.toLowerCase()} ideas.`}
      shareText={`No plans in ${cityTitle}? Try this:`}
      defaultCity={cityTitle}
    />
  );
}
