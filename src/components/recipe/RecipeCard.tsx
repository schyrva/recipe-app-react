import { Link } from 'react-router-dom';
import { Meal } from '@/types/meal';
import { useFavorites } from '@/hooks/useFavorites';
import { Heart } from 'lucide-react';

interface RecipeCardProps {
  meal: Meal;
}

export function RecipeCard({ meal }: RecipeCardProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const isInFavorites = isFavorite(meal.idMeal);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInFavorites) {
      removeFavorite(meal.idMeal);
    } else {
      addFavorite(meal);
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/recipe/${meal.idMeal}`} className="block">
        <div className="relative">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-48 object-cover"
          />
          <button
            onClick={handleFavoriteToggle}
            className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
            aria-label={
              isInFavorites ? 'Remove from favorites' : 'Add to favorites'
            }
          >
            <Heart
              className={`w-5 h-5 ${
                isInFavorites ? 'fill-red-500 text-red-500' : 'text-gray-500'
              }`}
            />
          </button>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 line-clamp-1">
            {meal.strMeal}
          </h3>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{meal.strCategory}</span>
            <span>{meal.strArea}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
