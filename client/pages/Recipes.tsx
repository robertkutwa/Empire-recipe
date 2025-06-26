import { useState, useEffect } from "react";
import { Recipe } from "@shared/types";
import { RecipeCard } from "@/components/RecipeCard";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, SortAsc } from "lucide-react";
import { toast } from "sonner";

const categories = [
  "All",
  "Breakfast",
  "Lunch",
  "Dinner",
  "Dessert",
  "Appetizer",
  "Snack",
  "Beverage",
];

const difficulties = ["All", "Easy", "Medium", "Hard"];

export default function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [userInteractions, setUserInteractions] = useState<{
    favorites: string[];
    wantToTry: string[];
  }>({ favorites: [], wantToTry: [] });

  useEffect(() => {
    fetchRecipes();
    fetchUserInteractions();
  }, []);

  useEffect(() => {
    filterAndSortRecipes();
  }, [recipes, searchQuery, selectedCategory, selectedDifficulty, sortBy]);

  const fetchRecipes = async () => {
    try {
      const token = localStorage.getItem("auth-token");
      const response = await fetch("/api/recipes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setRecipes(data);
      } else {
        toast.error("Failed to fetch recipes");
      }
    } catch (error) {
      toast.error("Error loading recipes");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserInteractions = async () => {
    try {
      const token = localStorage.getItem("auth-token");
      const response = await fetch("/api/users/interactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserInteractions(data);
      }
    } catch (error) {
      console.error("Error fetching user interactions:", error);
    }
  };

  const filterAndSortRecipes = () => {
    let filtered = [...recipes];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          recipe.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          recipe.ingredients.some((ingredient) =>
            ingredient.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      );
    }

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (recipe) => recipe.category === selectedCategory,
      );
    }

    // Filter by difficulty
    if (selectedDifficulty !== "All") {
      filtered = filtered.filter(
        (recipe) => recipe.difficulty === selectedDifficulty,
      );
    }

    // Sort recipes
    switch (sortBy) {
      case "newest":
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
      case "oldest":
        filtered.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );
        break;
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "cookTime":
        filtered.sort(
          (a, b) => a.cookTime + a.prepTime - (b.cookTime + b.prepTime),
        );
        break;
      default:
        break;
    }

    setFilteredRecipes(filtered);
  };

  const handleToggleFavorite = async (recipeId: string) => {
    try {
      const token = localStorage.getItem("auth-token");
      const isFavorited = userInteractions.favorites.includes(recipeId);

      const response = await fetch(`/api/recipes/${recipeId}/favorite`, {
        method: isFavorited ? "DELETE" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setUserInteractions((prev) => ({
          ...prev,
          favorites: isFavorited
            ? prev.favorites.filter((id) => id !== recipeId)
            : [...prev.favorites, recipeId],
        }));
        toast.success(
          isFavorited ? "Removed from favorites" : "Added to favorites",
        );
      } else {
        toast.error("Failed to update favorites");
      }
    } catch (error) {
      toast.error("Error updating favorites");
    }
  };

  const handleToggleWantToTry = async (recipeId: string) => {
    try {
      const token = localStorage.getItem("auth-token");
      const isWantToTry = userInteractions.wantToTry.includes(recipeId);

      const response = await fetch(`/api/recipes/${recipeId}/want-to-try`, {
        method: isWantToTry ? "DELETE" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setUserInteractions((prev) => ({
          ...prev,
          wantToTry: isWantToTry
            ? prev.wantToTry.filter((id) => id !== recipeId)
            : [...prev.wantToTry, recipeId],
        }));
        toast.success(
          isWantToTry ? "Removed from want to try" : "Added to want to try",
        );
      } else {
        toast.error("Failed to update want to try list");
      }
    } catch (error) {
      toast.error("Error updating want to try list");
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedDifficulty("All");
    setSortBy("newest");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-80 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Discover Recipes</h1>
          <p className="text-muted-foreground">
            Explore thousands of delicious recipes from our community
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search recipes, ingredients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedDifficulty}
                onValueChange={setSelectedDifficulty}
              >
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map((difficulty) => (
                    <SelectItem key={difficulty} value={difficulty}>
                      {difficulty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="cookTime">Cook Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters */}
          <div className="flex flex-wrap gap-2 items-center">
            {(searchQuery ||
              selectedCategory !== "All" ||
              selectedDifficulty !== "All" ||
              sortBy !== "newest") && (
              <>
                <span className="text-sm text-muted-foreground">Filters:</span>
                {searchQuery && (
                  <Badge variant="secondary">Search: {searchQuery}</Badge>
                )}
                {selectedCategory !== "All" && (
                  <Badge variant="secondary">
                    Category: {selectedCategory}
                  </Badge>
                )}
                {selectedDifficulty !== "All" && (
                  <Badge variant="secondary">
                    Difficulty: {selectedDifficulty}
                  </Badge>
                )}
                {sortBy !== "newest" && (
                  <Badge variant="secondary">Sort: {sortBy}</Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="h-6 px-2 text-xs"
                >
                  Clear all
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            {filteredRecipes.length} recipe
            {filteredRecipes.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* Recipe Grid */}
        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onToggleFavorite={handleToggleFavorite}
                onToggleWantToTry={handleToggleWantToTry}
                isFavorited={userInteractions.favorites.includes(recipe.id)}
                isWantToTry={userInteractions.wantToTry.includes(recipe.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No recipes found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or browse all recipes
            </p>
            <Button onClick={clearFilters} variant="outline">
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
