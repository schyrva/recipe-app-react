import { Link } from "react-router-dom";
import { FavoriteMeal } from "@/types/meal";
import { useFavorites } from "@/hooks/useFavorites";
import { FavoriteRecipeInfo } from "./FavoriteRecipeInfo";
import { QuantityControl } from "./QuantityControl";

interface FavoriteRecipeCardProps {
  meal: FavoriteMeal;
}

export function FavoriteRecipeCard({ meal }: FavoriteRecipeCardProps) {
  const { updateQuantity, removeFavorite } = useFavorites();

  const handleIncrement = () => {
    updateQuantity(meal.idMeal, meal.quantity + 1);
  };

  const handleDecrement = () => {
    if (meal.quantity > 1) {
      updateQuantity(meal.idMeal, meal.quantity - 1);
    }
  };

  const handleRemove = () => {
    removeFavorite(meal.idMeal);
  };

  return (
    <div className="bg-card rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
      <Link to={`/recipe/${meal.idMeal}`} className="md:w-1/4 flex-shrink-0">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-48 md:h-full object-cover"
        />
      </Link>

      <div className="p-4 flex-1 flex flex-col">
        <FavoriteRecipeInfo meal={meal} onRemove={handleRemove} />

        <div className="mt-auto">
          <QuantityControl
            quantity={meal.quantity}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />
        </div>
      </div>
    </div>
  );
}
