"use client";

import React, { useEffect, useMemo, useState } from "react";
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
  below?: React.ReactNode;
};

type InitState = {
  city: string;
  timeWindow: TimeWindow;
  budget: Budget;
  mood: Mood;
  indoorsOk: boolean;
  outdoorsOk: boolean;
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

function ShareIcon({ className = "" }: { className?: string }) {
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
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="m8.6 10.5 6.8-4" />
      <path d="m8.6 13.5 6.8 4" />
    </svg>
  );
}

function SparkIcon({ className = "" }: { className?: string }) {
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
      <path d="M12 3 10.4 8.4 5 10l5.4 1.6L12 17l1.6-5.4L19 10l-5.4-1.6L12 3Z" />
      <path d="m19 16-.7 2.3L16 19l2.3.7L19 22l.7-2.3L22 19l-2.3-.7L19 16Z" />
    </svg>
  );
}

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
  if (
    m === "cozy" ||
    m === "active" ||
    m === "romantic" ||
    m === "fun" ||
    m === "chill"
  ) {
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
  const indoorsFromUrl = indoorRaw === null ? null : indoorRaw !== "0";
  const outdoorsFromUrl = outdoorRaw === null ? null : outdoorRaw !== "0";

  return {
    city: c ?? defaultCity ?? "",
    timeWindow: timeFromUrl ?? presetDefaults?.timeWindow ?? "tonight",
    budget: budgetFromUrl ?? presetDefaults?.budget ?? "medium",
    mood: moodFromUrl ?? presetDefaults?.mood ?? defaultMood,
    indoorsOk: indoorsFromUrl ?? presetDefaults?.indoorsOk ?? true,
    outdoorsOk: outdoorsFromUrl ?? presetDefaults?.outdoorsOk ?? true,
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
  const [toast, setToast] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [cardNonce, setCardNonce] = useState(0);
  const [current, setCurrent] = useState<Idea | null>(null);
  const toastTimerRef = React.useRef<number | null>(null);

  function showToast(msg: string) {
    setToast(msg);
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToast(null), 2200);
  }

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
      return IDEAS.filter((i) => i.useCase === useCase).filter((i) =>
        i.timeWindows.includes(timeWindow)
      );
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

  useEffect(() => {
    let pool: Idea[] = candidates ?? [];
    if (!pool.length) pool = IDEAS.filter((i) => i.useCase === useCase);
    if (!pool.length) pool = IDEAS;

    const id = window.setTimeout(() => {
      setCurrent(pool.length ? pickOne(pool) : null);
      setCardNonce((n) => n + 1);
    }, 0);

    return () => window.clearTimeout(id);
  }, [candidates, useCase]);

  function generate() {
    if (isGenerating) return;
    setIsGenerating(true);

    window.setTimeout(() => {
      let pool: Idea[] = candidates ?? [];
      if (!pool.length) pool = IDEAS.filter((i) => i.useCase === useCase);
      if (!pool.length) pool = IDEAS;

      setCurrent(pool.length ? pickOne(pool) : null);
      setCardNonce((n) => n + 1);
      setIsGenerating(false);
    }, 420);
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
      // Ignore cancelled native share sheets.
    }

    await navigator.clipboard.writeText(url);
    showToast("Link copied!");
  }

  return (
    <main className="igp-app min-h-screen bg-zinc-950 text-zinc-50">
      <div className="relative z-10 mx-auto max-w-5xl px-4 py-5 sm:px-6 sm:py-7">
        <TopNav />

        <header className="mx-auto max-w-3xl pb-8 pt-10 text-center sm:pb-10 sm:pt-16">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-xs font-medium text-zinc-300 shadow-sm backdrop-blur">
            <SparkIcon className="h-3.5 w-3.5 text-orange-300" />
            Instant plan generator
          </div>
          <h1 className="igp-hero-title mt-5 text-4xl font-bold tracking-[-0.035em] sm:text-6xl sm:leading-[1.02]">
            {headline}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
            {subheadline}
          </p>
        </header>

        <section className="igp-panel mx-auto max-w-4xl rounded-[28px] p-4 sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-semibold text-white">Build your plan</div>
              <div className="mt-1 text-xs text-zinc-500">Four quick choices. One solid idea.</div>
            </div>
            <div className="hidden rounded-full border border-white/10 bg-white/[0.035] px-3 py-1 text-xs text-zinc-400 sm:block">
              Takes about 5 seconds
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="City" hint="Where are you?">
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Stockholm"
                className="igp-input w-full rounded-xl border px-3.5 py-3 text-sm outline-none"
              />
            </Field>

            <Field label="Time" hint="How long have you got?">
              <select
                value={timeWindow}
                onChange={(e) => setTimeWindow(e.target.value as TimeWindow)}
                className="igp-input w-full rounded-xl border px-3.5 py-3 text-sm outline-none"
              >
                <option value="tonight">Tonight · 2–4h</option>
                <option value="halfday">Half day</option>
                <option value="fullday">Full day</option>
              </select>
            </Field>

            <Field label="Budget" hint="Keep it realistic">
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value as Budget)}
                className="igp-input w-full rounded-xl border px-3.5 py-3 text-sm outline-none"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </Field>

            <Field label="Mood" hint="What feels right?">
              <select
                value={mood}
                onChange={(e) => setMood(e.target.value as Mood)}
                className="igp-input w-full rounded-xl border px-3.5 py-3 text-sm outline-none"
              >
                <option value="romantic">Romantic</option>
                <option value="cozy">Cozy</option>
                <option value="fun">Fun</option>
                <option value="active">Active</option>
                <option value="chill">Chill</option>
              </select>
            </Field>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            <span className="mr-1 text-xs font-medium uppercase tracking-[0.12em] text-zinc-500">
              Place
            </span>
            <Toggle checked={indoorsOk} onClick={() => setIndoorsOk((s) => !s)} label="Indoor" />
            <Toggle checked={outdoorsOk} onClick={() => setOutdoorsOk((s) => !s)} label="Outdoor" />
          </div>

          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
            <button
              type="button"
              onClick={generate}
              disabled={isGenerating}
              className="igp-primary-button inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
            >
              <SparkIcon className="h-4 w-4" />
              {isGenerating ? "Finding a plan…" : "Give me a plan"}
            </button>

            <button
              type="button"
              onClick={generate}
              disabled={!current || isGenerating}
              className="igp-secondary-button group inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3 text-sm font-medium text-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ShuffleIcon
                className={`h-4 w-4 ${isGenerating ? "animate-spin" : "group-hover:rotate-180"}`}
              />
              Another
            </button>

            <button
              type="button"
              onClick={share}
              className="igp-secondary-button inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3 text-sm font-medium text-zinc-200"
            >
              <ShareIcon className="h-4 w-4" />
              Share
            </button>
          </div>
        </section>

        <section className="mx-auto mt-5 max-w-4xl">
          {current ? (
            <div key={`${current.id}-${cardNonce}`} className="igp-result-card igp-fade-up rounded-[28px] p-5 sm:p-7">
              <div className="relative z-10">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-300/15 bg-orange-300/[0.07] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-orange-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-300" />
                  Your plan
                </div>

                <h2 className="max-w-2xl text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
                  {current.title}
                </h2>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Pill>{labelTimeWindow(timeWindow)}</Pill>
                  <Pill>{labelBudget(budget)}</Pill>
                  <Pill>{labelPlace(current.place)}</Pill>
                </div>

                <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-300">
                  {current.description}
                </p>

                <div className="mt-6 max-w-2xl rounded-2xl border border-white/[0.07] bg-black/20 p-4 sm:p-5">
                  <div className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">How to do it</div>
                  <ol className="mt-3 space-y-3 text-sm leading-6 text-zinc-300">
                    {current.steps.map((step, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-xs font-semibold text-zinc-300">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="mt-5 flex items-center gap-2 text-xs text-zinc-500">
                  <ShareIcon className="h-3.5 w-3.5" />
                  Share the link to keep these exact settings.
                </div>

                {process.env.NODE_ENV !== "production" ? (
                  <div className="mt-3 text-xs text-zinc-600">Pool size: {candidates.length}</div>
                ) : null}
              </div>
            </div>
          ) : (
            <div className="rounded-[28px] border border-dashed border-white/10 bg-white/[0.02] p-7 text-center text-sm text-zinc-500">
              Pick your filters and hit <span className="font-medium text-zinc-300">Give me a plan</span>.
            </div>
          )}
        </section>

        {below ? <div className="mx-auto mt-8 max-w-4xl space-y-6">{below}</div> : null}

        {toast ? (
          <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 px-4">
            <div className="rounded-full border border-white/10 bg-zinc-950/90 px-4 py-2.5 text-sm font-medium text-zinc-100 shadow-2xl backdrop-blur-xl">
              {toast}
            </div>
          </div>
        ) : null}

        <footer className="mx-auto mt-14 flex max-w-4xl flex-col gap-2 border-t border-white/[0.06] py-7 text-xs text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} I Got No Plans</span>
          <span>Less scrolling. More doing.</span>
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
    <nav className="flex items-center justify-between gap-4 border-b border-white/[0.055] pb-5">
      <a href="/" className="group inline-flex shrink-0 items-center gap-2.5">
        <span className="igp-brand-gradient flex h-8 w-8 items-center justify-center rounded-xl text-xs font-black tracking-[-0.04em] text-white shadow-lg shadow-orange-950/20">
          IGP
        </span>
        <span className="hidden text-sm font-bold tracking-[-0.02em] text-white sm:block">I Got No Plans</span>
      </a>

      <div className="flex items-center gap-1 overflow-x-auto rounded-full border border-white/[0.07] bg-white/[0.025] p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <a
              key={link.href}
              href={link.href}
              className={[
                "whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium sm:text-sm",
                active
                  ? "bg-white text-zinc-950 shadow-sm"
                  : "text-zinc-400 hover:bg-white/[0.055] hover:text-zinc-100",
              ].join(" ")}
            >
              {link.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-zinc-200">{label}</span>
        {hint ? <span className="text-xs text-zinc-600">{hint}</span> : null}
      </div>
      {children}
    </label>
  );
}

function Toggle({
  checked,
  onClick,
  label,
}: {
  checked: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={checked}
      className={[
        "rounded-full border px-3 py-1.5 text-xs font-medium outline-none",
        checked
          ? "border-violet-300/25 bg-violet-300/[0.1] text-violet-100 shadow-sm"
          : "border-white/[0.08] bg-white/[0.025] text-zinc-500 hover:border-white/[0.14] hover:text-zinc-300",
      ].join(" ")}
    >
      <span className="inline-flex items-center gap-2">
        <span
          className={[
            "inline-block h-1.5 w-1.5 rounded-full",
            checked ? "bg-violet-300" : "bg-zinc-700",
          ].join(" ")}
        />
        {label}
      </span>
    </button>
  );
}

function labelTimeWindow(t: TimeWindow) {
  if (t === "tonight") return "Tonight";
  if (t === "halfday") return "Half day";
  return "Full day";
}

function labelBudget(b: Budget) {
  if (b === "low") return "Low budget";
  if (b === "medium") return "Medium budget";
  return "High budget";
}

function labelPlace(place?: string) {
  if (place === "indoors") return "Indoor";
  if (place === "outdoors") return "Outdoor";
  return "Indoor / outdoor";
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-zinc-300">
      {children}
    </span>
  );
}
