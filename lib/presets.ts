export type PresetSlug =
  | "tonight"
  | "half-day"
  | "full-day"
  | "date"
  | "with-friends"
  | "solo"
  | "family"
  | "low-budget"
  | "high-budget"
  | "indoor"
  | "outdoor"
  | "romantic"
  | "chill";

export type PresetDefaults = Partial<{
  useCase: "date" | "friends" | "solo" | "family" | "tonight";
  time: "tonight" | "half-day" | "full-day";
  budget: "low" | "medium" | "high";
  place: "indoor" | "outdoor";
  mood: string;
}>;

export const PRESETS: Record<
  PresetSlug,
  {
    label: string;
    titleSuffix: string; // används i metadata
    defaults: PresetDefaults;
  }
> = {
  "tonight": {
    label: "Tonight",
    titleSuffix: "tonight",
    defaults: { time: "tonight", useCase: "tonight" },
  },
  "half-day": {
    label: "Half day",
    titleSuffix: "for half a day",
    defaults: { time: "half-day" },
  },
  "full-day": {
    label: "Full day",
    titleSuffix: "for a full day",
    defaults: { time: "full-day" },
  },
  "date": {
    label: "Date ideas",
    titleSuffix: "date ideas",
    defaults: { useCase: "date", mood: "romantic" },
  },
  "with-friends": {
    label: "With friends",
    titleSuffix: "with friends",
    defaults: { useCase: "friends" },
  },
  "solo": {
    label: "Solo",
    titleSuffix: "solo",
    defaults: { useCase: "solo" },
  },
  "family": {
    label: "Family",
    titleSuffix: "with family",
    defaults: { useCase: "family" },
  },
  "low-budget": {
    label: "Low budget",
    titleSuffix: "on a low budget",
    defaults: { budget: "low" },
  },
  "high-budget": {
    label: "High budget",
    titleSuffix: "on a high budget",
    defaults: { budget: "high" },
  },
  "indoor": {
    label: "Indoor",
    titleSuffix: "indoor activities",
    defaults: { place: "indoor" },
  },
  "outdoor": {
    label: "Outdoor",
    titleSuffix: "outdoor activities",
    defaults: { place: "outdoor" },
  },
  "romantic": {
    label: "Romantic",
    titleSuffix: "romantic ideas",
    defaults: { mood: "romantic" },
  },
  "chill": {
    label: "Chill",
    titleSuffix: "chill ideas",
    defaults: { mood: "chill" },
  },
};

export function isPresetSlug(x: string): x is PresetSlug {
  return Object.prototype.hasOwnProperty.call(PRESETS, x);
}
