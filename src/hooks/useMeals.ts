import { useQuery } from "@tanstack/react-query";
import { mealDbApi } from "@/api/mealDb";
import { Meal } from "@/types/meal";

export const useMealsSearch = (query: string, minQueryLength = 1) => {
  return useQuery({
    queryKey: ["meals", "search", query],
    queryFn: () => mealDbApi.searchMeals(query),
    enabled: query.length >= minQueryLength,
    staleTime: 5 * 60 * 1000,
  });
};

export const useMealById = (id: string) => {
  return useQuery({
    queryKey: ["meals", "detail", id],
    queryFn: () => mealDbApi.getMealById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => mealDbApi.getCategories(),
    staleTime: 30 * 60 * 1000,
  });
};

export const useRandomMeal = () => {
  return useQuery({
    queryKey: ["meals", "random"],
    queryFn: () => mealDbApi.getRandomMeal(),
  });
};

export const filterMealsByCategory = (
  meals: Meal[],
  category: string | null
): Meal[] => {
  if (!category || category === "All") return meals;
  return meals.filter((meal) => meal.strCategory === category);
};
