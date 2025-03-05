import { Link } from "react-router-dom";
import { useFavorites } from "@/hooks/useFavorites";

export function Navbar() {
  const { favorites } = useFavorites();
  const totalItems = favorites.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-primary text-primary-foreground py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Recipe App
        </Link>

        <div className="flex gap-6">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/favorites" className="hover:underline flex items-center">
            Favorites
            {totalItems > 0 && (
              <span className="ml-2 bg-white text-primary rounded-full w-6 h-6 flex items-center justify-center text-sm">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
