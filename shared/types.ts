export interface User {
  id: string;
  email: string;
  name: string;
  dateOfBirth?: string;
  location?: string;
  bio?: string;
  avatar?: string;
  createdAt: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  cookTime: number;
  prepTime: number;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  image?: string;
  nutritionalInfo?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  };
  authorId: string;
  author?: User;
  createdAt: string;
  updatedAt: string;
  rating?: number;
  totalRatings?: number;
}

export interface UserRecipeInteraction {
  id: string;
  userId: string;
  recipeId: string;
  type: "favorite" | "want_to_try" | "rating";
  rating?: number;
  createdAt: string;
}

export interface Comment {
  id: string;
  content: string;
  userId: string;
  recipeId: string;
  author?: User;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
}

export interface CreateRecipeRequest {
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  cookTime: number;
  prepTime: number;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  image?: string;
  nutritionalInfo?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  };
}

export interface UpdateProfileRequest {
  name?: string;
  dateOfBirth?: string;
  location?: string;
  bio?: string;
  avatar?: string;
}
