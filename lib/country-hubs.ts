// lib/country-hubs.ts

import { CITY_GEO, SEED_CITIES, type CitySlug } from "@/lib/cities";

export type CountryCode = string;

const COUNTRY_NAMES: Record<string, string> = {
  SE: "Sweden",
  FI: "Finland",
  NO: "Norway",
  DK: "Denmark",
  IS: "Iceland",
  GB: "United Kingdom",
  IE: "Ireland",
  FR: "France",
  NL: "Netherlands",
  BE: "Belgium",
  LU: "Luxembourg",
  DE: "Germany",
  AT: "Austria",
  CH: "Switzerland",
  ES: "Spain",
  PT: "Portugal",
  IT: "Italy",
  CZ: "Czech Republic",
  PL: "Poland",
  HU: "Hungary",
  RO: "Romania",
  BG: "Bulgaria",
  HR: "Croatia",
  SI: "Slovenia",
  RS: "Serbia",
  BA: "Bosnia and Herzegovina",
  MK: "North Macedonia",
  AL: "Albania",
  GR: "Greece",
  TR: "Turkey",
  EE: "Estonia",
  LV: "Latvia",
  LT: "Lithuania",
  US: "United States",
  CA: "Canada",
  MX: "Mexico",
  CO: "Colombia",
  PE: "Peru",
  CL: "Chile",
  AR: "Argentina",
  BR: "Brazil",
  AE: "United Arab Emirates",
  QA: "Qatar",
  SA: "Saudi Arabia",
  IL: "Israel",
  EG: "Egypt",
  MA: "Morocco",
  ZA: "South Africa",
  KE: "Kenya",
  JP: "Japan",
  KR: "South Korea",
  HK: "Hong Kong",
  SG: "Singapore",
  TH: "Thailand",
  MY: "Malaysia",
  VN: "Vietnam",
  ID: "Indonesia",
  PH: "Philippines",
  TW: "Taiwan",
  IN: "India",
  AU: "Australia",
  NZ: "New Zealand",
};

export function getCountryName(code: string) {
  return COUNTRY_NAMES[code] ?? code;
}

export function getCountrySlug(code: string) {
  return code.toLowerCase();
}

export function getCountryCodeFromSlug(slug: string) {
  return slug.toUpperCase();
}

export function getCountryEntries() {
  const counts = new Map<CountryCode, number>();

  for (const city of SEED_CITIES) {
    const code = CITY_GEO[city].country;
    counts.set(code, (counts.get(code) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .map(([code, cityCount]) => ({
      code,
      slug: getCountrySlug(code),
      name: getCountryName(code),
      cityCount,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getCitiesByCountry(countryCode: string): CitySlug[] {
  return SEED_CITIES.filter((city) => CITY_GEO[city].country === countryCode).sort((a, b) =>
    CITY_GEO[a].name.localeCompare(CITY_GEO[b].name)
  );
}