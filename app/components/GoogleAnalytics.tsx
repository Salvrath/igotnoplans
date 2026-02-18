"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";
import { getConsent } from "./ConsentBanner";

export default function GoogleAnalytics() {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!GA_ID) return;

    const check = () => setEnabled(getConsent() === "accepted");
    check();

    window.addEventListener("igp:consent", check);
    return () => window.removeEventListener("igp:consent", check);
  }, [GA_ID]);

  if (!GA_ID) return null;
  if (!enabled) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
