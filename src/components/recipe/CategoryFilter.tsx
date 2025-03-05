import { useCategories } from "@/hooks/useMeals";

interface CategoryFilterProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export function CategoryFilter({
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  const { data: categories = [], isLoading } = useCategories();

  if (isLoading) {
    return (
      <div className="flex gap-2 overflow-x-auto pb-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-10 w-24 bg-muted rounded-full animate-pulse"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      <button
        onClick={() => onSelectCategory(null)}
        className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors cursor-pointer ${
          selectedCategory === null
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        }`}
      >
        All Categories
      </button>

      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors cursor-pointer ${
            selectedCategory === category
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
