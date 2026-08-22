import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Heart,
  BedDouble,
  Bath,
  Ruler,
  MapPin,
  Check,
  Phone,
} from "lucide-react";

import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Skeleton from "../components/ui/Skeleton";
import { ErrorState } from "../components/ui/Stateviews";
import MortgageCalculator from "../components/listings/MortgageCalculator";
import ListingsMap from "../components/listings/ListingsMap";
import ContactAgentModal from "../components/listings/ContactAgentModal";

import { useGetListingQuery } from "../services/api";
import { toggleFavorite, selectIsFavorite } from "../app/favoritesSlice";

function formatPrice(price, forSale) {
  const formatted = price.toLocaleString();

  return forSale ? `EGP ${formatted}` : `EGP ${formatted} / month`;
}

export default function ListingDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    data: listing,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetListingQuery(Number(id));

  const isFav = useSelector((s) =>
    listing ? selectIsFavorite(s, listing.id) : false,
  );

  // null | "viewing" | "message"
  const [contactModal, setContactModal] = useState(null);

  return (
    <div className="max-w-4xl mx-auto px-5 lg:px-8 py-10">
      {/* Back */}
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-navy-700/60 hover:text-navy-900 mb-6 transition-colors"
      >
        <ArrowLeft size={14} />
        Back to listings
      </Link>

      {/* Loading */}
      {isLoading && (
        <div className="space-y-5">
          <Skeleton className="h-72 w-full" />
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-24 w-full" />
        </div>
      )}

      {/* Error */}
      {isError && <ErrorState message={error?.data} onRetry={refetch} />}

      {/* Listing */}
      {listing && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Image / Hero */}
          <div
            className="relative h-72 sm:h-96 rounded-2xl overflow-hidden mb-8"
            style={{
              background: `linear-gradient(135deg, ${listing.gradient[0]}, ${listing.gradient[1]})`,
            }}
          >
            {/* Listing type */}
            <span className="absolute top-4 left-4 text-xs font-mono uppercase tracking-wide px-3 py-1.5 rounded-full bg-white/90 text-navy-800">
              {listing.forSale ? "For sale" : "For rent"}
            </span>

            {/* Favorite */}
            <button
              onClick={() => dispatch(toggleFavorite(listing.id))}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center hover:scale-110 transition-transform"
              aria-label="Toggle favorite"
            >
              <Heart
                size={17}
                className={
                  isFav ? "fill-red-500 text-red-500" : "text-navy-700"
                }
              />
            </button>
          </div>

          {/* Main content */}
          <div className="grid lg:grid-cols-[1fr_300px] gap-10">
            {/* Left */}
            <div>
              <p className="text-xs font-mono uppercase tracking-wide text-sage-600 mb-2">
                {listing.type}
              </p>

              <h1 className="font-display text-3xl sm:text-4xl text-navy-900 mb-2">
                {listing.title}
              </h1>

              <p className="flex items-center gap-1.5 text-sm text-navy-700/55 mb-6">
                <MapPin size={14} />
                {listing.address}
              </p>

              {/* Property details */}
              <div className="flex items-center gap-6 py-5 border-y border-navy-700/[0.08] mb-6">
                {listing.bedrooms > 0 && (
                  <span className="flex items-center gap-2 text-sm text-navy-700/70">
                    <BedDouble size={16} />
                    {listing.bedrooms} beds
                  </span>
                )}

                <span className="flex items-center gap-2 text-sm text-navy-700/70">
                  <Bath size={16} />
                  {listing.bathrooms} baths
                </span>

                <span className="flex items-center gap-2 text-sm text-navy-700/70">
                  <Ruler size={16} />
                  {listing.size}m²
                </span>
              </div>

              {/* Description */}
              <p className="text-navy-800/75 leading-relaxed mb-8">
                {listing.description}
              </p>

              {/* Amenities */}
              <p className="text-xs font-mono uppercase tracking-wide text-navy-700/50 mb-3">
                Amenities
              </p>

              <div className="grid grid-cols-2 gap-2.5 mb-8">
                {listing.amenities.map((a) => (
                  <span
                    key={a}
                    className="flex items-center gap-2 text-sm text-navy-800/80"
                  >
                    <Check size={14} className="text-sage-600" />
                    {a}
                  </span>
                ))}
              </div>

              {/* Location */}
              <p className="text-xs font-mono uppercase tracking-wide text-navy-700/50 mb-3">
                Location
              </p>

              <ListingsMap listings={[listing]} height={280} />
            </div>

            {/* Right / Contact Card */}
            <div className="lg:sticky lg:top-24 h-fit">
              <Card className="p-6">
                <p className="text-xs font-mono uppercase tracking-wide text-navy-700/50 mb-1">
                  Price
                </p>

                <p className="font-display text-3xl text-navy-900 mb-6">
                  {formatPrice(listing.price, listing.forSale)}
                </p>

                {/* Request viewing */}
                <Button
                  variant="accent"
                  size="lg"
                  icon={Phone}
                  className="w-full mb-3"
                  onClick={() => setContactModal("viewing")}
                >
                  Request a viewing
                </Button>

                {/* Message agent */}
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full"
                  onClick={() => setContactModal("message")}
                >
                  Message agent
                </Button>

                {/* Listed date */}
                <p className="text-xs text-navy-700/40 text-center mt-4">
                  Listed{" "}
                  {listing.listedDaysAgo === 0
                    ? "today"
                    : `${listing.listedDaysAgo}d ago`}
                </p>
              </Card>

              {/* Mortgage calculator */}
              {listing.forSale && (
                <div className="mt-5">
                  <MortgageCalculator price={listing.price} />
                </div>
              )}
            </div>
          </div>

          {/* Contact Agent Modal */}
          <ContactAgentModal
            open={contactModal !== null}
            onClose={() => setContactModal(null)}
            type={contactModal}
            listing={listing}
          />
        </motion.div>
      )}
    </div>
  );
}
