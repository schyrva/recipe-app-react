import { Ingredient, Meal } from "@/types/meal";

// Raw API типи
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
  [key: string]: string | null; // Для strIngredient1, strMeasure1, тощо
}

// API відповіді
export interface MealApiResponse {
  meals: RawMealData[] | null;
}

export interface CategoryApiResponse {
  categories: {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
  }[];
}

// Маппери
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

// Витягує інгредієнти з сирих даних
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
