import { Meal, FavoriteMeal, Ingredient } from "@/types/meal";

/**
 * Filters meals by category
 * @param meals - List of meals to filter
 * @param category - Category to filter by
 * @returns Filtered list of meals
 */
export const filterMealsByCategory = (
  meals: Meal[],
  category: string | null
): Meal[] => {
  if (!category || category === "All") return meals;
  return meals.filter((meal) => meal.strCategory === category);
};

/**
 * Combines ingredients from multiple meals and merges quantities
 * @param meals - List of favorite meals with quantities
 * @returns Combined list of ingredients with aggregated measurements
 */
export const combineIngredients = (meals: FavoriteMeal[]): Ingredient[] => {
  const ingredientMap = new Map<string, { name: string; measure: string }>();

  meals.forEach((meal) => {
    meal.ingredients.forEach((ingredient) => {
      const existing = ingredientMap.get(ingredient.name.toLowerCase());

      if (existing) {
        // Try to combine measurements if possible
        const numericMeasure = parseFloat(ingredient.measure);
        const existingMeasure = parseFloat(existing.measure);

        if (!isNaN(numericMeasure) && !isNaN(existingMeasure)) {
          // If both are numeric, add them and keep the unit
          const unit = ingredient.measure.replace(/[\d.]/g, "").trim();
          const newMeasure =
            (numericMeasure * meal.quantity + existingMeasure).toString() +
            " " +
            unit;
          ingredientMap.set(ingredient.name.toLowerCase(), {
            name: ingredient.name,
            measure: newMeasure,
          });
        } else {
          // If not numeric, just note the multiple occurrences
          ingredientMap.set(ingredient.name.toLowerCase(), {
            name: ingredient.name,
            measure: `${existing.measure} + ${ingredient.measure} × ${meal.quantity}`,
          });
        }
      } else {
        // Handle numeric measures with quantity multiplier
        const numericMeasure = parseFloat(ingredient.measure);
        if (!isNaN(numericMeasure) && meal.quantity > 1) {
          const unit = ingredient.measure.replace(/[\d.]/g, "").trim();
          const adjustedMeasure =
            (numericMeasure * meal.quantity).toString() + " " + unit;

          ingredientMap.set(ingredient.name.toLowerCase(), {
            name: ingredient.name,
            measure: adjustedMeasure,
          });
        } else {
          // Just store as is for non-numeric or quantity = 1
          ingredientMap.set(ingredient.name.toLowerCase(), {
            name: ingredient.name,
            measure:
              meal.quantity > 1
                ? `${ingredient.measure} × ${meal.quantity}`
                : ingredient.measure,
          });
        }
      }
    });
  });

  return Array.from(ingredientMap.values());
};

/**
 * Calculates pagination data
 * @param items - Total list of items
 * @param currentPage - Current page number (0-indexed)
 * @param itemsPerPage - Number of items per page
 * @returns Sliced items for the current page and total page count
 */
export const getPaginatedItems = <T>(
  items: T[],
  currentPage: number,
  itemsPerPage: number
): { pageItems: T[]; pageCount: number } => {
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageItems = items.slice(startIndex, endIndex);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  return { pageItems, pageCount };
};
