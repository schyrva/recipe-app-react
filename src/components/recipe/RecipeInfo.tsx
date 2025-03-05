import { Meal } from "@/types/meal";

interface RecipeInfoProps {
  meal: Meal;
}

export function RecipeInfo({ meal }: RecipeInfoProps) {
  return (
    <div className="flex flex-col gap-1 py-3 px-4">
      <h3 className="font-semibold text-lg truncate">{meal.strMeal}</h3>
      <div className="flex gap-2 text-sm text-gray-600">
        <span>{meal.strCategory}</span>
        {meal.strArea && (
          <>
            <span>•</span>
            <span>{meal.strArea}</span>
          </>
        )}
      </div>
    </div>
  );
}
