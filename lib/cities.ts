export const SEED_CITIES = [
  // Nordics
  "stockholm","gothenburg","malmo","uppsala","helsinki","tampere","turku","oslo","bergen","trondheim","copenhagen","aarhus","odense","reykjavik",

  // UK & Ireland
  "london","manchester","birmingham","liverpool","leeds","bristol","glasgow","edinburgh","cardiff","belfast","dublin",

  // France, Benelux
  "paris","lyon","marseille","nice","toulouse","bordeaux","lille",
  "amsterdam","rotterdam","the-hague","utrecht",
  "brussels","antwerp","ghent",
  "luxembourg",

  // Germany, Austria, Switzerland
  "berlin","hamburg","munich","cologne","frankfurt","stuttgart","dusseldorf","leipzig","dresden",
  "vienna","salzburg","graz",
  "zurich","geneva","basel","lausanne",

  // Spain, Portugal
  "barcelona","madrid","valencia","seville","malaga","bilbao","palma",
  "lisbon","porto",

  // Italy
  "rome","milan","florence","venice","naples","turin","bologna","palermo","catania",

  // Central & Eastern Europe
  "prague","brno",
  "warsaw","krakow","gdansk","wroclaw",
  "budapest",
  "bucharest",
  "sofia",
  "zagreb",
  "ljubljana",
  "belgrade",
  "sarajevo",
  "skopje",
  "tirana",
  "athens","thessaloniki",
  "istanbul","ankara","izmir",

  // Baltics
  "tallinn","riga","vilnius",

  // US
  "new-york","los-angeles","chicago","miami","san-francisco","seattle","boston","washington-dc","austin","denver",
  "san-diego","philadelphia","atlanta","dallas","houston","phoenix","las-vegas","orlando","new-orleans","portland",

  // Canada
  "toronto","vancouver","montreal","calgary","ottawa",

  // LATAM
  "mexico-city","guadalajara","monterrey",
  "bogota","medellin",
  "lima",
  "santiago",
  "buenos-aires",
  "rio-de-janeiro","sao-paulo",

  // Middle East & Africa
  "dubai","abu-dhabi","doha","riyadh","jeddah",
  "tel-aviv",
  "cairo","marrakesh","cape-town","johannesburg","nairobi",

  // Asia
  "tokyo","osaka","kyoto","seoul","busan",
  "hong-kong","singapore",
  "bangkok","chiang-mai",
  "kuala-lumpur",
  "hanoi","ho-chi-minh-city",
  "jakarta","bali",
  "manila",
  "taipei",
  "delhi","mumbai","bangalore",

  // Oceania
  "sydney","melbourne","brisbane","perth","auckland",
] as const;

export type CitySlug = (typeof SEED_CITIES)[number];

export function titleizeCity(slug: string) {
  const s = slug.replace(/-/g, " ");
  return s.charAt(0).toUpperCase() + s.slice(1);
}
