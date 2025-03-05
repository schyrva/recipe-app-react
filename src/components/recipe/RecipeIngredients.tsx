import { Ingredient } from "@/types/meal";

interface RecipeIngredientsProps {
  ingredients: Ingredient[];
}

export function RecipeIngredients({ ingredients }: RecipeIngredientsProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Ingredients</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {ingredients.map((ingredient, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
              {index + 1}
            </span>
            <span>
              <strong>{ingredient.name}</strong>
              {ingredient.measure && ` - ${ingredient.measure}`}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
