export type UseCase = "date";

export type TimeWindow = "tonight" | "halfday" | "fullday";
export type Budget = "low" | "medium" | "high";
export type Mood = "cozy" | "active" | "romantic" | "fun" | "chill";
export type Place = "indoors" | "outdoors" | "either";

export type Idea = {
  id: string;
  useCase: UseCase;
  title: string;
  description: string;
  steps: string[];
  timeWindows: TimeWindow[];
  budgets: Budget[];
  moods: Mood[];
  place: Place;
};

export const IDEAS: Idea[] = [
  {
    id: "sunset-walk-hot-drink",
    useCase: "date",
    title: "Sunset walk + a warm drink",
    description: "Pick a scenic route, keep it simple, and end with something warm.",
    steps: ["Choose a viewpoint/park", "Walk 30–60 minutes", "Grab hot chocolate/tea/coffee", "Optional: share one dessert"],
    timeWindows: ["tonight", "halfday"],
    budgets: ["low", "medium"],
    moods: ["romantic", "cozy", "chill"],
    place: "outdoors",
  },
  {
    id: "tiny-food-tour",
    useCase: "date",
    title: "Mini food tour (3 stops)",
    description: "One appetizer, one main, one dessert — different places, one night.",
    steps: ["Pick 3 spots within walking distance", "Share plates", "Take one photo per stop", "End with a short night walk"],
    timeWindows: ["tonight"],
    budgets: ["medium", "high"],
    moods: ["fun", "romantic"],
    place: "either",
  },
  {
    id: "museum-to-dinner",
    useCase: "date",
    title: "Museum or gallery + casual dinner",
    description: "Easy conversation fuel, no pressure, great for any city.",
    steps: ["Choose a small exhibit", "Pick 3 favorite pieces each", "Grab dinner nearby", "Do a 10-minute recap: best moment"],
    timeWindows: ["tonight", "halfday"],
    budgets: ["medium", "high"],
    moods: ["cozy", "romantic", "chill"],
    place: "indoors",
  },
  {
    id: "game-night",
    useCase: "date",
    title: "Simple game night (best-of-3)",
    description: "Pick 1 fast game + 1 longer one. Keep it light and playful.",
    steps: ["Pick 2 games", "Agree on a fun 'reward'", "Best-of-3", "Play a chill playlist"],
    timeWindows: ["tonight"],
    budgets: ["low", "medium"],
    moods: ["fun", "cozy", "chill"],
    place: "indoors",
  },
  {
    id: "day-trip-coffee-town",
    useCase: "date",
    title: "Day trip to a nearby town + coffee crawl",
    description: "A mini adventure without heavy planning.",
    steps: ["Pick a town within 60–90 min", "Choose 2 cafés + 1 viewpoint", "Walk around for 2 hours", "Bring a small snack for the ride"],
    timeWindows: ["halfday", "fullday"],
    budgets: ["medium"],
    moods: ["romantic", "chill", "fun"],
    place: "either",
  },
  {
    id: "outdoor-picnic-lite",
    useCase: "date",
    title: "Simple picnic (no overthinking)",
    description: "Two snacks, one drink, one blanket. That’s it.",
    steps: ["Buy 2 snacks", "Bring a blanket", "Pick a calm spot", "Ask 5 good questions"],
    timeWindows: ["tonight", "halfday"],
    budgets: ["low", "medium"],
    moods: ["romantic", "cozy", "chill"],
    place: "outdoors",
  },
];
