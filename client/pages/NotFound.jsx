import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChefHat, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="text-center max-w-md mx-auto">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-primary/10 rounded-full">
            <ChefHat className="h-16 w-16 text-primary" />
          </div>
        </div>

        <h1 className="text-6xl font-bold text-muted-foreground mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Recipe Not Found</h2>
        <p className="text-muted-foreground mb-8">
          Looks like this page got burned in the kitchen! The recipe you're
          looking for doesn't exist.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="default">
            <Link to="/recipes" className="flex items-center space-x-2">
              <Home className="h-4 w-4" />
              <span>Browse Recipes</span>
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            onClick={() => window.history.back()}
          >
            <span className="flex items-center space-x-2 cursor-pointer">
              <ArrowLeft className="h-4 w-4" />
              <span>Go Back</span>
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
