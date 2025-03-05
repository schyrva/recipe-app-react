import { Meal } from "@/types/meal";
import { useFavorites } from "@/hooks/useFavorites";
import { Heart } from "lucide-react";
import { RecipeYoutubeLink } from "./RecipeYoutubeLink";

interface RecipeActionsProps {
  meal: Meal;
}

export function RecipeActions({ meal }: RecipeActionsProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const isInFavorites = isFavorite(meal.idMeal);

  const handleFavoriteToggle = () => {
    if (isInFavorites) {
      removeFavorite(meal.idMeal);
    } else {
      addFavorite(meal);
    }
  };

  return (
    <div className="flex gap-3 mb-6">
      <button
        onClick={handleFavoriteToggle}
        className={`flex items-center gap-2 px-4 py-2 rounded-md ${
          isInFavorites
            ? "bg-red-100 text-red-600"
            : "bg-gray-100 text-gray-600"
        } hover:opacity-90 transition-colors`}
      >
        <Heart
          className={`w-5 h-5 ${
            isInFavorites ? "fill-red-500 text-red-500" : ""
          }`}
        />
        <span>
          {isInFavorites ? "Remove from favorites" : "Add to favorites"}
        </span>
      </button>

      <RecipeYoutubeLink youtubeUrl={meal.strYoutube} />
    </div>
  );
}
