import type { Idea } from "./ideas";

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function pickOne<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function scoreIdea(
  idea: Idea,
  ctx: { city: string; timeWindow: string; budget: string; mood: string }
) {
  // MVP scoring: slight preference for "either" place and shorter ideas for tonight.
  let score = 0;
  if (idea.place === "either") score += 2;
  if (ctx.timeWindow === "tonight" && idea.timeWindows.includes("tonight")) score += 2;
  score += 1; // baseline
  return score;
}
