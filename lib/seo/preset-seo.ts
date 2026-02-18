// lib/seo/preset-seo.ts

export type PresetKey = "date" | "indoor" | "with-friends" | string;

export function titleCaseCity(citySlug: string) {
  return citySlug
    .split("-")
    .map((w) => (w.length ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

export function presetLabel(preset: string) {
  switch (preset) {
    case "date":
      return "Date";
    case "indoor":
      return "Indoor";
    case "with-friends":
      return "With Friends";
    default:
      // fallback: "late-night" -> "Late Night"
      return preset
        .split("-")
        .map((w) => (w.length ? w[0].toUpperCase() + w.slice(1) : w))
        .join(" ");
  }
}

export function buildIntro(cityName: string, preset: PresetKey) {
  const base = `Looking for things to do in ${cityName}?`;
  if (preset === "date") {
    return `${base} This page gives you quick, romantic date ideas in ${cityName} — perfect for a casual first date or a special evening. Filter by mood, budget, and time to get a plan in seconds.`;
  }
  if (preset === "indoor") {
    return `${base} Here are fast indoor things to do in ${cityName} — ideal for rainy days, cold weather, or cozy plans. Use filters to match your time, budget, and vibe.`;
  }
  if (preset === "with-friends") {
    return `${base} This page is built for fun plans with friends in ${cityName} — from low-effort hangouts to more active group activities. Pick your mood, budget, and time to get ideas instantly.`;
  }
  return `${base} Use filters to generate ideas based on time, budget, mood, and whether you want indoor/outdoor plans.`;
}

export function buildStaticIdeas(cityName: string, preset: PresetKey) {
  // Keep these generic to avoid “thin duplicate” issues: you will later add city-specific variations for top pages.
  if (preset === "date") {
    return [
      { title: "Sunset walk + quick dessert", desc: `Pick a scenic area in ${cityName}, walk for 30–60 minutes, then finish with gelato or a pastry.` },
      { title: "Tapas / small plates crawl", desc: `Try 2–3 places in ${cityName} and share 1–2 signature dishes at each stop.` },
      { title: "Cozy café date", desc: `Choose a café with seating and make it a “no phones for 20 minutes” conversation date.` },
      { title: "Museum or gallery + drink after", desc: `Do a short cultural stop, then end at a nearby bar for one drink.` },
      { title: "Rooftop / viewpoint evening", desc: `Go somewhere with a view in ${cityName} and keep it simple: one drink, one photo, one good chat.` },
      { title: "Local market browse", desc: `Walk a market, pick one snack each, and compare who chose better.` },
      { title: "Low-budget date night challenge", desc: `Set a budget cap and try to make the best plan in ${cityName} under it.` },
      { title: "Mini food tour (DIY)", desc: `Choose one starter, one main, one dessert — each from a different spot in ${cityName}.` },
      { title: "Board game café night", desc: `Pick one cooperative game and keep it relaxed — the goal is conversation, not winning.` },
      { title: "Live music / event night", desc: `Search for a small live gig or local event in ${cityName} and go “yes-first” for one hour.` },
    ];
  }

  if (preset === "indoor") {
    return [
      { title: "Museum or gallery hop", desc: `Do one main museum in ${cityName} or split it into two smaller galleries.` },
      { title: "Indoor market + tasting", desc: `Walk an indoor market, try 2–3 samples, and pick one “best bite.”` },
      { title: "Escape room", desc: `Great for friends or couples — book a session and pick a theme you’ve never tried.` },
      { title: "Cinema or indie theatre", desc: `Choose something you wouldn’t normally watch and rate it after.` },
      { title: "Bowling / darts / arcade", desc: `Simple, social, and low effort — perfect when the weather is bad.` },
      { title: "Indoor climbing / bouldering", desc: `Beginner-friendly gyms exist in most big cities; rent shoes and try the easy routes.` },
      { title: "Coffee crawl", desc: `Pick 2 cafés in ${cityName}, compare drinks, then choose the winner.` },
      { title: "Cooking class or workshop", desc: `Find a short class and make it the main plan for the day.` },
      { title: "Aquarium / science center", desc: `A classic indoor option that works for dates, friends, or family.` },
      { title: "Spa / sauna / pool session", desc: `If ${cityName} has it, a 1–2 hour session is an easy “reset” plan.` },
    ];
  }

  if (preset === "with-friends") {
    return [
      { title: "Food + walk combo", desc: `Grab something quick in ${cityName}, then do a 30–45 minute walk in a lively area.` },
      { title: "Bar crawl (light version)", desc: `Pick 2–3 spots, keep it short, and end at the best vibe place.` },
      { title: "Game night (outside or inside)", desc: `Bring a simple game: cards, trivia, or a co-op board game.` },
      { title: "Escape room / activity venue", desc: `Book something that forces teamwork — it’s usually the most memorable.` },
      { title: "Bowling / darts / arcade", desc: `Low friction + high laughs, works on weekdays too.` },
      { title: "Casual sports", desc: `Try padel, mini golf, or a small indoor court session in ${cityName}.` },
      { title: "Cheap challenge night", desc: `Set a budget cap and build a plan: snack + one activity + one photo stop.` },
      { title: "Live event / sports watch", desc: `Find a local venue showing a match or a small live show.` },
      { title: "Neighborhood exploration", desc: `Pick one district in ${cityName} and just wander — one coffee stop + one photo spot.` },
      { title: "Brunch + plan the next trip", desc: `Use brunch as the anchor, then spend 20 minutes planning a future day trip.` },
    ];
  }

  // Fallback for other presets
  return [
    { title: "Quick walk + one stop", desc: `Pick one area in ${cityName}, walk, and stop for a coffee or snack.` },
    { title: "One cultural thing", desc: `Museum, gallery, or a historic site — keep it under 90 minutes.` },
    { title: "One food thing", desc: `Try a local specialty or a top-rated casual place.` },
    { title: "One vibe thing", desc: `Rooftop, viewpoint, or a scenic neighborhood — aim for atmosphere.` },
    { title: "One active thing", desc: `Mini golf, climbing, bowling, or a short class.` },
    { title: "One low-budget idea", desc: `Free viewpoints, parks, markets, and walking routes.` },
    { title: "One social idea", desc: `Invite a friend or join a small event to make it feel spontaneous.` },
    { title: "One backup plan", desc: `Choose an indoor alternative if weather changes.` },
  ];
}

export function buildFaq(cityName: string, preset: PresetKey) {
  if (preset === "date") {
    return [
      { q: `What are the best date ideas in ${cityName}?`, a: `Start with a simple combo: a short walk in a scenic area, then a casual food or dessert stop. Keep it flexible and focus on atmosphere.` },
      { q: `Is ${cityName} good for a romantic evening?`, a: `Most cities have romantic pockets — viewpoints, old town areas, cozy cafés, and small wine/tapas spots usually work well.` },
      { q: `Are there cheap or free date ideas in ${cityName}?`, a: `Yes — parks, walking routes, markets, viewpoints, and free galleries (when available) are great low-budget options.` },
      { q: `What’s a good first date plan in ${cityName}?`, a: `Pick something low pressure: coffee + a short walk, or a casual place with small plates so you can keep the pace natural.` },
    ];
  }

  if (preset === "indoor") {
    return [
      { q: `What are the best indoor activities in ${cityName}?`, a: `Museums, indoor markets, escape rooms, cinemas, cafés, and activity venues like bowling or arcades are reliable choices.` },
      { q: `What can you do in ${cityName} when it’s raining?`, a: `Go for indoor attractions (museums, galleries), a cozy café crawl, or book an escape room or workshop.` },
      { q: `Are there cheap indoor things to do in ${cityName}?`, a: `Yes — public museums on free days, libraries, galleries, and low-cost cafés or markets are common budget-friendly indoor plans.` },
    ];
  }

  if (preset === "with-friends") {
    return [
      { q: `What are fun things to do with friends in ${cityName}?`, a: `Go for activity-based plans: escape rooms, bowling, arcades, casual sports, or a short bar/food crawl.` },
      { q: `What’s a low-effort plan with friends in ${cityName}?`, a: `Pick one neighborhood, walk, grab one snack/drink, and add one simple activity like darts or an arcade.` },
      { q: `Are there cheap things to do with friends in ${cityName}?`, a: `Yes — parks, viewpoints, markets, free events, and “budget challenge” nights are easy ways to keep costs down.` },
    ];
  }

  return [
    { q: `What are the best things to do in ${cityName}?`, a: `It depends on your mood, time, and budget. Use the filters on this page to get ideas that match your plan.` },
    { q: `Are there free things to do in ${cityName}?`, a: `Most cities have free walking routes, parks, markets, viewpoints, and occasional free events.` },
  ];
}
