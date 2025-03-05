import { Meal, FavoriteMeal, Ingredient } from '@/types/meal';

export const filterMealsByCategory = (
  meals: Meal[],
  category: string | null
): Meal[] => {
  if (!category || category === 'All') return meals;
  return meals.filter(meal => meal.strCategory === category);
};

export const combineIngredients = (meals: FavoriteMeal[]): Ingredient[] => {
  const ingredientMap = new Map<string, { name: string; measure: string }>();

  meals.forEach(meal => {
    meal.ingredients.forEach(ingredient => {
      const existing = ingredientMap.get(ingredient.name.toLowerCase());

      if (existing) {
        const numericMeasure = parseFloat(ingredient.measure);
        const existingMeasure = parseFloat(existing.measure);

        if (!isNaN(numericMeasure) && !isNaN(existingMeasure)) {
          const unit = ingredient.measure.replace(/[\d.]/g, '').trim();
          const newMeasure =
            (numericMeasure * meal.quantity + existingMeasure).toString() +
            ' ' +
            unit;
          ingredientMap.set(ingredient.name.toLowerCase(), {
            name: ingredient.name,
            measure: newMeasure,
          });
        } else {
          ingredientMap.set(ingredient.name.toLowerCase(), {
            name: ingredient.name,
            measure: `${existing.measure} + ${ingredient.measure} × ${meal.quantity}`,
          });
        }
      } else {
        const numericMeasure = parseFloat(ingredient.measure);
        if (!isNaN(numericMeasure) && meal.quantity > 1) {
          const unit = ingredient.measure.replace(/[\d.]/g, '').trim();
          const adjustedMeasure =
            (numericMeasure * meal.quantity).toString() + ' ' + unit;

          ingredientMap.set(ingredient.name.toLowerCase(), {
            name: ingredient.name,
            measure: adjustedMeasure,
          });
        } else {
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
