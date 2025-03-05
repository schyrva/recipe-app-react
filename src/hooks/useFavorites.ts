import { useState, useEffect } from "react";
import { FavoriteMeal, Meal } from "@/types/meal";

const FAVORITES_STORAGE_KEY = "recipe-app-favorites";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteMeal[]>(() => {
    // Initialize from localStorage if available
    const savedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // Save to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  // Add a meal to favorites
  const addFavorite = (meal: Meal) => {
    setFavorites((prev) => {
      const existingIndex = prev.findIndex((fav) => fav.idMeal === meal.idMeal);

      if (existingIndex >= 0) {
        // Increase quantity if already in favorites
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        return updated;
      } else {
        // Add new item with quantity 1
        return [...prev, { ...meal, quantity: 1 }];
      }
    });
  };

  // Remove a meal from favorites
  const removeFavorite = (mealId: string) => {
    setFavorites((prev) => prev.filter((meal) => meal.idMeal !== mealId));
  };

  // Update the quantity of a favorite meal
  const updateQuantity = (mealId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFavorite(mealId);
      return;
    }

    setFavorites((prev) =>
      prev.map((meal) =>
        meal.idMeal === mealId ? { ...meal, quantity } : meal
      )
    );
  };

  // Clear all favorites
  const clearFavorites = () => {
    setFavorites([]);
  };

  // Check if a meal is in favorites
  const isFavorite = (mealId: string) => {
    return favorites.some((meal) => meal.idMeal === mealId);
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
