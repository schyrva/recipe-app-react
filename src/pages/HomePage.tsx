import { useState, useEffect } from "react";
import { useMealsSearch, } from "@/hooks/useMeals";
import { useDebounce } from "use-debounce";
import { SearchBar } from "@/components/recipe/SearchBar";
import { CategoryFilter } from "@/components/recipe/CategoryFilter";
import { RecipeGrid } from "@/components/recipe/RecipeGrid";
import { Pagination } from "@/components/recipe/Pagination";
import { Meal } from "@/types/meal";
import { filterMealsByCategory } from "@/utils/mealUtils";

const ITEMS_PER_PAGE = 8;

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [paginatedMeals, setPaginatedMeals] = useState<Meal[]>([]);

  const {
    data: meals = [],
    isLoading,
    isError,
  } = useMealsSearch(debouncedSearchQuery || "a", 1);

  const filteredMeals = selectedCategory
    ? filterMealsByCategory(meals, selectedCategory)
    : meals;

  const pageCount = Math.ceil(filteredMeals.length / ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(0);
  }, [selectedCategory, debouncedSearchQuery]);

  useEffect(() => {
    const startIndex = currentPage * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setPaginatedMeals(filteredMeals.slice(startIndex, endIndex));
  }, [filteredMeals, currentPage]);

  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Discover Recipes</h1>
        <div className="space-y-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search for recipes..."
          />
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>
      </div>

      {isError ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-destructive">
            Error loading recipes
          </h3>
          <p className="mt-2">Please try again later</p>
        </div>
      ) : (
        <>
          <RecipeGrid meals={paginatedMeals} isLoading={isLoading} />
          <Pagination
            pageCount={pageCount}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
