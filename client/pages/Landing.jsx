import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChefHat,
  Heart,
  Search,
  Users,
  Star,
  Zap,
  BookOpen,
  Clock,
} from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <ChefHat className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">RecipeShare</span>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button asChild variant="ghost">
              <Link to="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8">
              <Badge variant="outline" className="mb-4">
                🍽️ Share • Discover • Cook
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
                Share Your
                <span className="text-primary"> Culinary </span>
                Creations
              </h1>
              <p className="mt-6 text-lg text-muted-foreground md:text-xl">
                Join our community of food lovers to discover amazing recipes,
                share your favorites, and explore cuisines from around the
                world.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="text-lg px-8">
                <Link to="/recipes">
                  <Search className="h-5 w-5 mr-2" />
                  Browse Recipes
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-lg px-8"
              >
                <Link to="/login">
                  <Zap className="h-5 w-5 mr-2" />
                  Try Demo
                </Link>
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">7+</div>
                <div className="text-sm text-muted-foreground">Recipes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">3</div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">4.8</div>
                <div className="text-sm text-muted-foreground">Avg Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">∞</div>
                <div className="text-sm text-muted-foreground">
                  Possibilities
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold">Why Choose RecipeShare?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Everything you need to discover, organize, and share amazing
              recipes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Discover Recipes</CardTitle>
                <CardDescription>
                  Browse thousands of recipes with advanced search and filtering
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Search by ingredients</li>
                  <li>• Filter by difficulty</li>
                  <li>• Sort by ratings</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Save Favorites</CardTitle>
                <CardDescription>
                  Keep track of recipes you love and want to try
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Favorite recipes</li>
                  <li>• Want to try list</li>
                  <li>• Personal collections</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <ChefHat className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Share Your Recipes</CardTitle>
                <CardDescription>
                  Upload your own recipes and share with the community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Easy recipe creation</li>
                  <li>• Photo uploads</li>
                  <li>• Nutritional info</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Community</CardTitle>
                <CardDescription>
                  Connect with fellow food enthusiasts and home cooks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Follow other cooks</li>
                  <li>• Rate recipes</li>
                  <li>• Share experiences</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Smart Features</CardTitle>
                <CardDescription>
                  Helpful tools to make cooking easier and more enjoyable
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Cooking timers</li>
                  <li>• Difficulty levels</li>
                  <li>• Prep & cook times</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Detailed Recipes</CardTitle>
                <CardDescription>
                  Step-by-step instructions with nutritional information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Clear instructions</li>
                  <li>• Ingredient lists</li>
                  <li>• Nutrition facts</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Cooking?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join RecipeShare today and discover your next favorite meal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/signup">Get Started Free</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/recipes">Browse Recipes</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <ChefHat className="h-5 w-5 text-primary" />
              <span className="font-semibold">RecipeShare</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Made with ❤️ for food lovers everywhere
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
