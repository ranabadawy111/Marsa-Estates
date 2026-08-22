import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ListingCard from "../components/listings/ListingCard";
import { EmptyState } from "../components/ui/Stateviews";
import Button from "../components/ui/Button";
import { useGetListingsQuery } from "../services/api";
import { selectFavoriteIds } from "../app/favoritesSlice";

export default function Favorites() {
  const favIds = useSelector(selectFavoriteIds);
  const { data } = useGetListingsQuery({});
  const favListings = (data || []).filter((l) => favIds.includes(l.id));

  return (
    <div className="max-w-6xl mx-auto px-5 lg:px-8 py-14">
      <h1 className="font-display text-4xl text-navy-900 mb-2">Saved homes</h1>
      <p className="text-navy-700/60 mb-10">
        {favListings.length} {favListings.length === 1 ? "listing" : "listings"} you've favorited.
      </p>

      {favListings.length === 0 ? (
        <div>
          <EmptyState
            title="Nothing saved yet"
            hint="Tap the heart on any listing to keep it here."
          />
          <div className="text-center mt-4">
            <Link to="/">
              <Button variant="secondary" size="sm">Browse listings</Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {favListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}
