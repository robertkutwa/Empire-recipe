# Empire Recipe API

## Overview
Empire Recipe API is a Flask-based web application that allows users to manage recipes, user authentication, and interactions with recipes. This API provides endpoints for user signup, login, and recipe management, including creating, updating, and deleting recipes.

## Features
- User authentication (signup, login, logout)
- Recipe management (create, read, update, delete)
- User interactions with recipes (favorites, want to try)
- Demo login for quick access

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd empire_recipe_api
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   ```

3. Activate the virtual environment:
   - On Windows:
     ```
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```
     source venv/bin/activate
     ```

4. Install the required packages:
   ```
   pip install -r requirements.txt
   ```

## Usage

To run the application, execute the following command:
```
python run.py
```

The API will be available at `http://localhost:5000`.

## API Endpoints

### Authentication
- `POST /api/auth/signup`: Create a new user
- `POST /api/auth/login`: Log in a user
- `POST /api/auth/logout`: Log out a user
- `GET /api/auth/me`: Get current user information

### Recipes
- `GET /api/recipes`: Retrieve all recipes
- `GET /api/recipes/<id>`: Retrieve a specific recipe
- `POST /api/recipes`: Create a new recipe
- `PUT /api/recipes/<id>`: Update an existing recipe
- `DELETE /api/recipes/<id>`: Delete a recipe
- `POST /api/recipes/<id>/favorite`: Toggle favorite status
- `POST /api/recipes/<id>/want-to-try`: Toggle "want to try" status

### Users
- `PUT /api/users/profile`: Update user profile
- `GET /api/users/interactions`: Get user interactions
- `GET /api/users/my-recipes`: Get recipes created by the user
- `GET /api/users/favorites`: Get favorite recipes
- `GET /api/users/want-to-try`: Get recipes the user wants to try

## Testing

To run the tests, use the following command:
```
pytest
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.