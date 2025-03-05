import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { FavoriteMeal } from "@/types/meal";

interface FavoriteRecipeInfoProps {
  meal: FavoriteMeal;
  onRemove: () => void;
}

export function FavoriteRecipeInfo({
  meal,
  onRemove,
}: FavoriteRecipeInfoProps) {
  return (
    <>
      <div className="flex justify-between items-start mb-2">
        <Link to={`/recipe/${meal.idMeal}`} className="hover:underline">
          <h3 className="font-bold text-lg">{meal.strMeal}</h3>
        </Link>
        <button
          onClick={onRemove}
          className="text-muted-foreground hover:text-destructive transition-colors"
          aria-label="Remove from favorites"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="text-sm text-muted-foreground mb-4">
        <span>{meal.strCategory}</span>
        <span className="mx-2">•</span>
        <span>{meal.strArea}</span>
      </div>
    </>
  );
}
