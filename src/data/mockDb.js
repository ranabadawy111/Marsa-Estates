// Mock data for Marsa Estates — a property rental & sale listings site.

const neighborhoods = [
  "Zamalek", "Maadi", "New Cairo", "Sheikh Zayed", "El Gouna",
  "North Coast", "Heliopolis", "Rehab City",
];

// Approximate real coordinates for each neighborhood, so the map
// clusters listings in believable locations across Egypt.
const neighborhoodCoords = {
  "Zamalek": [30.0616, 31.2197],
  "Maadi": [29.9602, 31.2569],
  "New Cairo": [30.0288, 31.4906],
  "Sheikh Zayed": [30.0778, 30.9757],
  "El Gouna": [27.3953, 33.6800],
  "North Coast": [30.8760, 28.9680],
  "Heliopolis": [30.0808, 31.3228],
  "Rehab City": [30.0577, 31.4914],
};

const types = ["Apartment", "Villa", "Studio", "Penthouse", "Townhouse"];

const streetNames = [
  "Nile Corniche", "Mirage Street", "Palm Avenue", "Marina Walk",
  "Gardenia Lane", "Sunset Boulevard", "Lotus Street", "Al Nakhil Road",
];

// A deterministic, warm-toned gradient per listing so cards feel
// distinct without depending on external photos.
const gradients = [
  ["#7C9473", "#3D4C71"],
  ["#C9A15A", "#1F2A44"],
  ["#93A987", "#28365A"],
  ["#D6B571", "#111726"],
  ["#647A5C", "#3D4C71"],
  ["#1F2A44", "#93A987"],
];

function seededRandom(seed) {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

const rand = seededRandom(17);
function pick(arr) {
  return arr[Math.floor(rand() * arr.length)];
}

export const listings = Array.from({ length: 24 }).map((_, i) => {
  const type = pick(types);
  const forSale = rand() > 0.5;
  const bedrooms = type === "Studio" ? 0 : Math.floor(rand() * 4) + 1;
  const bathrooms = Math.max(1, bedrooms - Math.floor(rand() * 2));
  const size = 60 + Math.floor(rand() * 260);
  const neighborhood = pick(neighborhoods);
  const basePrice = forSale
    ? 1800000 + Math.floor(rand() * 9) * 350000
    : 9000 + Math.floor(rand() * 12) * 2500;

  const [baseLat, baseLng] = neighborhoodCoords[neighborhood];
  // Small deterministic jitter so listings in the same neighborhood
  // don't all stack on the exact same map pin.
  const lat = baseLat + (rand() - 0.5) * 0.02;
  const lng = baseLng + (rand() - 0.5) * 0.02;

  return {
    id: 100 + i,
    title: `${type} in ${neighborhood}`,
    type,
    neighborhood,
    address: `${Math.floor(rand() * 40) + 1} ${pick(streetNames)}, ${neighborhood}`,
    lat,
    lng,
    forSale,
    price: basePrice,
    bedrooms,
    bathrooms,
    size,
    gradient: pick(gradients),
    description: `A ${bedrooms > 0 ? bedrooms + "-bedroom" : "studio"} ${type.toLowerCase()} of ${size}m² in the heart of ${neighborhood}, ${
      forSale ? "ready for sale" : "available for immediate move-in"
    }. Close to schools, cafes, and the main road.`,
    amenities: shuffle([
      "Parking", "Balcony", "Pool access", "Gym", "24/7 Security",
      "Central AC", "Pet friendly", "Elevator",
    ]).slice(0, 3 + Math.floor(rand() * 3)),
    listedDaysAgo: Math.floor(rand() * 45),
  };
});

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export const allNeighborhoods = neighborhoods;
export const allTypes = types;
