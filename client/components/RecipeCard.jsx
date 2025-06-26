import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Clock,
  Users,
  Star,
  Heart,
  BookOpen,
  MoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function RecipeCard({
  recipe,
  onToggleFavorite,
  onToggleWantToTry,
  isFavorited = false,
  isWantToTry = false,
  showAuthor = true,
}) {
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

  return (
    <Card className="recipe-card group overflow-hidden transition-all duration-200 hover:shadow-lg">
      <div className="relative">
        {recipe.image ? (
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20 flex items-center justify-center">
            <BookOpen className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
        <div className="absolute top-2 left-2">
          <Badge
            className={cn(
              "difficulty-badge",
              getDifficultyColor(recipe.difficulty),
            )}
          >
            {recipe.difficulty}
          </Badge>
        </div>
        <div className="absolute top-2 right-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 bg-background/80 backdrop-blur-sm hover:bg-background/90"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {onToggleFavorite && (
                <DropdownMenuItem
                  onClick={() => onToggleFavorite(recipe.id)}
                  className="flex items-center space-x-2"
                >
                  <Heart
                    className={cn(
                      "h-4 w-4",
                      isFavorited ? "fill-red-500 text-red-500" : "",
                    )}
                  />
                  <span>
                    {isFavorited ? "Remove from favorites" : "Add to favorites"}
                  </span>
                </DropdownMenuItem>
              )}
              {onToggleWantToTry && (
                <DropdownMenuItem
                  onClick={() => onToggleWantToTry(recipe.id)}
                  className="flex items-center space-x-2"
                >
                  <BookOpen
                    className={cn(
                      "h-4 w-4",
                      isWantToTry ? "fill-blue-500 text-blue-500" : "",
                    )}
                  />
                  <span>
                    {isWantToTry ? "Remove from want to try" : "Want to try"}
                  </span>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg line-clamp-2">
              <Link
                to={`/recipes/${recipe.id}`}
                className="hover:text-primary transition-colors"
              >
                {recipe.title}
              </Link>
            </CardTitle>
            <CardDescription className="line-clamp-2 mt-1">
              {recipe.description}
            </CardDescription>
          </div>
          {recipe.rating && (
            <div className="flex items-center space-x-1 ml-2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">
                {recipe.rating.toFixed(1)}
              </span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{recipe.cookTime + recipe.prepTime}m</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{recipe.servings}</span>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            {recipe.category}
          </Badge>
        </div>

        {showAuthor && recipe.author && (
          <div className="flex items-center space-x-2 pt-3 border-t">
            <Avatar className="h-6 w-6">
              <AvatarImage
                src={recipe.author.avatar}
                alt={recipe.author.name}
              />
              <AvatarFallback className="text-xs">
                {recipe.author.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">
              by {recipe.author.name}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
