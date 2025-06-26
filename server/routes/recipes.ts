import { RequestHandler } from "express";
import {
  Recipe,
  CreateRecipeRequest,
  UserRecipeInteraction,
} from "@shared/types";
import { getUsers } from "./auth";
import { sampleRecipes } from "../data/sampleData";

// Mock database - In a real app, you'd use a proper database
const recipes: Recipe[] = [...sampleRecipes]; // Initialize with sample data
const userRecipeInteractions: UserRecipeInteraction[] = [];

// Helper function to find recipe by id
const findRecipeById = (id: string) => {
  return recipes.find((recipe) => recipe.id === id);
};

// Helper function to get user interactions for a recipe
const getUserInteractionsForRecipe = (userId: string, recipeId: string) => {
  return userRecipeInteractions.filter(
    (interaction) =>
      interaction.userId === userId && interaction.recipeId === recipeId,
  );
};

// Helper function to get recipes with author info
const getRecipesWithAuthors = () => {
  const users = getUsers();
  return recipes.map((recipe) => ({
    ...recipe,
    author: users.find((user) => user.id === recipe.authorId),
  }));
};

export const handleGetRecipes: RequestHandler = (req, res) => {
  try {
    const recipesWithAuthors = getRecipesWithAuthors();
    res.json(recipesWithAuthors);
  } catch (error) {
    console.error("Get recipes error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const handleGetRecipe: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const recipe = findRecipeById(id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const users = getUsers();
    const recipeWithAuthor = {
      ...recipe,
      author: users.find((user) => user.id === recipe.authorId),
    };

    res.json(recipeWithAuthor);
  } catch (error) {
    console.error("Get recipe error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const handleCreateRecipe: RequestHandler = (req, res) => {
  try {
    const user = (req as any).user;
    const recipeData: CreateRecipeRequest = req.body;

    // Validate required fields
    if (
      !recipeData.title ||
      !recipeData.description ||
      !recipeData.ingredients ||
      !recipeData.instructions
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (recipeData.ingredients.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one ingredient is required" });
    }

    if (recipeData.instructions.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one instruction is required" });
    }

    // Create new recipe
    const newRecipe: Recipe = {
      id: Date.now().toString(),
      ...recipeData,
      authorId: user.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      rating: 0,
      totalRatings: 0,
    };

    recipes.push(newRecipe);

    // Return recipe with author info
    const recipeWithAuthor = {
      ...newRecipe,
      author: user,
    };

    res.status(201).json(recipeWithAuthor);
  } catch (error) {
    console.error("Create recipe error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const handleUpdateRecipe: RequestHandler = (req, res) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    const updateData: Partial<CreateRecipeRequest> = req.body;

    const recipeIndex = recipes.findIndex((recipe) => recipe.id === id);
    if (recipeIndex === -1) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const recipe = recipes[recipeIndex];

    // Check if user owns the recipe
    if (recipe.authorId !== user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this recipe" });
    }

    // Update recipe
    const updatedRecipe = {
      ...recipe,
      ...updateData,
      updatedAt: new Date().toISOString(),
    };

    recipes[recipeIndex] = updatedRecipe;

    // Return recipe with author info
    const recipeWithAuthor = {
      ...updatedRecipe,
      author: user,
    };

    res.json(recipeWithAuthor);
  } catch (error) {
    console.error("Update recipe error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const handleDeleteRecipe: RequestHandler = (req, res) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;

    const recipeIndex = recipes.findIndex((recipe) => recipe.id === id);
    if (recipeIndex === -1) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const recipe = recipes[recipeIndex];

    // Check if user owns the recipe
    if (recipe.authorId !== user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this recipe" });
    }

    // Remove recipe
    recipes.splice(recipeIndex, 1);

    // Remove associated interactions
    const interactionIndices = [];
    for (let i = userRecipeInteractions.length - 1; i >= 0; i--) {
      if (userRecipeInteractions[i].recipeId === id) {
        interactionIndices.push(i);
      }
    }
    interactionIndices.forEach((index) =>
      userRecipeInteractions.splice(index, 1),
    );

    res.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error("Delete recipe error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const handleToggleFavorite: RequestHandler = (req, res) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;

    const recipe = findRecipeById(id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Find existing favorite interaction
    const existingInteraction = userRecipeInteractions.find(
      (interaction) =>
        interaction.userId === user.id &&
        interaction.recipeId === id &&
        interaction.type === "favorite",
    );

    if (existingInteraction) {
      // Remove from favorites
      const index = userRecipeInteractions.indexOf(existingInteraction);
      userRecipeInteractions.splice(index, 1);
      res.json({ message: "Removed from favorites" });
    } else {
      // Add to favorites
      const newInteraction: UserRecipeInteraction = {
        id: Date.now().toString(),
        userId: user.id,
        recipeId: id,
        type: "favorite",
        createdAt: new Date().toISOString(),
      };
      userRecipeInteractions.push(newInteraction);
      res.json({ message: "Added to favorites" });
    }
  } catch (error) {
    console.error("Toggle favorite error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const handleToggleWantToTry: RequestHandler = (req, res) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;

    const recipe = findRecipeById(id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Find existing want-to-try interaction
    const existingInteraction = userRecipeInteractions.find(
      (interaction) =>
        interaction.userId === user.id &&
        interaction.recipeId === id &&
        interaction.type === "want_to_try",
    );

    if (existingInteraction) {
      // Remove from want to try
      const index = userRecipeInteractions.indexOf(existingInteraction);
      userRecipeInteractions.splice(index, 1);
      res.json({ message: "Removed from want to try" });
    } else {
      // Add to want to try
      const newInteraction: UserRecipeInteraction = {
        id: Date.now().toString(),
        userId: user.id,
        recipeId: id,
        type: "want_to_try",
        createdAt: new Date().toISOString(),
      };
      userRecipeInteractions.push(newInteraction);
      res.json({ message: "Added to want to try" });
    }
  } catch (error) {
    console.error("Toggle want to try error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Helper function to get interactions (for other modules)
export const getUserRecipeInteractions = () => userRecipeInteractions;
export const getRecipes = () => recipes;
