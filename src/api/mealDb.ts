import { CategoryResponse, Ingredient, Meal, MealResponse } from "@/types/meal";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

// Define the raw meal data type from the API
interface RawMealData {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string;
  strSource: string;
  strImageSource: string | null;
  dateModified: string | null;
  [key: string]: string | null; // For strIngredient1, strMeasure1, etc.
}

// Helper function to extract ingredients from meal data
const extractIngredients = (mealData: RawMealData): Ingredient[] => {
  const ingredients: Ingredient[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = mealData[`strIngredient${i}`];
    const measure = mealData[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({
        name: ingredient,
        measure: measure || "",
      });
    }
  }

  return ingredients;
};

// Transform API meal data to our Meal type
const transformMealData = (mealData: RawMealData): Meal => {
  return {
    idMeal: mealData.idMeal,
    strMeal: mealData.strMeal,
    strCategory: mealData.strCategory,
    strArea: mealData.strArea,
    strInstructions: mealData.strInstructions,
    strMealThumb: mealData.strMealThumb,
    strTags: mealData.strTags,
    strYoutube: mealData.strYoutube,
    strSource: mealData.strSource,
    strImageSource: mealData.strImageSource,
    dateModified: mealData.dateModified,
    ingredients: extractIngredients(mealData),
  };
};

// API endpoints
export const mealDbApi = {
  // Search meals by name
  searchMeals: async (query: string): Promise<Meal[]> => {
    try {
      const response = await fetch(`${BASE_URL}/search.php?s=${query}`);
      const data: MealResponse = await response.json();

      if (!data.meals) return [];

      return data.meals.map((meal) =>
        transformMealData(meal as unknown as RawMealData)
      );
    } catch (error) {
      console.error("Error searching meals:", error);
      return [];
    }
  },

  // Get meal by ID
  getMealById: async (id: string): Promise<Meal | null> => {
    try {
      const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
      const data: MealResponse = await response.json();

      if (!data.meals || data.meals.length === 0) return null;

      return transformMealData(data.meals[0] as unknown as RawMealData);
    } catch (error) {
      console.error("Error getting meal by ID:", error);
      return null;
    }
  },

  // Get all categories
  getCategories: async (): Promise<string[]> => {
    try {
      const response = await fetch(`${BASE_URL}/categories.php`);
      const data: CategoryResponse = await response.json();

      return data.categories.map((category) => category.strCategory);
    } catch (error) {
      console.error("Error getting categories:", error);
      return [];
    }
  },

  // Get random meal
  getRandomMeal: async (): Promise<Meal | null> => {
    try {
      const response = await fetch(`${BASE_URL}/random.php`);
      const data: MealResponse = await response.json();

      if (!data.meals || data.meals.length === 0) return null;

      return transformMealData(data.meals[0] as unknown as RawMealData);
    } catch (error) {
      console.error("Error getting random meal:", error);
      return null;
    }
  },

  // Filter by category
  filterByCategory: async (category: string): Promise<Meal[]> => {
    try {
      const response = await fetch(`${BASE_URL}/filter.php?c=${category}`);
      const data: MealResponse = await response.json();

      if (!data.meals) return [];

      // The filter endpoint doesn't return full meal details, so we need to fetch each meal
      const mealPromises = data.meals.map((meal) =>
        mealDbApi.getMealById(meal.idMeal)
      );

      const meals = await Promise.all(mealPromises);
      return meals.filter((meal): meal is Meal => meal !== null);
    } catch (error) {
      console.error("Error filtering by category:", error);
      return [];
    }
  },
};
