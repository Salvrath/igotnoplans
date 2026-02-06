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

export type CityGeo = {
  name: string;
  country: string; // ISO-3166-1 alpha-2
  lat: number;
  lng: number;
};

export const CITY_GEO: Record<CitySlug, CityGeo> = {
  "stockholm": { name: "Stockholm", country: "SE", lat: 59.32938, lng: 18.06871 },
  "gothenburg": { name: "Göteborg", country: "SE", lat: 57.70716, lng: 11.96679 },
  "malmo": { name: "Malmo", country: "SE", lat: 55.60587, lng: 13.00073 },
  "uppsala": { name: "Uppsala", country: "SE", lat: 59.85882, lng: 17.63889 },
  "helsinki": { name: "Helsinki", country: "FI", lat: 60.16952, lng: 24.93545 },
  "tampere": { name: "Tampere", country: "FI", lat: 61.49815, lng: 23.76103 },
  "turku": { name: "Turku", country: "FI", lat: 60.45148, lng: 22.26869 },
  "oslo": { name: "Oslo", country: "NO", lat: 59.91273, lng: 10.74609 },
  "bergen": { name: "Bergen", country: "NO", lat: 60.39299, lng: 5.32415 },
  "trondheim": { name: "Trondheim", country: "NO", lat: 63.43049, lng: 10.39506 },
  "copenhagen": { name: "Copenhagen", country: "DK", lat: 55.67594, lng: 12.56553 },
  "aarhus": { name: "Århus", country: "DK", lat: 56.15674, lng: 10.21076 },
  "odense": { name: "Odense", country: "DK", lat: 55.39594, lng: 10.38831 },
  "reykjavik": { name: "Reykjavik", country: "IS", lat: 64.13548, lng: -21.89541 },

  "london": { name: "London", country: "GB", lat: 51.50853, lng: -0.12574 },
  "manchester": { name: "Manchester", country: "GB", lat: 53.48095, lng: -2.23743 },
  "birmingham": { name: "Birmingham", country: "GB", lat: 52.48142, lng: -1.89983 },
  "liverpool": { name: "Liverpool", country: "GB", lat: 53.41058, lng: -2.97794 },
  "leeds": { name: "Leeds", country: "GB", lat: 53.79648, lng: -1.54785 },
  "bristol": { name: "Bristol", country: "GB", lat: 51.45523, lng: -2.59665 },
  "glasgow": { name: "Glasgow", country: "GB", lat: 55.86515, lng: -4.25763 },
  "edinburgh": { name: "Edinburgh", country: "GB", lat: 55.95206, lng: -3.19648 },
  "cardiff": { name: "Cardiff", country: "GB", lat: 51.48, lng: -3.18 },
  "belfast": { name: "Belfast", country: "GB", lat: 54.59682, lng: -5.92541 },
  "dublin": { name: "Dublin", country: "IE", lat: 53.33306, lng: -6.24889 },

  "paris": { name: "Paris", country: "FR", lat: 48.85341, lng: 2.3488 },
  "lyon": { name: "Lyon", country: "FR", lat: 45.74846, lng: 4.84671 },
  "marseille": { name: "Marseille", country: "FR", lat: 43.29695, lng: 5.38107 },
  "nice": { name: "Nice", country: "FR", lat: 43.70313, lng: 7.26608 },
  "toulouse": { name: "Toulouse", country: "FR", lat: 43.60426, lng: 1.44367 },
  "bordeaux": { name: "Bordeaux", country: "FR", lat: 44.84044, lng: -0.5805 },
  "lille": { name: "Lille", country: "FR", lat: 50.63297, lng: 3.05858 },

  "amsterdam": { name: "Amsterdam", country: "NL", lat: 52.37403, lng: 4.88969 },
  "rotterdam": { name: "Rotterdam", country: "NL", lat: 51.9225, lng: 4.47917 },
  "the-hague": { name: "The Hague", country: "NL", lat: 52.07667, lng: 4.29861 },
  "utrecht": { name: "Utrecht", country: "NL", lat: 52.09083, lng: 5.12222 },

  "brussels": { name: "Brussels", country: "BE", lat: 50.85045, lng: 4.34878 },
  "antwerp": { name: "Antwerpen", country: "BE", lat: 51.22047, lng: 4.40026 },
  "ghent": { name: "Gent", country: "BE", lat: 51.05, lng: 3.71667 },

  "luxembourg": { name: "Luxembourg", country: "LU", lat: 49.61167, lng: 6.13 },

  "berlin": { name: "Berlin", country: "DE", lat: 52.52437, lng: 13.41053 },
  "hamburg": { name: "Hamburg", country: "DE", lat: 53.57532, lng: 10.01534 },
  "munich": { name: "Munich", country: "DE", lat: 48.13743, lng: 11.57549 },
  "cologne": { name: "Köln", country: "DE", lat: 50.93333, lng: 6.95 },
  "frankfurt": { name: "Frankfurt am Main", country: "DE", lat: 50.11552, lng: 8.68417 },
  "stuttgart": { name: "Stuttgart", country: "DE", lat: 48.78232, lng: 9.17702 },
  "dusseldorf": { name: "Düsseldorf", country: "DE", lat: 51.22172, lng: 6.77616 },
  "leipzig": { name: "Leipzig", country: "DE", lat: 51.33962, lng: 12.37129 },
  "dresden": { name: "Dresden", country: "DE", lat: 51.05089, lng: 13.73832 },

  "vienna": { name: "Vienna", country: "AT", lat: 48.20849, lng: 16.37208 },
  "salzburg": { name: "Salzburg", country: "AT", lat: 47.79941, lng: 13.04399 },
  "graz": { name: "Graz", country: "AT", lat: 47.06667, lng: 15.45 },

  "zurich": { name: "Zürich", country: "CH", lat: 47.36667, lng: 8.55 },
  "geneva": { name: "Genève", country: "CH", lat: 46.20222, lng: 6.14569 },
  "basel": { name: "Basel", country: "CH", lat: 47.55839, lng: 7.57327 },
  "lausanne": { name: "Lausanne", country: "CH", lat: 46.516, lng: 6.63282 },

  "barcelona": { name: "Barcelona", country: "ES", lat: 41.38879, lng: 2.15899 },
  "madrid": { name: "Madrid", country: "ES", lat: 40.4165, lng: -3.70256 },
  "valencia": { name: "Valencia", country: "ES", lat: 39.46975, lng: -0.37739 },
  "seville": { name: "Sevilla", country: "ES", lat: 37.38283, lng: -5.97317 },
  "malaga": { name: "Málaga", country: "ES", lat: 36.72016, lng: -4.42034 },
  "bilbao": { name: "Bilbao", country: "ES", lat: 43.26271, lng: -2.92528 },
  "palma": { name: "Palma", country: "ES", lat: 39.56939, lng: 2.65024 },

  "lisbon": { name: "Lisbon", country: "PT", lat: 38.71667, lng: -9.13333 },
  "porto": { name: "Porto", country: "PT", lat: 41.14961, lng: -8.61099 },

  "rome": { name: "Rome", country: "IT", lat: 41.89193, lng: 12.51133 },
  "milan": { name: "Milan", country: "IT", lat: 45.46427, lng: 9.18951 },
  "florence": { name: "Florence", country: "IT", lat: 43.77925, lng: 11.24626 },
  "venice": { name: "Venice", country: "IT", lat: 45.43713, lng: 12.33265 },
  "naples": { name: "Naples", country: "IT", lat: 40.85216, lng: 14.26811 },
  "turin": { name: "Turin", country: "IT", lat: 45.07049, lng: 7.68682 },
  "bologna": { name: "Bologna", country: "IT", lat: 44.49381, lng: 11.33875 },
  "palermo": { name: "Palermo", country: "IT", lat: 38.11582, lng: 13.35976 },
  "catania": { name: "Catania", country: "IT", lat: 37.50213, lng: 15.08719 },

  "prague": { name: "Prague", country: "CZ", lat: 50.08804, lng: 14.42076 },
  "brno": { name: "Brno", country: "CZ", lat: 49.19522, lng: 16.60796 },

  "warsaw": { name: "Warsaw", country: "PL", lat: 52.22977, lng: 21.01178 },
  "krakow": { name: "Kraków", country: "PL", lat: 50.06143, lng: 19.93658 },
  "gdansk": { name: "Gdańsk", country: "PL", lat: 54.35205, lng: 18.64637 },
  "wroclaw": { name: "Wrocław", country: "PL", lat: 51.10286, lng: 17.03006 },

  "budapest": { name: "Budapest", country: "HU", lat: 47.49835, lng: 19.04045 },
  "bucharest": { name: "Bucharest", country: "RO", lat: 44.43225, lng: 26.10626 },
  "sofia": { name: "Sofia", country: "BG", lat: 42.69751, lng: 23.32415 },
  "zagreb": { name: "Zagreb", country: "HR", lat: 45.81444, lng: 15.97798 },
  "ljubljana": { name: "Ljubljana", country: "SI", lat: 46.05108, lng: 14.50513 },
  "belgrade": { name: "Belgrade", country: "RS", lat: 44.80401, lng: 20.46513 },
  "sarajevo": { name: "Sarajevo", country: "BA", lat: 43.84864, lng: 18.35644 },
  "skopje": { name: "Skopje", country: "MK", lat: 41.99646, lng: 21.43141 },
  "tirana": { name: "Tirana", country: "AL", lat: 41.3275, lng: 19.81889 },
  "athens": { name: "Athens", country: "GR", lat: 37.97945, lng: 23.71622 },
  "thessaloniki": { name: "Thessaloníki", country: "GR", lat: 40.64028, lng: 22.94389 },

  "istanbul": { name: "Istanbul", country: "TR", lat: 41.01384, lng: 28.94966 },
  "ankara": { name: "Ankara", country: "TR", lat: 39.91987, lng: 32.85427 },
  "izmir": { name: "İzmir", country: "TR", lat: 38.41273, lng: 27.13838 },

  "tallinn": { name: "Tallinn", country: "EE", lat: 59.43696, lng: 24.75353 },
  "riga": { name: "Riga", country: "LV", lat: 56.946, lng: 24.10589 },
  "vilnius": { name: "Vilnius", country: "LT", lat: 54.68916, lng: 25.2798 },

  "new-york": { name: "New York City", country: "US", lat: 40.71427, lng: -74.00597 },
  "los-angeles": { name: "Los Angeles", country: "US", lat: 34.05223, lng: -118.24368 },
  "chicago": { name: "Chicago", country: "US", lat: 41.85003, lng: -87.65005 },
  "miami": { name: "Miami", country: "US", lat: 25.77427, lng: -80.19366 },
  "san-francisco": { name: "San Francisco", country: "US", lat: 37.77493, lng: -122.41942 },
  "seattle": { name: "Seattle", country: "US", lat: 47.60621, lng: -122.33207 },
  "boston": { name: "Boston", country: "US", lat: 42.35843, lng: -71.05977 },
  "washington-dc": { name: "Washington", country: "US", lat: 38.89511, lng: -77.03637 },
  "austin": { name: "Austin", country: "US", lat: 30.26715, lng: -97.74306 },
  "denver": { name: "Denver", country: "US", lat: 39.73915, lng: -104.9847 },
  "san-diego": { name: "San Diego", country: "US", lat: 32.71533, lng: -117.15726 },
  "philadelphia": { name: "Philadelphia", country: "US", lat: 39.95233, lng: -75.16379 },
  "atlanta": { name: "Atlanta", country: "US", lat: 33.749, lng: -84.38798 },
  "dallas": { name: "Dallas", country: "US", lat: 32.78306, lng: -96.80667 },
  "houston": { name: "Houston", country: "US", lat: 29.76328, lng: -95.36327 },
  "phoenix": { name: "Phoenix", country: "US", lat: 33.44838, lng: -112.07404 },
  "las-vegas": { name: "Las Vegas", country: "US", lat: 36.17497, lng: -115.13722 },
  "orlando": { name: "Orlando", country: "US", lat: 28.53834, lng: -81.37924 },
  "new-orleans": { name: "New Orleans", country: "US", lat: 29.95465, lng: -90.07507 },
  "portland": { name: "Portland", country: "US", lat: 45.52345, lng: -122.67621 },

  "toronto": { name: "Toronto", country: "CA", lat: 43.70011, lng: -79.4163 },
  "vancouver": { name: "Vancouver", country: "CA", lat: 49.24966, lng: -123.11934 },
  "montreal": { name: "Montréal", country: "CA", lat: 45.50884, lng: -73.58781 },
  "calgary": { name: "Calgary", country: "CA", lat: 51.05011, lng: -114.08529 },
  "ottawa": { name: "Ottawa", country: "CA", lat: 45.41117, lng: -75.69812 },

  "mexico-city": { name: "Mexico City", country: "MX", lat: 19.42847, lng: -99.12766 },
  "guadalajara": { name: "Guadalajara", country: "MX", lat: 20.66682, lng: -103.39182 },
  "monterrey": { name: "Monterrey", country: "MX", lat: 25.67507, lng: -100.31847 },

  "bogota": { name: "Bogotá", country: "CO", lat: 4.60971, lng: -74.08175 },
  "medellin": { name: "Medellín", country: "CO", lat: 6.25184, lng: -75.56359 },
  "lima": { name: "Lima", country: "PE", lat: -12.04318, lng: -77.02824 },
  "santiago": { name: "Santiago", country: "CL", lat: -33.45694, lng: -70.64827 },
  "buenos-aires": { name: "Buenos Aires", country: "AR", lat: -34.61315, lng: -58.37723 },
  "rio-de-janeiro": { name: "Rio de Janeiro", country: "BR", lat: -22.90642, lng: -43.18223 },
  "sao-paulo": { name: "Sao Paulo", country: "BR", lat: -23.5475, lng: -46.63611 },

  "dubai": { name: "Dubai", country: "AE", lat: 25.07725, lng: 55.30927 },
  "abu-dhabi": { name: "Abu Dhabi", country: "AE", lat: 24.46667, lng: 54.36667 },
  "doha": { name: "Doha", country: "QA", lat: 25.28545, lng: 51.53096 },
  "riyadh": { name: "Riyadh", country: "SA", lat: 24.68773, lng: 46.72185 },
  "jeddah": { name: "Jeddah", country: "SA", lat: 21.51694, lng: 39.21917 },
  "tel-aviv": { name: "Tel Aviv", country: "IL", lat: 32.08088, lng: 34.78057 },

  "cairo": { name: "Cairo", country: "EG", lat: 30.06263, lng: 31.24967 },
  "marrakesh": { name: "Marrakesh", country: "MA", lat: 31.63416, lng: -7.99994 },
  "cape-town": { name: "Cape Town", country: "ZA", lat: -33.92584, lng: 18.42322 },
  "johannesburg": { name: "Johannesburg", country: "ZA", lat: -26.20227, lng: 28.04363 },
  "nairobi": { name: "Nairobi", country: "KE", lat: -1.28333, lng: 36.81667 },

  "tokyo": { name: "Tokyo", country: "JP", lat: 35.6895, lng: 139.69171 },
  "osaka": { name: "Osaka", country: "JP", lat: 34.69374, lng: 135.50218 },
  "kyoto": { name: "Kyoto", country: "JP", lat: 35.02107, lng: 135.75385 },
  "seoul": { name: "Seoul", country: "KR", lat: 37.566, lng: 126.9784 },
  "busan": { name: "Busan", country: "KR", lat: 35.10168, lng: 129.03004 },

  "hong-kong": { name: "Hong Kong", country: "HK", lat: 22.28552, lng: 114.15769 },
  "singapore": { name: "Singapore", country: "SG", lat: 1.28967, lng: 103.85007 },

  "bangkok": { name: "Bangkok", country: "TH", lat: 13.75398, lng: 100.50144 },
  "chiang-mai": { name: "Chiang Mai", country: "TH", lat: 18.79038, lng: 98.98468 },

  "kuala-lumpur": { name: "Kuala Lumpur", country: "MY", lat: 3.1412, lng: 101.68653 },

  "hanoi": { name: "Hanoi", country: "VN", lat: 21.0245, lng: 105.84117 },
  "ho-chi-minh-city": { name: "Ho Chi Minh City", country: "VN", lat: 10.82302, lng: 106.62965 },

  "jakarta": { name: "Jakarta", country: "ID", lat: -6.21462, lng: 106.84513 },
  "bali": { name: "Denpasar", country: "ID", lat: -8.65, lng: 115.21667 },

  "manila": { name: "Manila", country: "PH", lat: 14.6042, lng: 120.9822 },

  "taipei": { name: "Taipei", country: "TW", lat: 25.04776, lng: 121.53185 },

  "delhi": { name: "Delhi", country: "IN", lat: 28.65195, lng: 77.23149 },
  "mumbai": { name: "Mumbai", country: "IN", lat: 19.07283, lng: 72.88261 },
  "bangalore": { name: "Bengaluru", country: "IN", lat: 12.97194, lng: 77.59369 },

  "sydney": { name: "Sydney", country: "AU", lat: -33.86785, lng: 151.20732 },
  "melbourne": { name: "Melbourne", country: "AU", lat: -37.814, lng: 144.96332 },
  "brisbane": { name: "Brisbane", country: "AU", lat: -27.46794, lng: 153.02809 },
  "perth": { name: "Perth", country: "AU", lat: -31.95224, lng: 115.8614 },
  "auckland": { name: "Auckland", country: "NZ", lat: -36.84853, lng: 174.76349 },
};

export function titleizeCity(slug: string) {
  const s = slug.replace(/-/g, " ");
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function getCityName(slug: string) {
  const key = slug as CitySlug;
  return CITY_GEO[key]?.name ?? titleizeCity(slug);
}

export function getCityLatLng(slug: string) {
  const key = slug as CitySlug;
  const c = CITY_GEO[key];
  if (!c) return null;
  return { lat: c.lat, lng: c.lng };
}
