"use client";

import React, { useEffect, useState } from "react";

const KEY = "igp_consent_v1"; // "granted" | "denied"

function setConsent(value: "granted" | "denied") {
  // Spara i localStorage (enklast)
  localStorage.setItem(KEY, value);
  // Informera andra komponenter
  window.dispatchEvent(new Event("igp:consent"));
}

export function getConsent(): "granted" | "denied" | null {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(KEY);
  if (v === "granted" || v === "denied") return v;
  return null;
}

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Visa bara om vi inte redan har ett val
    const v = getConsent();
    setVisible(v === null);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[min(720px,calc(100%-2rem))] -translate-x-1/2">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950/95 p-4 text-zinc-100 shadow-xl backdrop-blur">
        <div className="text-sm font-medium">We use analytics</div>
        <p className="mt-1 text-sm text-zinc-300">
          We use Google Analytics to understand what pages are useful. You can accept or decline.
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              setConsent("granted");
              setVisible(false);
            }}
            className="rounded-xl bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-950 hover:bg-zinc-200"
          >
            Accept
          </button>

          <button
            type="button"
            onClick={() => {
              setConsent("denied");
              setVisible(false);
            }}
            className="rounded-xl border border-zinc-700 bg-transparent px-4 py-2 text-sm font-medium text-zinc-100 hover:bg-zinc-900"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
