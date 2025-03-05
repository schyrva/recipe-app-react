/**
 * Core meal types
 */

/**
 * Represents a meal with complete information
 */
export interface Meal {
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
  ingredients: Ingredient[];
}

/**
 * Simplified meal model with basic info only
 */
export interface MealBasic {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

/**
 * Represents an ingredient with its name and measure
 */
export interface Ingredient {
  name: string;
  measure: string;
}

/**
 * A meal that has been added to favorites with quantity
 */
export interface FavoriteMeal extends Meal {
  quantity: number;
}

/**
 * Meal category information
 */
export interface MealCategory {
  strCategory: string;
}

/**
 * API related types
 */

/**
 * Raw meal data structure from the MealDB API
 */
export interface RawMealData {
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
  [key: string]: string | null; 
}

/**
 * Response type for meal-related API endpoints
 */
export interface MealApiResponse {
  meals: RawMealData[] | null;
}

/**
 * Response type for the categories API endpoint
 */
export interface CategoryApiResponse {
  categories: {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
  }[];
}

/**
 * Helper functions
 */

/**
 * Transforms raw meal data from the API to our application's Meal type
 */
export const mapToMeal = (rawMeal: RawMealData): Meal => {
  return {
    idMeal: rawMeal.idMeal,
    strMeal: rawMeal.strMeal,
    strCategory: rawMeal.strCategory,
    strArea: rawMeal.strArea,
    strInstructions: rawMeal.strInstructions,
    strMealThumb: rawMeal.strMealThumb,
    strTags: rawMeal.strTags,
    strYoutube: rawMeal.strYoutube,
    strSource: rawMeal.strSource,
    strImageSource: rawMeal.strImageSource,
    dateModified: rawMeal.dateModified,
    ingredients: extractIngredients(rawMeal),
  };
};

/**
 * Extracts ingredients from raw meal data
 */
export const extractIngredients = (mealData: RawMealData): Ingredient[] => {
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
