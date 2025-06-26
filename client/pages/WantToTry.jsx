import { useState, useEffect } from "react";
import { RecipeCard } from "@/components/RecipeCard";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { BookOpen, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function WantToTry() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userInteractions, setUserInteractions] = useState({
    favorites: [],
    wantToTry: [],
  });

  useEffect(() => {
    fetchWantToTryRecipes();
    fetchUserInteractions();
  }, []);

  const fetchWantToTryRecipes = async () => {
    try {
      const token = localStorage.getItem("auth-token");
      const response = await fetch("/api/users/want-to-try", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setRecipes(data);
      } else {
        toast.error("Failed to fetch want to try recipes");
      }
    } catch (error) {
      toast.error("Error loading want to try recipes");
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

  const handleToggleFavorite = async (recipeId) => {
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

  const handleToggleWantToTry = async (recipeId) => {
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

        // Remove from local list if removed from want to try
        if (isWantToTry) {
          setRecipes((prev) => prev.filter((recipe) => recipe.id !== recipeId));
        }

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
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-3xl font-bold">Want to Try</h1>
          </div>
          <p className="text-muted-foreground">
            Recipes you've saved to cook later
          </p>
        </div>

        {/* Recipe Grid */}
        {recipes.length > 0 ? (
          <>
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                {recipes.length} recipe{recipes.length !== 1 ? "s" : ""} saved
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recipes.map((recipe) => (
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
          </>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No saved recipes yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Start exploring recipes and save the ones you want to try later.
              You can add recipes to this list from any recipe page.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild>
                <Link to="/recipes">Browse Recipes</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/add-recipe">Add Your Recipe</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
