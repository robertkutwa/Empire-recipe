# RecipeShare - Recipe Sharing Application

A modern, full-stack recipe sharing application built with React (JSX), JavaScript, and Express. Users can discover, share, and organize their favorite recipes with a beautiful, responsive interface and dark/light mode support.

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

# Empire Recipe API

A RESTful API for RecipeShare, built with Flask and Flask-SQLAlchemy. This backend powers a recipe sharing platform, supporting user authentication, recipe management, and more.

---

## Features

- User signup, login, logout, and demo login
- JWT-based authentication (stubbed, ready for implementation)
- CRUD operations for recipes
- User profile endpoints
- Modular Flask blueprints
- SQLite database (default, easy to switch)
- CORS-ready for frontend integration

---

## Project Structure

```
empire_recipe_api/
├── app/
│   ├── __init__.py
│   ├── config.py
│   ├── models.py
│   ├── utils.py
│   └── routes/
│       ├── auth.py
│       ├── demo.py
│       ├── recipes.py
│       └── users.py
├── run.py
└── requirements.txt
```

---

## Setup & Installation

1. **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd empire_recipe_api
    ```

2. **Create and activate a virtual environment:**
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```

3. **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4. **Set environment variables (optional for development):**
    ```bash
    export FLASK_APP=run.py
    export FLASK_ENV=development
    ```

5. **Initialize the database:**
    ```bash
    flask shell
    >>> from app import db, create_app
    >>> app = create_app()
    >>> with app.app_context():
    ...     db.create_all()
    ... 
    >>> exit()
    ```

6. **Run the API server:**
    ```bash
    flask run
    ```
    The API will be available at [http://127.0.0.1:5000](http://127.0.0.1:5000).

---

## API Endpoints

- **Root:** `GET /`  
  Returns a welcome message.

- **Auth:**  
  - `POST /api/auth/signup`
  - `POST /api/auth/login`
  - `POST /api/auth/demo-login`
  - `GET /api/auth/me`
  - `POST /api/auth/logout`

- **Recipes:**  
  - `GET /api/recipes`
  - `GET /api/recipes/<id>`
  - `POST /api/recipes` (auth required)
  - `PUT /api/recipes/<id>` (auth required)
  - `DELETE /api/recipes/<id>` (auth required)

- **Demo:**  
  - `GET /api/demo`

- **Users:**  
  - `GET /api/users`
  - `GET /api/users/<id>`

---

## Frontend Integration

- Make sure your frontend uses the correct API base URL (e.g., `http://localhost:5000/api/`).
- CORS is enabled for development.
- For protected endpoints, send the JWT token in the `Authorization` header.

---

## Development Notes

- Update `utils.py` to implement real JWT authentication.
- Add more validation and error handling as needed.
- To increase file watcher limits on Linux (for frontend tools like Vite), run:
    ```bash
    echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
    ```

---

## License

MIT

---

## Author

Kutwa & Contributors
