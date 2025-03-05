import { Meal } from "@/types/meal";
import { RecipeCard } from "./RecipeCard";

interface RecipeGridProps {
  meals: Meal[];
  isLoading?: boolean;
}

export function RecipeGrid({ meals, isLoading = false }: RecipeGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="bg-card rounded-lg shadow-md overflow-hidden animate-pulse"
          >
            <div className="w-full h-48 bg-muted"></div>
            <div className="p-4">
              <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
              <div className="flex justify-between">
                <div className="h-4 bg-muted rounded w-1/3"></div>
                <div className="h-4 bg-muted rounded w-1/3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (meals.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-muted-foreground">
          No recipes found
        </h3>
        <p className="mt-2">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {meals.map((meal) => (
        <RecipeCard key={meal.idMeal} meal={meal} />
      ))}
    </div>
  );
}
