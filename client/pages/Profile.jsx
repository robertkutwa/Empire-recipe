import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { RecipeCard } from "@/components/RecipeCard";
import {
  User,
  MapPin,
  Calendar,
  Mail,
  ChefHat,
  Heart,
  Edit,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

export default function Profile() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [myRecipes, setMyRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    dateOfBirth: user?.dateOfBirth || "",
    location: user?.location || "",
    bio: user?.bio || "",
    avatar: user?.avatar || "",
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name,
        dateOfBirth: user.dateOfBirth || "",
        location: user.location || "",
        bio: user.bio || "",
        avatar: user.avatar || "",
      });
      fetchMyRecipes();
      fetchFavoriteRecipes();
    }
  }, [user]);

  const fetchMyRecipes = async () => {
    try {
      const token = localStorage.getItem("auth-token");
      const response = await fetch("/api/users/my-recipes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMyRecipes(data);
      }
    } catch (error) {
      console.error("Error fetching my recipes:", error);
    }
  };

  const fetchFavoriteRecipes = async () => {
    try {
      const token = localStorage.getItem("auth-token");
      const response = await fetch("/api/users/favorites", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setFavoriteRecipes(data);
      }
    } catch (error) {
      console.error("Error fetching favorite recipes:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("auth-token");
      const response = await fetch("/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        toast.success("Profile updated successfully!");
        setIsEditing(false);
        // Refresh user data
        window.location.reload();
      } else {
        const error = await response.json();
        toast.error(error.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return null;
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container py-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profileData.avatar} alt={user.name} />
                    <AvatarFallback className="text-2xl">
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-xl">{user.name}</CardTitle>
                <CardDescription>
                  Member since {format(new Date(user.createdAt), "MMMM yyyy")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!isEditing ? (
                  <>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{user.email}</span>
                      </div>

                      {user.dateOfBirth && (
                        <div className="flex items-center space-x-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {calculateAge(user.dateOfBirth)} years old
                          </span>
                        </div>
                      )}

                      {user.location && (
                        <div className="flex items-center space-x-2 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{user.location}</span>
                        </div>
                      )}
                    </div>

                    {user.bio && (
                      <>
                        <Separator />
                        <div>
                          <h4 className="text-sm font-medium mb-2">About</h4>
                          <p className="text-sm text-muted-foreground">
                            {user.bio}
                          </p>
                        </div>
                      </>
                    )}

                    <Separator />
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-lg font-semibold">
                          {myRecipes.length}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Recipes
                        </div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold">
                          {favoriteRecipes.length}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Favorites
                        </div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold">
                          {myRecipes.reduce(
                            (total, recipe) =>
                              total + (recipe.totalRatings || 0),
                            0,
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Reviews
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={() => setIsEditing(true)}
                      className="w-full"
                      variant="outline"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={profileData.name}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        value={profileData.dateOfBirth}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        placeholder="City, Country"
                        value={profileData.location}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        placeholder="Tell us about yourself..."
                        value={profileData.bio}
                        onChange={handleInputChange}
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="avatar">Avatar URL</Label>
                      <Input
                        id="avatar"
                        name="avatar"
                        type="url"
                        placeholder="https://example.com/avatar.jpg"
                        value={profileData.avatar}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        onClick={handleSaveProfile}
                        disabled={loading}
                        className="flex-1"
                      >
                        {loading ? "Saving..." : "Save"}
                      </Button>
                      <Button
                        onClick={() => setIsEditing(false)}
                        variant="outline"
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="my-recipes" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger
                  value="my-recipes"
                  className="flex items-center space-x-2"
                >
                  <ChefHat className="h-4 w-4" />
                  <span>My Recipes</span>
                </TabsTrigger>
                <TabsTrigger
                  value="favorites"
                  className="flex items-center space-x-2"
                >
                  <Heart className="h-4 w-4" />
                  <span>Favorites</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="my-recipes" className="mt-6">
                {myRecipes.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {myRecipes.map((recipe) => (
                      <RecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        showAuthor={false}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <ChefHat className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      No recipes yet
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Share your first recipe with the community
                    </p>
                    <Button asChild>
                      <Link to="/add-recipe">Add Recipe</Link>
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="favorites" className="mt-6">
                {favoriteRecipes.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {favoriteRecipes.map((recipe) => (
                      <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      No favorites yet
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Browse recipes and save your favorites
                    </p>
                    <Button asChild>
                      <Link to="/recipes">Browse Recipes</Link>
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
