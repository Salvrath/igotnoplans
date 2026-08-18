import Script from "next/script";

/**
 * AdSense stays completely disabled until NEXT_PUBLIC_ADSENSE_CLIENT is set.
 * Before enabling it for EEA/UK/Swiss traffic, configure a Google-certified
 * CMP in AdSense Privacy & messaging.
 */
export default function AdSenseScript() {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  if (!client) return null;

  return (
    <Script
      id="adsense-script"
      async
      strategy="afterInteractive"
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
    />
  );
}
