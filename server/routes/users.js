import { getUsers } from "./auth.js";
import { getUserRecipeInteractions, getRecipes } from "./recipes.js";

export const handleUpdateProfile = (req, res) => {
  try {
    const user = req.user;
    const updateData = req.body;

    const users = getUsers();
    const userIndex = users.findIndex((u) => u.id === user.id);

    if (userIndex === -1) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user profile
    const updatedUser = {
      ...users[userIndex],
      ...updateData,
    };

    users[userIndex] = updatedUser;

    res.json(updatedUser);
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const handleGetUserInteractions = (req, res) => {
  try {
    const user = req.user;
    const interactions = getUserRecipeInteractions();

    const userInteractions = interactions.filter(
      (interaction) => interaction.userId === user.id,
    );

    const favorites = userInteractions
      .filter((interaction) => interaction.type === "favorite")
      .map((interaction) => interaction.recipeId);

    const wantToTry = userInteractions
      .filter((interaction) => interaction.type === "want_to_try")
      .map((interaction) => interaction.recipeId);

    res.json({ favorites, wantToTry });
  } catch (error) {
    console.error("Get user interactions error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const handleGetMyRecipes = (req, res) => {
  try {
    const user = req.user;
    const recipes = getRecipes();
    const users = getUsers();

    const myRecipes = recipes
      .filter((recipe) => recipe.authorId === user.id)
      .map((recipe) => ({
        ...recipe,
        author: users.find((u) => u.id === recipe.authorId),
      }));

    res.json(myRecipes);
  } catch (error) {
    console.error("Get my recipes error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const handleGetFavoriteRecipes = (req, res) => {
  try {
    const user = req.user;
    const interactions = getUserRecipeInteractions();
    const recipes = getRecipes();
    const users = getUsers();

    const favoriteInteractions = interactions.filter(
      (interaction) =>
        interaction.userId === user.id && interaction.type === "favorite",
    );

    const favoriteRecipeIds = favoriteInteractions.map(
      (interaction) => interaction.recipeId,
    );

    const favoriteRecipes = recipes
      .filter((recipe) => favoriteRecipeIds.includes(recipe.id))
      .map((recipe) => ({
        ...recipe,
        author: users.find((u) => u.id === recipe.authorId),
      }));

    res.json(favoriteRecipes);
  } catch (error) {
    console.error("Get favorite recipes error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const handleGetWantToTryRecipes = (req, res) => {
  try {
    const user = req.user;
    const interactions = getUserRecipeInteractions();
    const recipes = getRecipes();
    const users = getUsers();

    const wantToTryInteractions = interactions.filter(
      (interaction) =>
        interaction.userId === user.id && interaction.type === "want_to_try",
    );

    const wantToTryRecipeIds = wantToTryInteractions.map(
      (interaction) => interaction.recipeId,
    );

    const wantToTryRecipes = recipes
      .filter((recipe) => wantToTryRecipeIds.includes(recipe.id))
      .map((recipe) => ({
        ...recipe,
        author: users.find((u) => u.id === recipe.authorId),
      }));

    res.json(wantToTryRecipes);
  } catch (error) {
    console.error("Get want to try recipes error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
