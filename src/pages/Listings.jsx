import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { List, Map as MapIcon } from "lucide-react";
import FilterBar from "../components/listings/FilterBar";
import ListingCard from "../components/listings/ListingCard";
import ListingsMap from "../components/listings/ListingsMap";
import Skeleton from "../components/ui/Skeleton";
import { EmptyState, ErrorState } from "../components/ui/Stateviews";
import { useGetListingsQuery } from "../services/api";
import { selectFavoriteIds } from "../app/favoritesSlice";

const defaultFilters = {
  search: "",
  purpose: "all",
  type: "all",
  neighborhood: "all",
  sort: "newest",
};

export default function Listings() {
  const [filters, setFilters] = useState(defaultFilters);
  const [view, setView] = useState("list"); // "list" | "map"
  const { data, isLoading, isFetching, isError, error, refetch } = useGetListingsQuery(filters);
  const favoriteIds = useSelector(selectFavoriteIds);

  return (
    <div>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-5 lg:px-8 pt-16 pb-10 text-center">
        <p className="text-xs font-mono uppercase tracking-[0.16em] text-sage-600 mb-4">
          {data ? `${data.length} homes available` : "Loading listings…"}
        </p>
        <h1 className="font-display text-4xl sm:text-5xl text-navy-900 mb-4">
          Find your next home
        </h1>
        <p className="text-navy-700/60 max-w-lg mx-auto">
          Cairo, the coast, and everywhere in between — filtered clearly, no
          fine print.
        </p>
      </section>

      <div className="max-w-6xl mx-auto px-5 lg:px-8 pb-6 flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
        <FilterBar filters={filters} onChange={setFilters} />
        <div className="flex items-center gap-1 bg-white/70 border border-navy-700/10 rounded-full p-1 self-start lg:self-auto">
          <button
            onClick={() => setView("list")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
              view === "list" ? "bg-navy-700 text-sand" : "text-navy-700/60"
            }`}
          >
            <List size={13} /> List
          </button>
          <button
            onClick={() => setView("map")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
              view === "map" ? "bg-navy-700 text-sand" : "text-navy-700/60"
            }`}
          >
            <MapIcon size={13} /> Map
          </button>
        </div>
      </div>

      <section className="max-w-6xl mx-auto px-5 lg:px-8 pb-20">
        {isFetching && (
          <p className="text-xs font-mono text-navy-700/40 mb-4">Updating results…</p>
        )}

        {isError && <ErrorState message={error?.data} onRetry={refetch} />}

        {!isError && view === "list" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {isLoading &&
              Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-80" />)}

            {!isLoading && data?.length === 0 && (
              <EmptyState hint="Try widening your search or clearing a filter." />
            )}

            <AnimatePresence>
              {!isLoading &&
                data?.map((listing) => <ListingCard key={listing.id} listing={listing} />)}
            </AnimatePresence>
          </div>
        )}

        {!isError && view === "map" && (
          <>
            {isLoading && <Skeleton className="h-[520px]" />}
            {!isLoading && data?.length === 0 && (
              <EmptyState hint="Try widening your search or clearing a filter." />
            )}
            {!isLoading && data?.length > 0 && (
              <ListingsMap listings={data} favoriteIds={favoriteIds} />
            )}
          </>
        )}
      </section>
    </div>
  );
}
