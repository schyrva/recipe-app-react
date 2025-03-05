import { Meal } from "@/types/meal";
import apiClient from "./apiClient";
import { CategoryApiResponse, MealApiResponse, mapToMeal } from "./types";

/**
 * MealDB API сервіс
 * Використовує axios для роботи з MealDB API
 */
class MealDbService {
  /**
   * Пошук страв за назвою
   */
  async searchMeals(query: string): Promise<Meal[]> {
    try {
      const { data } = await apiClient.get<MealApiResponse>(`/search.php`, {
        params: { s: query },
      });

      if (!data.meals) return [];

      return data.meals.map(mapToMeal);
    } catch (error) {
      console.error("Error searching meals:", error);
      return [];
    }
  }

  /**
   * Отримання страви за ID
   */
  async getMealById(id: string): Promise<Meal | null> {
    try {
      const { data } = await apiClient.get<MealApiResponse>(`/lookup.php`, {
        params: { i: id },
      });

      if (!data.meals || data.meals.length === 0) return null;

      return mapToMeal(data.meals[0]);
    } catch (error) {
      console.error("Error getting meal by ID:", error);
      return null;
    }
  }

  /**
   * Отримання всіх категорій
   */
  async getCategories(): Promise<string[]> {
    try {
      const { data } = await apiClient.get<CategoryApiResponse>(
        `/categories.php`
      );

      return data.categories.map((category) => category.strCategory);
    } catch (error) {
      console.error("Error getting categories:", error);
      return [];
    }
  }

  /**
   * Отримання випадкової страви
   */
  async getRandomMeal(): Promise<Meal | null> {
    try {
      const { data } = await apiClient.get<MealApiResponse>(`/random.php`);

      if (!data.meals || data.meals.length === 0) return null;

      return mapToMeal(data.meals[0]);
    } catch (error) {
      console.error("Error getting random meal:", error);
      return null;
    }
  }

  /**
   * Фільтрація за категорією
   */
  async filterByCategory(category: string): Promise<Meal[]> {
    try {
      const { data } = await apiClient.get<MealApiResponse>(`/filter.php`, {
        params: { c: category },
      });

      if (!data.meals) return [];

      // Фільтр-endpoint не повертає повні деталі, тому отримуємо кожну страву окремо
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

// Експортуємо єдиний екземпляр сервісу
export const mealDbApi = new MealDbService();
