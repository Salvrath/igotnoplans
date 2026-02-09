import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://igotnoplans.com"),

  title: "I Got No Plans — Instant ideas for dates, day trips & fun",
  description:
    "No plans? Get instant ideas for dates, day trips, and spontaneous fun.",

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome",
        url: "/android-chrome-512x512.png",
      },
    ],
  },

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


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
