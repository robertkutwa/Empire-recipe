import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { ChefHat } from "lucide-react";
import Landing from "./Landing";

export default function Index() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <ChefHat className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Loading RecipeShare...</p>
        </div>
      </div>
    );
  }

  // Redirect authenticated users to recipes page
  if (user) {
    return <Navigate to="/recipes" replace />;
  }

  // Show landing page for non-authenticated users
  return <Landing />;
}
