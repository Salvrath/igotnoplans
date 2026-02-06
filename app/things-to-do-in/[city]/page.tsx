import { headers } from "next/headers";
import ClientPage from "./ClientPage";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function normalizeCity(slug: string) {
  const raw = decodeURIComponent(slug ?? "").trim();
  const spaced = raw ? raw.replace(/-/g, " ") : "stockholm";
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

function getCityFromPathname(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  const idx = parts.indexOf("things-to-do-in");
  const slug = idx >= 0 ? parts[idx + 1] : "";
  return !slug || slug.includes("[") ? "stockholm" : slug;
}

function safePathFromHeaders(h: Headers): string {
  const candidates = [
    h.get("x-vercel-path"),
    h.get("x-original-uri"),
    h.get("x-forwarded-uri"),
    h.get("x-rewrite-url"),
    h.get("x-invoke-path"),
    // OBS: x-matched-path är OFTA "/things-to-do-in/[city]" => ska vara sist
    h.get("x-matched-path"),
  ].filter(Boolean) as string[];

  for (const p of candidates) {
    if (!p.startsWith("/")) continue;
    // ignorera route-patterns som "/things-to-do-in/[city]"
    if (p.includes("[") || p.includes("]")) continue;
    return p;
  }

  return "/things-to-do-in/stockholm";
}


export async function generateMetadata() {
  const h = await headers();

  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "igotnoplans.com";
  const proto = h.get("x-forwarded-proto") ?? "https";

  const pathname = safePathFromHeaders(h as unknown as Headers);
  const citySlug = getCityFromPathname(pathname);
  const cityTitle = normalizeCity(citySlug);

  const url = `${proto}://${host}/things-to-do-in/${citySlug}`;

  return {
    title: `Things to do in ${cityTitle} | I Got No Plans`,
    description: `No plans in ${cityTitle}? Get instant ideas for dates, friends, solo and family.`,
    alternates: { canonical: url },
    openGraph: {
      title: `Things to do in ${cityTitle} | I Got No Plans`,
      description: `No plans in ${cityTitle}? Get instant ideas for dates, friends, solo and family.`,
      url,
      siteName: "I Got No Plans",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Things to do in ${cityTitle} | I Got No Plans`,
      description: `No plans in ${cityTitle}? Get instant ideas for dates, friends, solo and family.`,
    },
  };
}

export default async function Page() {
  const h = await headers();
  const pathname = safePathFromHeaders(h as unknown as Headers);

  const citySlug = getCityFromPathname(pathname);
  const cityTitle = normalizeCity(citySlug);

  return <ClientPage city={cityTitle} />;
}
