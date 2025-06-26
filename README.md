# RecipeShare - Recipe Sharing Application

A modern, full-stack recipe sharing application built with React, TypeScript, and Express. Users can discover, share, and organize their favorite recipes with a beautiful, responsive interface and dark/light mode support.

## 🍳 Features

### Core Features

- **User Authentication**: Secure signup/login system
- **Recipe Management**: Browse, create, edit, and delete recipes
- **Recipe Discovery**: Search and filter recipes by category, difficulty, and ingredients
- **User Profiles**: Customizable profiles with age, location, and bio
- **Recipe Interactions**: Favorite recipes and maintain a "want to try" list
- **Dark/Light Mode**: Toggle between themes with system preference detection

### Advanced Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Rich Recipe Details**: Ingredients, step-by-step instructions, nutritional info
- **Recipe Categories**: Breakfast, lunch, dinner, dessert, and more
- **Difficulty Levels**: Easy, medium, and hard recipe classifications
- **Author Attribution**: See who created each recipe
- **Recipe Stats**: Cook time, prep time, servings, and ratings
- **Modern UI**: Beautiful interface with Radix UI components and Tailwind CSS

## 🚀 Tech Stack

### Frontend

- **React 18** with TypeScript
- **Vite** for fast development and building
- **React Router 6** for client-side routing
- **TailwindCSS** for styling
- **Radix UI** for accessible components
- **Lucide React** for icons
- **React Query** for data fetching

### Backend

- **Express.js** with TypeScript
- **CORS** enabled for cross-origin requests
- **RESTful API** design
- **JWT-like authentication** (simplified for demo)

### Development

- **TypeScript** throughout the stack
- **ESLint** and **Prettier** for code quality
- **Vite** development server with hot reload
- **Shared types** between client and server

## 🏗️ Project Structure

```
├── client/                 # React frontend
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # Base UI components (buttons, inputs, etc.)
│   │   ├── Navigation.tsx # App navigation
│   │   ├── RecipeCard.tsx # Recipe display component
│   │   └── AuthGuard.tsx  # Protected route component
│   ├── contexts/         # React contexts
│   │   └── AuthContext.tsx # Authentication state
│   ├── pages/            # Page components
│   │   ├── Login.tsx     # Login page
│   │   ├── Signup.tsx    # Registration page
│   │   ├── Recipes.tsx   # Recipe browsing
│   │   ├── RecipeDetail.tsx # Individual recipe view
│   │   ├── AddRecipe.tsx # Recipe creation
│   │   ├── Profile.tsx   # User profile
│   │   └── WantToTry.tsx # Saved recipes
│   └── App.tsx           # Main app component
├── server/                # Express backend
│   ├── routes/           # API route handlers
│   │   ├── auth.ts       # Authentication endpoints
│   │   ├── recipes.ts    # Recipe CRUD operations
│   │   └── users.ts      # User management
│   ├── data/            # Sample data
│   │   └── sampleData.ts # Demo recipes and users
│   └── index.ts         # Server configuration
├── shared/               # Shared TypeScript types
│   └── types.ts         # Common interfaces
└── package.json         # Dependencies and scripts
```

## 🎨 Design Features

### Beautiful UI/UX

- **Modern Design**: Clean, intuitive interface with careful attention to typography and spacing
- **Orange Theme**: Warm, food-focused color palette with the primary color being a vibrant orange
- **Recipe Cards**: Elegant cards with hover effects, difficulty badges, and author information
- **Responsive Layout**: Adapts beautifully to all screen sizes
- **Loading States**: Smooth loading animations and skeleton screens

### Accessibility

- **Semantic HTML**: Proper HTML structure for screen readers
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: Meets WCAG guidelines for accessibility
- **Focus Indicators**: Clear focus states for all interactive elements

## 📱 Pages and Functionality

### Authentication

- **Login Page**: Email/password authentication with validation
- **Signup Page**: User registration with password confirmation
- **Protected Routes**: Secure access to app features

### Recipe Management

- **Recipe Browser**: Grid layout with search, filtering, and sorting
- **Recipe Detail**: Full recipe view with ingredients, instructions, and nutritional info
- **Add Recipe**: Comprehensive form for creating new recipes
- **Recipe Interactions**: Favorite and "want to try" functionality

### User Features

- **Profile Page**: User information, recipe stats, and personal recipe collections
- **My Recipes**: View all recipes created by the user
- **Favorites**: Quick access to favorited recipes
- **Want to Try**: Personal cooking wishlist

## 🛠️ Development

### Getting Started

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Start Development Server**

   ```bash
   npm run dev
   ```

3. **Build for Production**

   ```bash
   npm run build
   ```

4. **Start Production Server**
   ```bash
   npm start
   ```

### Demo Data

The application comes with sample recipes and users for demonstration purposes. You can:

- Sign up for a new account
- Use demo credentials (any email with any password for existing users)
- Browse sample recipes from Chef Maria, John Chen, and Sofia Rossi

### API Endpoints

#### Authentication

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

#### Recipes

- `GET /api/recipes` - Get all recipes
- `GET /api/recipes/:id` - Get specific recipe
- `POST /api/recipes` - Create new recipe
- `PUT /api/recipes/:id` - Update recipe
- `DELETE /api/recipes/:id` - Delete recipe

#### Recipe Interactions

- `POST /api/recipes/:id/favorite` - Add to favorites
- `DELETE /api/recipes/:id/favorite` - Remove from favorites
- `POST /api/recipes/:id/want-to-try` - Add to want to try
- `DELETE /api/recipes/:id/want-to-try` - Remove from want to try

#### User Management

- `PUT /api/users/profile` - Update user profile
- `GET /api/users/interactions` - Get user's recipe interactions
- `GET /api/users/my-recipes` - Get user's recipes
- `GET /api/users/favorites` - Get favorited recipes
- `GET /api/users/want-to-try` - Get want to try recipes

## 🎯 Key Features Implementation

### Authentication System

- JWT-like token authentication
- Persistent login state
- Protected routes with redirect
- User session management

### Recipe Features

- **CRUD Operations**: Full create, read, update, delete functionality
- **Rich Content**: Images, nutritional information, cooking times
- **Search & Filter**: Multi-criteria search and filtering
- **User Interactions**: Favorites and want-to-try lists

### UI/UX Excellence

- **Theme System**: Dark/light mode with system preference
- **Responsive Design**: Mobile-first approach
- **Loading States**: Comprehensive loading and error states
- **Form Validation**: Client-side validation with helpful error messages

## 🚀 Deployment

The application is ready for deployment to various platforms:

- **Render**: Configured for easy deployment
- **Vercel**: Frontend deployment ready
- **Heroku**: Backend deployment ready
- **Docker**: Containerization support included

## 🤝 Contributing

This is a demonstration application showcasing modern web development practices. The codebase demonstrates:

- **Clean Architecture**: Separation of concerns and modular design
- **TypeScript Best Practices**: Comprehensive type safety
- **React Patterns**: Modern hooks, context, and component patterns
- **API Design**: RESTful API with consistent responses
- **UI/UX Design**: Modern, accessible interface design

## 📝 License

This project is for demonstration purposes. Feel free to use it as a learning resource or starting point for your own recipe sharing application.

---

**RecipeShare** - Share your culinary creativity with the world! 🍽️✨
