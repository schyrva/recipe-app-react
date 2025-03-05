interface RecipeInstructionsProps {
  instructions: string;
}

export function RecipeInstructions({ instructions }: RecipeInstructionsProps) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Instructions</h2>
      <div className="prose max-w-none">
        {instructions.split("\r\n\r\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
