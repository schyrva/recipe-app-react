import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FavoriteMeal, Meal } from "@/types/meal";
import { combineIngredients } from "@/utils/mealUtils";

const FAVORITES_QUERY_KEY = ["favorites"];
const FAVORITES_STORAGE_KEY = "recipe-app-favorites";

export const useFavorites = () => {
  const queryClient = useQueryClient();

  const { data: favorites = [] } = useQuery({
    queryKey: FAVORITES_QUERY_KEY,
    queryFn: () => {
      const savedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
      const initialData = savedFavorites ? JSON.parse(savedFavorites) : [];

      return initialData as FavoriteMeal[];
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    gcTime: Infinity,
  });

  const addFavorite = (meal: Meal) => {
    queryClient.setQueryData<FavoriteMeal[]>(
      FAVORITES_QUERY_KEY,
      (prevFavorites = []) => {
        const existingIndex = prevFavorites.findIndex(
          (fav) => fav.idMeal === meal.idMeal
        );

        let newFavorites;
        if (existingIndex >= 0) {
          newFavorites = [...prevFavorites];
          newFavorites[existingIndex] = {
            ...newFavorites[existingIndex],
            quantity: newFavorites[existingIndex].quantity + 1,
          };
        } else {
          newFavorites = [...prevFavorites, { ...meal, quantity: 1 }];
        }

        localStorage.setItem(
          FAVORITES_STORAGE_KEY,
          JSON.stringify(newFavorites)
        );
        return newFavorites;
      }
    );
  };

  const removeFavorite = (mealId: string) => {
    queryClient.setQueryData<FavoriteMeal[]>(
      FAVORITES_QUERY_KEY,
      (prevFavorites = []) => {
        const newFavorites = prevFavorites.filter(
          (meal) => meal.idMeal !== mealId
        );
        localStorage.setItem(
          FAVORITES_STORAGE_KEY,
          JSON.stringify(newFavorites)
        );
        return newFavorites;
      }
    );
  };

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
          FAVORITES_STORAGE_KEY,
          JSON.stringify(newFavorites)
        );
        return newFavorites;
      }
    );
  };

  const clearFavorites = () => {
    queryClient.setQueryData<FavoriteMeal[]>(FAVORITES_QUERY_KEY, []);
    localStorage.removeItem(FAVORITES_STORAGE_KEY);
  };

  const isFavorite = (mealId: string) => {
    const currentFavorites =
      queryClient.getQueryData<FavoriteMeal[]>(FAVORITES_QUERY_KEY) || [];
    return {
      isFavorite: currentFavorites.some((meal) => meal.idMeal === mealId),
      favorites: currentFavorites,
    };
  };

  const getCombinedIngredients = () => {
    return combineIngredients(favorites);
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
