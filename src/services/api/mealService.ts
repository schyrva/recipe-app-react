import {
  Meal,
  CategoryApiResponse,
  MealApiResponse,
  mapToMeal,
} from "@/types/meal";
import apiClient from "./apiClient";
import { API_ENDPOINTS } from "@/constants/api";

class MealService {
  async searchMeals(query: string): Promise<Meal[]> {
    try {
      const { data } = await apiClient.get<MealApiResponse>(
        API_ENDPOINTS.SEARCH,
        {
          params: { s: query },
        }
      );

      if (!data.meals) return [];

      return data.meals.map(mapToMeal);
    } catch (error) {
      console.error("Error searching meals:", error);
      return [];
    }
  }

  async getMealById(id: string): Promise<Meal | null> {
    try {
      const { data } = await apiClient.get<MealApiResponse>(
        API_ENDPOINTS.LOOKUP,
        {
          params: { i: id },
        }
      );

      if (!data.meals || data.meals.length === 0) return null;

      return mapToMeal(data.meals[0]);
    } catch (error) {
      console.error("Error getting meal by ID:", error);
      return null;
    }
  }

  async getCategories(): Promise<string[]> {
    try {
      const { data } = await apiClient.get<CategoryApiResponse>(
        API_ENDPOINTS.CATEGORIES
      );

      return data.categories.map((category) => category.strCategory);
    } catch (error) {
      console.error("Error getting categories:", error);
      return [];
    }
  }

  async getRandomMeal(): Promise<Meal | null> {
    try {
      const { data } = await apiClient.get<MealApiResponse>(
        API_ENDPOINTS.RANDOM
      );

      if (!data.meals || data.meals.length === 0) {
        console.error("No random meal found");
        return null;
      }

      return mapToMeal(data.meals[0]);
    } catch (error) {
      console.error("Error getting random meal:", error);
      return null;
    }
  }

  async filterByCategory(category: string): Promise<Meal[]> {
    try {
      const { data } = await apiClient.get<MealApiResponse>(
        API_ENDPOINTS.FILTER,
        {
          params: { c: category },
        }
      );

      if (!data.meals) {
        console.error("No meals found for category:", category);
        return [];
      }

      const mealPromises = data.meals.map((meal) =>
        this.getMealById(meal.idMeal)
      );

      const meals = await Promise.all(mealPromises);
      return meals.filter((meal): meal is Meal => meal !== null);
    } catch (error) {
      console.error("Error filtering by category:", error);
      return [];
    }
  }
}

// Export a singleton instance
export const mealService = new MealService();
