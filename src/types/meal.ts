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

export interface Ingredient {
  name: string;
  measure: string;
}

export interface MealResponse {
  meals: Meal[] | null;
}

export type MealCategory = {
  strCategory: string;
};

export interface CategoryResponse {
  categories: MealCategory[];
}

export type FavoriteMeal = Meal & {
  quantity: number;
};
