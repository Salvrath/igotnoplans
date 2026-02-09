"use client";

import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { getCityName } from "@/lib/cities";
import { PRESETS, type PresetSlug, isPresetSlug } from "@/lib/presets";
import type { Budget, Mood, TimeWindow, UseCase } from "@/lib/ideas";

const IdeaGenerator = dynamic(() => import("@/app/components/IdeaGenerator"), {
  ssr: false,
});

function mapTime(t?: string): TimeWindow | undefined {
  if (t === "tonight") return "tonight";
  if (t === "half-day" || t === "halfday") return "halfday";
  if (t === "full-day" || t === "fullday") return "fullday";
  return undefined;
}

function mapBudget(b?: string): Budget | undefined {
  if (b === "low" || b === "medium" || b === "high") return b as Budget;
  return undefined;
}

function mapMood(m?: string): Mood | undefined {
  if (m === "romantic" || m === "cozy" || m === "fun" || m === "active" || m === "chill") return m as Mood;
  return undefined;
}

function mapPlaceToToggles(place?: string): { indoorsOk?: boolean; outdoorsOk?: boolean } {
  if (place === "indoor") return { indoorsOk: true, outdoorsOk: false };
  if (place === "outdoor") return { indoorsOk: false, outdoorsOk: true };
  return { indoorsOk: true, outdoorsOk: true };
}

function mapDefaultsUseCase(u?: string): UseCase {
  // defaults.useCase verkar kunna vara: "tonight" | "date" | "solo" | "family" | "friends"
  // IdeaGenerator UseCase är: "date" | "friends" | "solo" | "family"
  if (u === "friends") return "friends";
  if (u === "solo") return "solo";
  if (u === "family") return "family";
  // "tonight" och "date" mappas till "date"
  return "date";
}

export default function ClientPresetPage({ below }: { below?: React.ReactNode }) {
  const params = useParams<{ city?: string | string[]; preset?: string | string[] }>();

  const cityParam = params?.city;
  const presetParam = params?.preset;

  const citySlug = Array.isArray(cityParam) ? cityParam[0] : cityParam;
  const presetSlugRaw = Array.isArray(presetParam) ? presetParam[0] : presetParam;

  const city = typeof citySlug === "string" ? citySlug : "stockholm";
  const preset: PresetSlug =
    typeof presetSlugRaw === "string" && isPresetSlug(presetSlugRaw)
      ? (presetSlugRaw as PresetSlug)
      : ("tonight" as PresetSlug);

  const cityTitle = getCityName(city);
  const presetConfig = PRESETS[preset];

  const d = presetConfig.defaults;

  const useCase: UseCase = mapDefaultsUseCase(d?.useCase);
  const timeWindow = mapTime(d?.time);
  const budget = mapBudget(d?.budget);
  const mood = mapMood(d?.mood);
  const placeToggles = mapPlaceToToggles(d?.place);

  return (
    <IdeaGenerator
      key={`${city}:${preset}`}
      presetDefaults={{
        useCase,
        timeWindow,
        budget,
        mood,
        ...placeToggles,
      }}
      useCase={useCase}
      headline={`Things to do in ${cityTitle} ${presetConfig.titleSuffix}.`}
      subheadline={`No plans in ${cityTitle}? Here are ${presetConfig.label.toLowerCase()} ideas.`}
      shareText={`No plans in ${cityTitle}? Try this:`}
      defaultCity={cityTitle}
      below={below}
    />
  );
}
