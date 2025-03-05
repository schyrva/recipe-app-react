import { Meal } from "@/types/meal";

interface RecipeHeaderProps {
  meal: Meal;
}

export function RecipeHeader({ meal }: RecipeHeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold mb-2">{meal.strMeal}</h1>
      <div className="flex gap-2 text-gray-600">
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
