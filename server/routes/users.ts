import { RequestHandler } from "express";
import { UpdateProfileRequest } from "@shared/types";
import { getUsers } from "./auth";
import { getUserRecipeInteractions, getRecipes } from "./recipes";

export const handleUpdateProfile: RequestHandler = (req, res) => {
  try {
    const user = (req as any).user;
    const updateData: UpdateProfileRequest = req.body;

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

export const handleGetUserInteractions: RequestHandler = (req, res) => {
  try {
    const user = (req as any).user;
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

export const handleGetMyRecipes: RequestHandler = (req, res) => {
  try {
    const user = (req as any).user;
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

export const handleGetFavoriteRecipes: RequestHandler = (req, res) => {
  try {
    const user = (req as any).user;
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

export const handleGetWantToTryRecipes: RequestHandler = (req, res) => {
  try {
    const user = (req as any).user;
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
