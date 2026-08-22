import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Heart } from "lucide-react";
import { selectFavoriteIds } from "../../app/favoritesSlice";

export default function Navbar() {
  const favCount = useSelector(selectFavoriteIds).length;

  return (
    <header className="sticky top-0 z-40 bg-sand/90 backdrop-blur-md border-b border-navy-700/[0.06]">
      <div className="max-w-6xl mx-auto px-5 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-full bg-navy-700 text-sand flex items-center justify-center font-display text-base">
            M
          </span>
          <span className="font-display text-xl text-navy-800">Marsa Estates</span>
        </Link>
        <Link
          to="/favorites"
          className="flex items-center gap-2 text-sm text-navy-700 hover:text-navy-900 transition-colors"
        >
          <Heart size={17} className={favCount > 0 ? "fill-red-500 text-red-500" : ""} />
          <span className="hidden sm:inline">Saved</span>
          {favCount > 0 && (
            <span className="text-xs font-mono bg-navy-700 text-sand rounded-full w-5 h-5 flex items-center justify-center">
              {favCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
