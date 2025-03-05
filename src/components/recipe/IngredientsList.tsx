interface Ingredient {
  name: string;
  measure: string;
}

interface IngredientsListProps {
  ingredients: Ingredient[];
  title?: string;
}

export function IngredientsList({
  ingredients,
  title = "Combined Ingredients",
}: IngredientsListProps) {
  if (ingredients.length === 0) {
    return (
      <div className="bg-card rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="text-muted-foreground">No ingredients to display.</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <ul className="divide-y divide-border">
        {ingredients.map((ingredient, index) => (
          <li key={index} className="py-3 flex justify-between">
            <span className="font-medium">{ingredient.name}</span>
            <span className="text-muted-foreground">{ingredient.measure}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
