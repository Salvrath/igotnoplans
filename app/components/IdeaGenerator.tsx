"use client";

import React, { useMemo, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  ALL_IDEAS as IDEAS,
  type Idea,
  type Budget,
  type Mood,
  type TimeWindow,
  type UseCase,
} from "@/lib/ideas";
import { pickOne } from "@/lib/utils";

type PresetDefaults = Partial<{
  useCase: UseCase;
  timeWindow: TimeWindow;
  budget: Budget;
  mood: Mood;
  indoorsOk: boolean;
  outdoorsOk: boolean;
}>;

type Props = {
  useCase: UseCase;
  headline: string;
  subheadline: string;
  shareText: string;
  defaultCity?: string;
  presetDefaults?: PresetDefaults;
  below?: React.ReactNode; // ✅ NY: server-renderade block under generatorn
};

function ShuffleIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 3h5v5" />
      <path d="M4 20l16-16" />
      <path d="M21 16v5h-5" />
      <path d="M15 15l6 6" />
      <path d="M4 4l5 5" />
    </svg>
  );
}

type InitState = {
  city: string;
  timeWindow: TimeWindow;
  budget: Budget;
  mood: Mood;
  indoorsOk: boolean;
  outdoorsOk: boolean;
};

function getDefaultMood(useCase: UseCase): Mood {
  return useCase === "friends"
    ? "fun"
    : useCase === "solo"
    ? "chill"
    : useCase === "family"
    ? "fun"
    : "romantic";
}

function parseTimeWindow(v?: string | null): TimeWindow | null {
  const t = (v ?? "").toLowerCase();
  if (t === "tonight") return "tonight";
  if (t === "halfday" || t === "half-day") return "halfday";
  if (t === "fullday" || t === "full-day") return "fullday";
  return null;
}

function parseBudget(v?: string | null): Budget | null {
  const b = (v ?? "").toLowerCase();
  if (b === "low" || b === "medium" || b === "high") return b as Budget;
  return null;
}

function parseMood(v?: string | null): Mood | null {
  const m = (v ?? "").toLowerCase();
  if (m === "cozy" || m === "active" || m === "romantic" || m === "fun" || m === "chill") {
    return m as Mood;
  }
  return null;
}

function safeInitState(
  defaultCity: string | undefined,
  defaultMood: Mood,
  presetDefaults?: PresetDefaults
): InitState {
  if (typeof window === "undefined") {
    return {
      city: defaultCity ?? "",
      timeWindow: presetDefaults?.timeWindow ?? "tonight",
      budget: presetDefaults?.budget ?? "medium",
      mood: presetDefaults?.mood ?? defaultMood,
      indoorsOk: presetDefaults?.indoorsOk ?? true,
      outdoorsOk: presetDefaults?.outdoorsOk ?? true,
    };
  }

  const p = new URLSearchParams(window.location.search);

  const c = p.get("city")?.trim();
  const timeFromUrl = parseTimeWindow(p.get("time"));
  const budgetFromUrl = parseBudget(p.get("budget"));
  const moodFromUrl = parseMood(p.get("mood"));

  const indoorRaw = p.get("indoor");
  const outdoorRaw = p.get("outdoor");

  const indoorsFromUrl = indoorRaw === null ? null : indoorRaw === "0" ? false : true;
  const outdoorsFromUrl = outdoorRaw === null ? null : outdoorRaw === "0" ? false : true;

  const timeWindow = timeFromUrl ?? presetDefaults?.timeWindow ?? "tonight";
  const budget = budgetFromUrl ?? presetDefaults?.budget ?? "medium";
  const mood = moodFromUrl ?? presetDefaults?.mood ?? defaultMood;
  const indoorsOk = indoorsFromUrl ?? presetDefaults?.indoorsOk ?? true;
  const outdoorsOk = outdoorsFromUrl ?? presetDefaults?.outdoorsOk ?? true;

  return {
    city: c ?? defaultCity ?? "",
    timeWindow,
    budget,
    mood,
    indoorsOk,
    outdoorsOk,
  };
}

