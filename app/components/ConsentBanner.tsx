"use client";

import { useMemo, useState } from "react";

export type ConsentValue = "accepted" | "rejected";
const KEY = "cookie_consent_v1";

export function getConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(KEY);
  return v === "accepted" || v === "rejected" ? v : null;
}

function setConsent(v: ConsentValue) {
  window.localStorage.setItem(KEY, v);
}

export default function ConsentBanner() {
  const initialVisible = useMemo(() => getConsent() === null, []);
  const [visible, setVisible] = useState<boolean>(initialVisible);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-3xl rounded-xl border border-white/10 bg-black/80 p-4 backdrop-blur">
      <div className="text-sm text-zinc-100">
        We use cookies to improve the experience and measure usage.
      </div>

      <div className="mt-3 flex gap-2">
        <button
          className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-black"
          onClick={() => {
            setConsent("accepted");
            setVisible(false);
          }}
        >
          Accept
        </button>

        <button
          className="rounded-lg border border-white/20 px-3 py-2 text-sm text-white"
          onClick={() => {
            setConsent("rejected");
            setVisible(false);
          }}
        >
          Reject
        </button>
      </div>
    </div>
  );
}
