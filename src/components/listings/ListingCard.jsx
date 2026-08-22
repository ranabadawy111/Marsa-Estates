import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Heart, BedDouble, Bath, Ruler, MapPin } from "lucide-react";
import { toggleFavorite, selectIsFavorite } from "../../app/favoritesSlice";

function formatPrice(price, forSale) {
  const formatted = price.toLocaleString();
  return forSale ? `EGP ${formatted}` : `EGP ${formatted}/mo`;
}

// A thin architectural line-drawing silhouette, drawn once per card
// as a decorative watermark over the gradient — a signature detail
// tying the brand to "buildings" without relying on stock photography.
function BuildingMark() {
  return (
    <svg
      viewBox="0 0 120 70"
      className="absolute bottom-0 right-0 w-2/3 opacity-[0.16]"
      fill="none"
      stroke="white"
      strokeWidth="1.2"
    >
      <path d="M10 70V30h18V70" />
      <path d="M28 70V15h24V70" />
      <path d="M52 70V40h16V70" />
      <path d="M68 70V22h20V70" />
      <path d="M15 38h8M15 46h8M15 54h8M34 25h8M34 33h8M34 41h8M34 49h8M56 48h6M56 56h6M74 30h8M74 38h8M74 46h8" />
    </svg>
  );
}

export default function ListingCard({ listing }) {
  const dispatch = useDispatch();
  const isFav = useSelector((s) => selectIsFavorite(s, listing.id));

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="group bg-white/70 border border-navy-700/[0.06] rounded-2xl overflow-hidden shadow-card"
    >
      <div className="relative">
        <Link to={`/listings/${listing.id}`}>
          <div
            className="relative h-44 overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${listing.gradient[0]}, ${listing.gradient[1]})`,
            }}
          >
            <BuildingMark />
            <span className="absolute top-3 left-3 text-[10px] font-mono uppercase tracking-wide px-2.5 py-1 rounded-full bg-white/90 text-navy-800">
              {listing.forSale ? "For sale" : "For rent"}
            </span>
          </div>
        </Link>
        <button
          onClick={() => dispatch(toggleFavorite(listing.id))}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center transition-transform hover:scale-110"
          aria-label="Toggle favorite"
        >
          <Heart
            size={15}
            className={isFav ? "fill-red-500 text-red-500" : "text-navy-700"}
          />
        </button>
      </div>

      <Link to={`/listings/${listing.id}`} className="block p-5">
        <p className="text-[11px] font-mono uppercase tracking-wide text-sage-600 mb-1.5">
          {listing.type}
        </p>
        <h3 className="font-display text-xl text-navy-800 mb-1.5 leading-snug">
          {listing.title}
        </h3>
        <p className="flex items-center gap-1.5 text-xs text-navy-700/55 mb-4">
          <MapPin size={12} />
          {listing.neighborhood}
        </p>

        <div className="flex items-center gap-4 text-xs text-navy-700/60 mb-4">
          {listing.bedrooms > 0 && (
            <span className="flex items-center gap-1.5">
              <BedDouble size={13} /> {listing.bedrooms}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Bath size={13} /> {listing.bathrooms}
          </span>
          <span className="flex items-center gap-1.5">
            <Ruler size={13} /> {listing.size}m²
          </span>
        </div>

        <p className="font-display text-lg text-navy-900">
          {formatPrice(listing.price, listing.forSale)}
        </p>
      </Link>
    </motion.div>
  );
}
