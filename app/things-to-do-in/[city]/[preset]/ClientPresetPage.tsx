"use client";

import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { getCityName } from "@/lib/cities";
import { PRESETS, type PresetSlug, isPresetSlug } from "@/lib/presets";
import type { UseCase, TimeWindow, Budget, Mood } from "@/lib/ideas";

const IdeaGenerator = dynamic(() => import("@/app/components/IdeaGenerator"), {
  ssr: false,
});

type Props = {
  below?: React.ReactNode;
};

function mapPresetToDefaults(preset: PresetSlug): {
  useCase?: UseCase;
  timeWindow?: TimeWindow;
  budget?: Budget;
  mood?: Mood;
  indoorsOk?: boolean;
  outdoorsOk?: boolean;
} {
  // Du kan tweaka dessa efter smak – detta är rimliga defaults.
  switch (preset) {
    case "tonight":
      return { timeWindow: "tonight", budget: "medium", mood: "fun", indoorsOk: true, outdoorsOk: true };
    case "indoor":
      return { indoorsOk: true, outdoorsOk: false, budget: "medium", mood: "cozy" };
    case "outdoor":
      return { indoorsOk: false, outdoorsOk: true, budget: "medium", mood: "active" };
    case "date":
      return { useCase: "date", mood: "romantic", budget: "medium" };
    case "with-friends":
      return { useCase: "friends", mood: "fun", budget: "medium" };
    case "solo":
      return { useCase: "solo", mood: "chill", budget: "low" };
    case "family":
      return { useCase: "family", mood: "fun", budget: "medium" };
    default:
      return {};
  }
}

export default function ClientPresetPage({ below }: Props) {
  const params = useParams<{ city?: string | string[]; preset?: string | string[] }>();

  const cityParam = params?.city;
  const presetParam = params?.preset;

  const citySlug = Array.isArray(cityParam) ? cityParam[0] : cityParam;
  const presetSlug = Array.isArray(presetParam) ? presetParam[0] : presetParam;

  const city = typeof citySlug === "string" ? citySlug : "stockholm";
  const preset =
    typeof presetSlug === "string" && isPresetSlug(presetSlug)
      ? (presetSlug as PresetSlug)
      : ("tonight" as PresetSlug);

  const cityTitle = getCityName(city);
  const presetConfig = PRESETS[preset];
  const defaults = mapPresetToDefaults(preset);

  const isUseCase = (v: unknown): v is UseCase =>
    v === "date" || v === "friends" || v === "solo" || v === "family";

  const useCase: UseCase = isUseCase(defaults.useCase)
    ? defaults.useCase
    : isUseCase(presetConfig.defaults?.useCase)
      ? presetConfig.defaults!.useCase
      : "date";

  return (
    <IdeaGenerator
      key={`${city}:${preset}`}
      presetDefaults={defaults}
      useCase={useCase}
      headline={`Things to do in ${cityTitle} ${presetConfig.titleSuffix}.`}
      subheadline={`No plans in ${cityTitle}? Here are ${presetConfig.label.toLowerCase()} ideas.`}
      shareText={`No plans in ${cityTitle}? Try this:`}
      defaultCity={cityTitle}
      below={below}
    />
  );
}
