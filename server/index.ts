import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  handleSignup,
  handleLogin,
  handleGetMe,
  handleLogout,
  authenticateUser,
} from "./routes/auth";
import {
  handleGetRecipes,
  handleGetRecipe,
  handleCreateRecipe,
  handleUpdateRecipe,
  handleDeleteRecipe,
  handleToggleFavorite,
  handleToggleWantToTry,
} from "./routes/recipes";
import {
  handleUpdateProfile,
  handleGetUserInteractions,
  handleGetMyRecipes,
  handleGetFavoriteRecipes,
  handleGetWantToTryRecipes,
} from "./routes/users";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check routes
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from RecipeShare API!" });
  });

  app.get("/api/demo", handleDemo);

  // Authentication routes
  app.post("/api/auth/signup", handleSignup);
  app.post("/api/auth/login", handleLogin);
  app.get("/api/auth/me", handleGetMe);
  app.post("/api/auth/logout", handleLogout);

  // Recipe routes (protected)
  app.get("/api/recipes", authenticateUser, handleGetRecipes);
  app.get("/api/recipes/:id", authenticateUser, handleGetRecipe);
  app.post("/api/recipes", authenticateUser, handleCreateRecipe);
  app.put("/api/recipes/:id", authenticateUser, handleUpdateRecipe);
  app.delete("/api/recipes/:id", authenticateUser, handleDeleteRecipe);

  // Recipe interaction routes (protected)
  app.post("/api/recipes/:id/favorite", authenticateUser, handleToggleFavorite);
  app.delete(
    "/api/recipes/:id/favorite",
    authenticateUser,
    handleToggleFavorite,
  );
  app.post(
    "/api/recipes/:id/want-to-try",
    authenticateUser,
    handleToggleWantToTry,
  );
  app.delete(
    "/api/recipes/:id/want-to-try",
    authenticateUser,
    handleToggleWantToTry,
  );

  // User routes (protected)
  app.put("/api/users/profile", authenticateUser, handleUpdateProfile);
  app.get(
    "/api/users/interactions",
    authenticateUser,
    handleGetUserInteractions,
  );
  app.get("/api/users/my-recipes", authenticateUser, handleGetMyRecipes);
  app.get("/api/users/favorites", authenticateUser, handleGetFavoriteRecipes);
  app.get(
    "/api/users/want-to-try",
    authenticateUser,
    handleGetWantToTryRecipes,
  );

  return app;
}
