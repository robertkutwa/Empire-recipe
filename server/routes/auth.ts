import { RequestHandler } from "express";
import { LoginRequest, SignupRequest, AuthResponse, User } from "@shared/types";

import { sampleUsers } from "../data/sampleData";

// Mock database - In a real app, you'd use a proper database
const users: User[] = [...sampleUsers]; // Initialize with sample data
const userSessions: { [token: string]: string } = {}; // token -> userId

// Helper function to generate simple token
const generateToken = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

// Helper function to find user by email
const findUserByEmail = (email: string) => {
  return users.find((user) => user.email === email);
};

// Helper function to find user by id
const findUserById = (id: string) => {
  return users.find((user) => user.id === id);
};

export const handleSignup: RequestHandler = (req, res) => {
  try {
    const { email, password, name }: SignupRequest = req.body;

    // Validate input
    if (!email || !password || !name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    // Check if user already exists
    if (findUserByEmail(email)) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);

    // Generate token
    const token = generateToken();
    userSessions[token] = newUser.id;

    const response: AuthResponse = {
      user: newUser,
      token,
    };

    res.status(201).json(response);
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const handleLogin: RequestHandler = (req, res) => {
  try {
    const { email, password }: LoginRequest = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Find user
    const user = findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // In a real app, you'd verify the password hash here
    // For this demo, we'll accept any password for existing users

    // Generate token
    const token = generateToken();
    userSessions[token] = user.id;

    const response: AuthResponse = {
      user,
      token,
    };

    res.json(response);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const handleGetMe: RequestHandler = (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.substring(7);
    const userId = userSessions[token];

    if (!userId) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = findUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Get me error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const handleLogout: RequestHandler = (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7);
      delete userSessions[token];
    }

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Middleware to authenticate requests
export const authenticateUser: RequestHandler = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.substring(7);
    const userId = userSessions[token];

    if (!userId) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = findUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add user to request object
    (req as any).user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Helper function to get users (for other modules)
export const getUsers = () => users;
export const getUserSessions = () => userSessions;
