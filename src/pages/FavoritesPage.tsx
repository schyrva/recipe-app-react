import { useFavorites } from '@/hooks/useFavorites';
import { FavoriteRecipeCard } from '@/components/recipe/FavoriteRecipeCard';
import { IngredientsList } from '@/components/recipe/IngredientsList';
import { Trash2 } from 'lucide-react';

export function FavoritesPage() {
  const { favorites, clearFavorites, getCombinedIngredients } = useFavorites();
  const combinedIngredients = getCombinedIngredients();

  if (favorites.length === 0) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold mb-6">Favorite Recipes</h1>
        <div className="max-w-md mx-auto bg-card rounded-lg shadow-md p-8">
          <h2 className="text-xl font-medium mb-4">No favorites yet</h2>
          <p className="text-muted-foreground mb-6">
            Add recipes to your favorites to see them here and create a combined
            ingredients list.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Browse Recipes
          </a>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Favorite Recipes</h1>
        <button
          onClick={clearFavorites}
          className="flex items-center gap-2 px-4 py-2 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-colors"
        >
          <Trash2 size={18} />
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold mb-4">Your Recipes</h2>
          <div className="space-y-4">
            {favorites.map(meal => (
              <FavoriteRecipeCard key={meal.idMeal} meal={meal} />
            ))}
          </div>
        </div>

        <div>
          <div className="sticky top-8">
            <IngredientsList
              ingredients={combinedIngredients}
              title="Combined Ingredients"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
