"use client";

import { useEffect, useMemo, useState } from "react";
import { IDEAS, type Idea, type Budget, type Mood, type TimeWindow, type UseCase } from "@/lib/ideas";
import { pickOne, scoreIdea } from "@/lib/utils";

type Props = {
  useCase: UseCase;
  headline: string;
  subheadline: string;
  shareText: string;
};

export default function IdeaGenerator({ useCase, headline, subheadline, shareText }: Props) {
  const [city, setCity] = useState("Stockholm");
  const [timeWindow, setTimeWindow] = useState<TimeWindow>("tonight");
  const [budget, setBudget] = useState<Budget>("medium");
  const [mood, setMood] = useState<Mood>("romantic");
  const [indoorsOk, setIndoorsOk] = useState(true);
  const [outdoorsOk, setOutdoorsOk] = useState(true);

  const candidates = useMemo(() => {
    return IDEAS
      .filter((i) => i.useCase === useCase)
      .filter((i) => i.timeWindows.includes(timeWindow))
      .filter((i) => i.budgets.includes(budget))
      .filter((i) => i.moods.includes(mood))
      .filter((i) => (indoorsOk ? true : i.place !== "indoors"))
      .filter((i) => (outdoorsOk ? true : i.place !== "outdoors"))
      .map((i) => ({ idea: i, score: scoreIdea(i, { city, timeWindow, budget, mood }) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 30)
      .map((x) => x.idea);
  }, [budget, city, indoorsOk, mood, outdoorsOk, timeWindow, useCase]);

  const [current, setCurrent] = useState<Idea | null>(null);

  function generate() {
    const pool = candidates.length ? candidates : IDEAS.filter((i) => i.useCase === useCase);
    setCurrent(pickOne(pool));
  }

  function getShareUrl() {
    const params = new URLSearchParams({
      city,
      time: timeWindow,
      budget,
      mood,
      indoor: indoorsOk ? "1" : "0",
      outdoor: outdoorsOk ? "1" : "0",
    });
    return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
  }

  async function share() {
    const url = getShareUrl();
    try {
      if (navigator.share) {
        await navigator.share({ title: "I Got No Plans", text: shareText, url });
        return;
      }
    } catch {
      // ignore cancel
    }
    await navigator.clipboard.writeText(url);
    alert("Link copied!");
  }

  // Load state from URL on first render
useEffect(() => {
  const p = new URLSearchParams(window.location.search);

  const c = p.get("city")?.trim();

  const tRaw = p.get("time")?.toLowerCase();
  const bRaw = p.get("budget")?.toLowerCase();
  const mRaw = p.get("mood")?.toLowerCase();

  const indoor = p.get("indoor");
  const outdoor = p.get("outdoor");

  if (c) setCity(c);

  if (tRaw === "tonight" || tRaw === "halfday" || tRaw === "fullday") {
    setTimeWindow(tRaw as TimeWindow);
  }

  if (bRaw === "low" || bRaw === "medium" || bRaw === "high") {
    setBudget(bRaw as Budget);
  }

  if (mRaw === "cozy" || mRaw === "active" || mRaw === "romantic" || mRaw === "fun" || mRaw === "chill") {
    setMood(mRaw as Mood);
  }

  if (indoor === "0") setIndoorsOk(false);
  if (outdoor === "0") setOutdoorsOk(false);
}, []);



  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <TopNav />

        <header className="mb-8">
          <div className="text-sm text-zinc-400">igotnoplans.com</div>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">{headline}</h1>
          <p className="mt-3 text-zinc-300">{subheadline}</p>
        </header>

        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="City">
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Stockholm"
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-600"
              />
            </Field>

            <Field label="Time">
              <select
                value={timeWindow}
                onChange={(e) => setTimeWindow(e.target.value as TimeWindow)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-600"
              >
                <option value="tonight">Tonight (2–4h)</option>
                <option value="halfday">Half day</option>
                <option value="fullday">Full day</option>
              </select>
            </Field>

            <Field label="Budget">
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value as Budget)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-600"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </Field>

            <Field label="Mood">
              <select
                value={mood}
                onChange={(e) => setMood(e.target.value as Mood)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-600"
              >
                <option value="romantic">Romantic</option>
                <option value="cozy">Cozy</option>
                <option value="fun">Fun</option>
                <option value="active">Active</option>
                <option value="chill">Chill</option>
              </select>
            </Field>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <Toggle checked={indoorsOk} onClick={() => setIndoorsOk((s) => !s)} label="Indoor OK" />
            <Toggle checked={outdoorsOk} onClick={() => setOutdoorsOk((s) => !s)} label="Outdoor OK" />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={generate}
              className="rounded-xl bg-zinc-50 px-4 py-2 font-medium text-zinc-950 hover:bg-zinc-200"
            >
              Give me an idea
            </button>
            <button
              onClick={generate}
              className="rounded-xl border border-zinc-700 bg-transparent px-4 py-2 font-medium text-zinc-50 hover:bg-zinc-900"
            >
              Generate another
            </button>
            <button
              onClick={share}
              className="rounded-xl border border-zinc-700 bg-transparent px-4 py-2 font-medium text-zinc-50 hover:bg-zinc-900"
            >
              Share
            </button>
          </div>
        </section>

        <section className="mt-6">
          {current ? (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
              <h2 className="text-2xl font-semibold">{current.title}</h2>
              <p className="mt-2 text-zinc-200">{current.description}</p>

              <div className="mt-5">
                <div className="text-sm font-medium text-zinc-300">How to do it</div>
                <ol className="mt-2 list-decimal space-y-1 pl-5 text-zinc-200">
                  {current.steps.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ol>
              </div>

              <div className="mt-6 text-sm text-zinc-400">
                Tip: share this link to keep your exact settings.
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-zinc-800 p-6 text-zinc-400">
              Click <span className="text-zinc-200">“Give me an idea”</span> to get started.
            </div>
          )}
        </section>

        <footer className="mt-10 text-xs text-zinc-500">© {new Date().getFullYear()} igotnoplans.com</footer>
      </div>
    </main>
  );
}

function TopNav() {
  const links = [
    { href: "/date-ideas", label: "Date" },
    { href: "/friends", label: "Friends" },
    { href: "/solo", label: "Solo" },
    { href: "/family", label: "Family" },
    { href: "/tonight", label: "Tonight" },
  ];

  return (
    <nav className="mb-6 flex flex-wrap gap-2">
      {links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          className="rounded-full border border-zinc-800 bg-zinc-900/30 px-3 py-1 text-sm text-zinc-200 hover:bg-zinc-900"
        >
          {l.label}
        </a>
      ))}
    </nav>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1 text-sm text-zinc-300">{label}</div>
      {children}
    </label>
  );
}

function Toggle({ checked, onClick, label }: { checked: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-full border px-3 py-1 text-sm",
        checked ? "border-zinc-600 bg-zinc-900 text-zinc-50" : "border-zinc-800 bg-transparent text-zinc-300",
      ].join(" ")}
    >
      {label}
    </button>
  );
}
