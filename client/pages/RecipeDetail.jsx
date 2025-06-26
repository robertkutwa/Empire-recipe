import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Clock,
  Users,
  Star,
  Heart,
  BookOpen,
  ChefHat,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { format } from "date-fns";

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userInteractions, setUserInteractions] = useState({
    favorites: [],
    wantToTry: [],
  });

  useEffect(() => {
    if (id) {
      fetchRecipe();
      fetchUserInteractions();
    }
  }, [id]);

  const fetchRecipe = async () => {
    try {
      const token = localStorage.getItem("auth-token");
      const headers = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(`/api/recipes/${id}`, {
        headers,
      });

      if (response.ok) {
        const data = await response.json();
        setRecipe(data);
      } else if (response.status === 404) {
        navigate("/404");
      } else {
        toast.error("Failed to fetch recipe");
      }
    } catch (error) {
      toast.error("Error loading recipe");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserInteractions = async () => {
    const token = localStorage.getItem("auth-token");
    if (!token) return; // Skip if not authenticated

    try {
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

  const handleToggleFavorite = async () => {
    if (!recipe) return;

    const token = localStorage.getItem("auth-token");
    if (!token) {
      toast.error("Please sign in to add favorites");
      return;
    }

    try {
      const isFavorited = userInteractions.favorites.includes(recipe.id);

      const response = await fetch(`/api/recipes/${recipe.id}/favorite`, {
        method: isFavorited ? "DELETE" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setUserInteractions((prev) => ({
          ...prev,
          favorites: isFavorited
            ? prev.favorites.filter((id) => id !== recipe.id)
            : [...prev.favorites, recipe.id],
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

  const handleToggleWantToTry = async () => {
    if (!recipe) return;

    const token = localStorage.getItem("auth-token");
    if (!token) {
      toast.error("Please sign in to add to want to try list");
      return;
    }

    try {
      const isWantToTry = userInteractions.wantToTry.includes(recipe.id);

      const response = await fetch(`/api/recipes/${recipe.id}/want-to-try`, {
        method: isWantToTry ? "DELETE" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setUserInteractions((prev) => ({
          ...prev,
          wantToTry: isWantToTry
            ? prev.wantToTry.filter((id) => id !== recipe.id)
            : [...prev.wantToTry, recipe.id],
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

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "difficulty-easy";
      case "medium":
        return "difficulty-medium";
      case "hard":
        return "difficulty-hard";
      default:
        return "difficulty-easy";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-64 bg-muted rounded-lg" />
            <div className="space-y-4">
              <div className="h-8 bg-muted rounded w-1/2" />
              <div className="h-4 bg-muted rounded w-3/4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Recipe not found</h1>
          <Button asChild>
            <Link to="/recipes">Browse Recipes</Link>
          </Button>
        </div>
      </div>
    );
  }

  const isFavorited = userInteractions.favorites.includes(recipe.id);
  const isWantToTry = userInteractions.wantToTry.includes(recipe.id);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container py-6 max-w-4xl">
        {/* Back button */}
        <Button variant="ghost" className="mb-6" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        {/* Hero section */}
        <div className="mb-8">
          {recipe.image ? (
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-64 md:h-80 object-cover rounded-lg mb-6"
            />
          ) : (
            <div className="w-full h-64 md:h-80 bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20 flex items-center justify-center rounded-lg mb-6">
              <ChefHat className="h-16 w-16 text-muted-foreground" />
            </div>
          )}

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge
                  className={cn(
                    "difficulty-badge",
                    getDifficultyColor(recipe.difficulty),
                  )}
                >
                  {recipe.difficulty}
                </Badge>
                <Badge variant="outline">{recipe.category}</Badge>
              </div>
              <h1 className="text-3xl font-bold mb-2">{recipe.title}</h1>
              <p className="text-muted-foreground mb-4">{recipe.description}</p>

              {/* Recipe stats */}
              <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">
                    {recipe.prepTime + recipe.cookTime} min total
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">{recipe.servings} servings</span>
                </div>
                {recipe.rating && (
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">
                      {recipe.rating.toFixed(1)}
                    </span>
                  </div>
                )}
              </div>

              {/* Author */}
              {recipe.author && (
                <div className="flex items-center space-x-3 mb-6">
                  <Avatar>
                    <AvatarImage
                      src={recipe.author.avatar}
                      alt={recipe.author.name}
                    />
                    <AvatarFallback>
                      {recipe.author.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">
                      by {recipe.author.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(recipe.createdAt), "MMM d, yyyy")}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-2 md:w-48">
              <Button
                onClick={handleToggleFavorite}
                variant={isFavorited ? "default" : "outline"}
                className="w-full"
              >
                <Heart
                  className={cn(
                    "h-4 w-4 mr-2",
                    isFavorited ? "fill-current" : "",
                  )}
                />
                {isFavorited ? "Favorited" : "Add to Favorites"}
              </Button>
              <Button
                onClick={handleToggleWantToTry}
                variant={isWantToTry ? "default" : "outline"}
                className="w-full"
              >
                <BookOpen
                  className={cn(
                    "h-4 w-4 mr-2",
                    isWantToTry ? "fill-current" : "",
                  )}
                />
                {isWantToTry ? "Want to Try" : "Add to Want to Try"}
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Ingredients */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Ingredients</CardTitle>
              <CardDescription>
                Everything you need for {recipe.servings} servings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                    <span className="text-sm">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Instructions</CardTitle>
              <CardDescription>Step-by-step cooking guide</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recipe.instructions.map((instruction, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <p className="text-sm leading-relaxed pt-1">
                      {instruction}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
