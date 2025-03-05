import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FavoriteMeal, Meal } from "@/types/meal";

// Define query key
const FAVORITES_QUERY_KEY = ["favorites"];

export const useFavorites = () => {
  const queryClient = useQueryClient();

  // Read favorites from query cache
  const { data: favorites = [] } = useQuery({
    queryKey: FAVORITES_QUERY_KEY,
    queryFn: () => {
      // On first load, try to get data from localStorage
      const savedFavorites = localStorage.getItem("recipe-app-favorites");
      const initialData = savedFavorites ? JSON.parse(savedFavorites) : [];

      // After initial load, we'll use query cache only
      return initialData as FavoriteMeal[];
    },
    // Enable stale time forever to keep the data in cache
    staleTime: Infinity,
    // Don't refetch when window is focused, we want to manage this data manually
    refetchOnWindowFocus: false,
    // Keep cache data when component unmounts
    gcTime: Infinity,
  });

  // Add a meal to favorites
  const addFavorite = (meal: Meal) => {
    queryClient.setQueryData<FavoriteMeal[]>(
      FAVORITES_QUERY_KEY,
      (prevFavorites = []) => {
        const existingIndex = prevFavorites.findIndex(
          (fav) => fav.idMeal === meal.idMeal
        );

        let newFavorites;
        if (existingIndex >= 0) {
          // Increase quantity if already in favorites
          newFavorites = [...prevFavorites];
          newFavorites[existingIndex] = {
            ...newFavorites[existingIndex],
            quantity: newFavorites[existingIndex].quantity + 1,
          };
        } else {
          // Add new item with quantity 1
          newFavorites = [...prevFavorites, { ...meal, quantity: 1 }];
        }

        // Also update localStorage for persistence between page refreshes
        localStorage.setItem(
          "recipe-app-favorites",
          JSON.stringify(newFavorites)
        );
        return newFavorites;
      }
    );
  };

  // Remove a meal from favorites
  const removeFavorite = (mealId: string) => {
    queryClient.setQueryData<FavoriteMeal[]>(
      FAVORITES_QUERY_KEY,
      (prevFavorites = []) => {
        const newFavorites = prevFavorites.filter(
          (meal) => meal.idMeal !== mealId
        );
        localStorage.setItem(
          "recipe-app-favorites",
          JSON.stringify(newFavorites)
        );
        return newFavorites;
      }
    );
  };

  // Update the quantity of a favorite meal
  const updateQuantity = (mealId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFavorite(mealId);
      return;
    }

    queryClient.setQueryData<FavoriteMeal[]>(
      FAVORITES_QUERY_KEY,
      (prevFavorites = []) => {
        const newFavorites = prevFavorites.map((meal) =>
          meal.idMeal === mealId ? { ...meal, quantity } : meal
        );
        localStorage.setItem(
          "recipe-app-favorites",
          JSON.stringify(newFavorites)
        );
        return newFavorites;
      }
    );
  };

  // Clear all favorites
  const clearFavorites = () => {
    queryClient.setQueryData<FavoriteMeal[]>(FAVORITES_QUERY_KEY, []);
    localStorage.removeItem("recipe-app-favorites");
  };

  // Check if a meal is in favorites
  const isFavorite = (mealId: string) => {
    // Get current data directly from the cache
    const currentFavorites =
      queryClient.getQueryData<FavoriteMeal[]>(FAVORITES_QUERY_KEY) || [];
    return currentFavorites.some((meal) => meal.idMeal === mealId);
  };

  // Get combined ingredients from all favorites
  const getCombinedIngredients = () => {
    const ingredientMap = new Map<string, { name: string; measure: string }>();

    favorites.forEach((meal) => {
      meal.ingredients.forEach((ingredient) => {
        const key = ingredient.name.toLowerCase();

        if (ingredientMap.has(key)) {
          const existing = ingredientMap.get(key)!;
          ingredientMap.set(key, {
            name: ingredient.name,
            measure: `${existing.measure}, ${ingredient.measure} (${meal.strMeal})`,
          });
        } else {
          ingredientMap.set(key, {
            name: ingredient.name,
            measure: `${ingredient.measure} (${meal.strMeal})`,
          });
        }
      });
    });

    return Array.from(ingredientMap.values());
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    updateQuantity,
    clearFavorites,
    isFavorite,
    getCombinedIngredients,
  };
};
