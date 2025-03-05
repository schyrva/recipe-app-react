import {
  Meal,
  CategoryApiResponse,
  MealApiResponse,
  mapToMeal,
} from "@/types/meal";
import apiClient from "./apiClient";
import { API_ENDPOINTS } from "@/constants/api";

/**
 * Service for interacting with the MealDB API
 */
class MealService {
  /**
   * Search for meals by name
   * @param query - The search query
   * @returns Array of meals matching the query
   */
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

  /**
   * Get meal details by ID
   * @param id - The meal ID
   * @returns Meal details or null if not found
   */
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

  /**
   * Get all available meal categories
   * @returns Array of category names
   */
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

  /**
   * Get a random meal
   * @returns Random meal or null if API fails
   */
  async getRandomMeal(): Promise<Meal | null> {
    try {
      const { data } = await apiClient.get<MealApiResponse>(
        API_ENDPOINTS.RANDOM
      );

      if (!data.meals || data.meals.length === 0) return null;

      return mapToMeal(data.meals[0]);
    } catch (error) {
      console.error("Error getting random meal:", error);
      return null;
    }
  }

  /**
   * Filter meals by category
   * @param category - The category to filter by
   * @returns Array of meals in the specified category
   */
  async filterByCategory(category: string): Promise<Meal[]> {
    try {
      const { data } = await apiClient.get<MealApiResponse>(
        API_ENDPOINTS.FILTER,
        {
          params: { c: category },
        }
      );

      if (!data.meals) return [];

      
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


export const mealService = new MealService();