export default function IdeaGenerator({
  useCase,
  headline,
  subheadline,
  shareText,
  defaultCity,
  presetDefaults,
  below,
}: Props) {
  const defaultMood = getDefaultMood(useCase);

  const init = useMemo(
    () => safeInitState(defaultCity, defaultMood, presetDefaults),
    [defaultCity, defaultMood, presetDefaults]
  );

  const [city, setCity] = useState(init.city);
  const [timeWindow, setTimeWindow] = useState<TimeWindow>(init.timeWindow);
  const [budget, setBudget] = useState<Budget>(init.budget);
  const [mood, setMood] = useState<Mood>(init.mood);
  const [indoorsOk, setIndoorsOk] = useState(init.indoorsOk);
  const [outdoorsOk, setOutdoorsOk] = useState(init.outdoorsOk);

  const MIN_POOL = 20;

  const candidates = useMemo(() => {
    function strictPool() {
      return IDEAS.filter((i) => i.useCase === useCase)
        .filter((i) => i.timeWindows.includes(timeWindow))
        .filter((i) => i.budgets.includes(budget))
        .filter((i) => i.moods.includes(mood))
        .filter((i) => {
          if (!indoorsOk && i.place === "indoors") return false;
          if (!outdoorsOk && i.place === "outdoors") return false;
          return true;
        });
    }

    function relaxPlace() {
      return IDEAS.filter((i) => i.useCase === useCase)
        .filter((i) => i.timeWindows.includes(timeWindow))
        .filter((i) => i.budgets.includes(budget))
        .filter((i) => i.moods.includes(mood));
    }

    function relaxMood() {
      return IDEAS.filter((i) => i.useCase === useCase)
        .filter((i) => i.timeWindows.includes(timeWindow))
        .filter((i) => i.budgets.includes(budget));
    }

    function relaxBudget() {
      return IDEAS.filter((i) => i.useCase === useCase).filter((i) => i.timeWindows.includes(timeWindow));
    }

    function relaxTime() {
      return IDEAS.filter((i) => i.useCase === useCase);
    }

    let pool = strictPool();
    if (pool.length >= MIN_POOL) return pool;

    pool = relaxPlace();
    if (pool.length >= MIN_POOL) return pool;

    pool = relaxMood();
    if (pool.length >= MIN_POOL) return pool;

    pool = relaxBudget();
    if (pool.length >= MIN_POOL) return pool;

    return relaxTime();
  }, [budget, indoorsOk, mood, outdoorsOk, timeWindow, useCase]);

  const [cardNonce, setCardNonce] = useState(0);

  const [current, setCurrent] = useState<Idea | null>(() => {
    const pool = (candidates.length ? candidates : IDEAS.filter((i) => i.useCase === useCase)) as Idea[];
    return pool.length ? pickOne(pool) : null;
  });

  useEffect(() => {
    const pool = candidates.length ? candidates : IDEAS.filter((i) => i.useCase === useCase);
    setCurrent(pool.length ? pickOne(pool) : null);
    setCardNonce((n) => n + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useCase, timeWindow, budget, mood, indoorsOk, outdoorsOk]);

  function generate() {
    const pool = candidates.length ? candidates : IDEAS.filter((i) => i.useCase === useCase);
    setCurrent(pool.length ? pickOne(pool) : null);
    setCardNonce((n) => n + 1);
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

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <TopNav />

        <header className="mb-7">
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
              type="button"
              onClick={generate}
              className="rounded-xl bg-zinc-50 px-4 py-2 font-medium text-zinc-950 hover:bg-zinc-200"
            >
              Give me an idea
            </button>

            <button
              type="button"
              onClick={generate}
              disabled={!current}
              className={[
                "group inline-flex items-center gap-2 rounded-xl border px-4 py-2 font-medium transition",
                !current
                  ? "cursor-not-allowed border-zinc-800 text-zinc-500"
                  : "border-zinc-700 text-zinc-50 hover:bg-zinc-900",
              ].join(" ")}
            >
              <ShuffleIcon className="h-4 w-4 transition-transform group-hover:rotate-180" />
              Generate another
            </button>

            <button
              type="button"
              onClick={share}
              className="rounded-xl border border-zinc-700 bg-transparent px-4 py-2 font-medium text-zinc-50 hover:bg-zinc-900"
            >
              Share
            </button>
          </div>
        </section>

        <section className="mt-6">
          {current ? (
            <div
              key={`${current.id}-${cardNonce}`}
              className="igp-fade-up rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6"
            >
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

        {/* ✅ Server-renderade SEO-block hamnar här, i samma container */}
        {below ? <div className="mt-6 space-y-6">{below}</div> : null}

        <footer className="mt-10 text-xs text-zinc-500">
          © {new Date().getFullYear()} igotnoplans.com
        </footer>
      </div>
    </main>
  );
}

function TopNav() {
  const pathname = usePathname();

  const links = [
    { href: "/date-ideas", label: "Date" },
    { href: "/friends", label: "Friends" },
    { href: "/solo", label: "Solo" },
    { href: "/family", label: "Family" },
    { href: "/tonight", label: "Tonight" },
    { href: "/cities", label: "Cities" },
  ];

  return (
    <nav className="mb-6 flex flex-wrap gap-2">
      {links.map((l) => {
        const active = pathname === l.href;
        return (
          <a
            key={l.href}
            href={l.href}
            className={[
              "rounded-full border px-3 py-1 text-sm transition",
              active
                ? "border-zinc-300 bg-zinc-50 text-zinc-950"
                : "border-zinc-800 bg-zinc-900/30 text-zinc-200 hover:bg-zinc-900",
            ].join(" ")}
          >
            {l.label}
          </a>
        );
      })}
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
      aria-pressed={checked}
      className={[
        "rounded-full border px-3 py-1 text-sm transition",
        "focus:outline-none focus:ring-2 focus:ring-zinc-600",
        checked
          ? "border-emerald-400/60 bg-emerald-400/15 text-emerald-100"
          : "border-zinc-800 bg-transparent text-zinc-300 hover:bg-zinc-900",
      ].join(" ")}
    >
      <span className="inline-flex items-center gap-2">
        <span className={["inline-block h-2 w-2 rounded-full", checked ? "bg-emerald-300" : "bg-zinc-600"].join(" ")} />
        {label}
      </span>
    </button>
  );
}
