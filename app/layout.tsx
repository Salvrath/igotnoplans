import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  metadataBase: new URL("https://igotnoplans.com"),
  title: "I Got No Plans — Instant ideas for dates, day trips & fun",
  description:
    "No plans? Get instant ideas for dates, day trips, and spontaneous fun. Pick your city, mood, time and budget — and go.",
  openGraph: {
    title: "I Got No Plans",
    description:
      "Instant ideas for dates, day trips, and spontaneous fun — no planning needed.",
    url: "https://igotnoplans.com",
    siteName: "I Got No Plans",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "I Got No Plans",
    description:
      "Instant ideas for dates, day trips, and spontaneous fun — no planning needed.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
