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

export interface MealBasic {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface Ingredient {
  name: string;
  measure: string;
}

export interface FavoriteMeal extends Meal {
  quantity: number;
}

export interface MealCategory {
  strCategory: string;
}

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

export const extractIngredients = (mealData: RawMealData): Ingredient[] => {
  const ingredients: Ingredient[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = mealData[`strIngredient${i}`];
    const measure = mealData[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== '') {
      ingredients.push({
        name: ingredient,
        measure: measure || '',
      });
    }
  }

  return ingredients;
};
