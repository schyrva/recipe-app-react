import { Meal } from "@/types/meal";
import { RecipeHeader } from "./RecipeHeader";
import { RecipeActions } from "./RecipeActions";
import { RecipeIngredients } from "./RecipeIngredients";
import { RecipeInstructions } from "./RecipeInstructions";
import { RecipeSource } from "./RecipeSource";

interface RecipeDetailProps {
  meal: Meal;
}

export function RecipeDetail({ meal }: RecipeDetailProps) {
  return (
    <div className="bg-card rounded-lg shadow-lg overflow-hidden">
      <RecipeHeader meal={meal} />

      <div className="p-6">
        <RecipeActions meal={meal} />
        <RecipeIngredients ingredients={meal.ingredients} />
        <RecipeInstructions instructions={meal.strInstructions} />
        <RecipeSource source={meal.strSource} />
      </div>
    </div>
  );
}
