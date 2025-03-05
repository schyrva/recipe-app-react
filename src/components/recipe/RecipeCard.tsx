import { Link } from "react-router-dom";
import { Meal } from "@/types/meal";
import { RecipeImage } from "./RecipeImage";
import { RecipeInfo } from "./RecipeInfo";

interface RecipeCardProps {
  meal: Meal;
}

export function RecipeCard({ meal }: RecipeCardProps) {
  return (
    <div className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/recipe/${meal.idMeal}`} className="block">
        <RecipeImage meal={meal} />
        <RecipeInfo meal={meal} />
      </Link>
    </div>
  );
}
