export type UseCase = "date" | "friends" | "solo" | "family";
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
