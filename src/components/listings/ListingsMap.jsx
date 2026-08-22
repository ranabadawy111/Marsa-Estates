import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Link } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { BedDouble, Ruler } from "lucide-react";

function formatShortPrice(price, forSale) {
  if (forSale) {
    if (price >= 1000000) return `${(price / 1000000).toFixed(1)}M`;
    return `${Math.round(price / 1000)}K`;
  }
  return `${Math.round(price / 1000)}K/mo`;
}

// Custom branded pin instead of Leaflet's default marker icon — a
// small navy price tag, matching the site's design language rather
// than the generic red teardrop.
function priceIcon(price, forSale, isFav) {
  const label = formatShortPrice(price, forSale);
  return L.divIcon({
    className: "",
    html: `
      <div style="
        background:${isFav ? "#C9A15A" : "#1F2A44"};
        color:#F2EEE5;
        font-family: 'JetBrains Mono', monospace;
        font-size: 11px;
        font-weight: 600;
        padding: 4px 9px;
        border-radius: 999px;
        white-space: nowrap;
        box-shadow: 0 2px 8px rgba(0,0,0,0.25);
        border: 1.5px solid rgba(255,255,255,0.5);
      ">EGP ${label}</div>
    `,
    iconSize: [0, 0],
    iconAnchor: [20, 12],
  });
}

// Recenters the map when the filtered result set changes, so the
// view always frames whatever is currently visible in the list.
function FitBounds({ listings }) {
  const map = useMap();
  useEffect(() => {
    if (!listings.length) return;
    const bounds = L.latLngBounds(listings.map((l) => [l.lat, l.lng]));
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 13 });
  }, [listings, map]);
  return null;
}

export default function ListingsMap({
  listings,
  favoriteIds = [],
  height = 520,
}) {
  return (
    <div
      className="rounded-2xl overflow-hidden border border-navy-700/[0.08] shadow-card"
      style={{ height }}
    >
      <MapContainer
        center={[30.0444, 31.2357]}
        zoom={11}
        scrollWheelZoom
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds listings={listings} />

        {listings.map((listing) => (
          <Marker
            key={listing.id}
            position={[listing.lat, listing.lng]}
            icon={priceIcon(
              listing.price,
              listing.forSale,
              favoriteIds.includes(listing.id),
            )}
          >
            <Popup>
              <div className="w-48 -m-1">
                <div
                  className="h-20 rounded-lg mb-2"
                  style={{
                    background: `linear-gradient(135deg, ${listing.gradient[0]}, ${listing.gradient[1]})`,
                  }}
                />
                <p className="font-semibold text-sm text-navy-900 mb-1">
                  {listing.title}
                </p>
                <div className="flex items-center gap-3 text-xs text-navy-700/60 mb-2">
                  {listing.bedrooms > 0 && (
                    <span className="flex items-center gap-1">
                      <BedDouble size={11} /> {listing.bedrooms}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Ruler size={11} /> {listing.size}m²
                  </span>
                </div>
                <Link
                  to={`/listings/${listing.id}`}
                  className="text-xs font-medium text-sage-600 hover:text-sage-700"
                >
                  View details →
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
