import { useQuery } from "@tanstack/react-query";
import { mealService } from "@/services/api/mealService";
import { MIN_SEARCH_QUERY_LENGTH } from "@/constants/api";

export const useMealsSearch = (
  query: string,
  minQueryLength = MIN_SEARCH_QUERY_LENGTH
) => {
  return useQuery({
    queryKey: ["meals", "search", query],
    queryFn: () => mealService.searchMeals(query),
    enabled: query.length >= minQueryLength,
    staleTime: 5 * 60 * 1000,
  });
};

export const useMealById = (id: string) => {
  return useQuery({
    queryKey: ["meals", "detail", id],
    queryFn: () => mealService.getMealById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => mealService.getCategories(),
    staleTime: 30 * 60 * 1000,
  });
};

export const useRandomMeal = () => {
  return useQuery({
    queryKey: ["meals", "random"],
    queryFn: () => mealService.getRandomMeal(),
  });
};
