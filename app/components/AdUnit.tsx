"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

type Props = {
  slot?: string;
  className?: string;
};

export default function AdUnit({ slot, className = "" }: Props) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const resolvedSlot = slot ?? process.env.NEXT_PUBLIC_ADSENSE_SLOT_PRIMARY;

  useEffect(() => {
    if (!client || !resolvedSlot) return;

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // Ad blockers and delayed script loading can make the first push fail.
      // AdSense will retry when the page is revisited; never break the app UI.
    }
  }, [client, resolvedSlot]);

  if (!client || !resolvedSlot) return null;

  return (
    <aside
      aria-label="Advertisement"
      className={`mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.018] p-3 ${className}`}
    >
      <div className="mb-2 text-center text-[10px] font-medium uppercase tracking-[0.16em] text-zinc-700">
        Advertisement
      </div>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={resolvedSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
