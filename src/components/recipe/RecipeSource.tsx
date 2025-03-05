interface RecipeSourceProps {
  source: string | null;
}

export function RecipeSource({ source }: RecipeSourceProps) {
  if (!source) {
    return null;
  }

  return (
    <div className="mt-6 text-sm text-muted-foreground">
      <span>Source: </span>
      <a
        href={source}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:underline"
      >
        {new URL(source).hostname}
      </a>
    </div>
  );
}
