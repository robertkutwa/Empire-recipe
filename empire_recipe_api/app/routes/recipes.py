from flask import Blueprint, request, jsonify
from app.models import Recipe
from app.utils import authenticate_user

recipes_bp = Blueprint('recipes', __name__)

@recipes_bp.route('/api/recipes', methods=['GET'])
def get_recipes():
    recipes = Recipe.query.all()
    return jsonify([recipe.to_dict() for recipe in recipes]), 200

@recipes_bp.route('/api/recipes/<int:id>', methods=['GET'])
def get_recipe(id):
    recipe = Recipe.query.get_or_404(id)
    return jsonify(recipe.to_dict()), 200

@recipes_bp.route('/api/recipes', methods=['POST'])
@authenticate_user
def create_recipe():
    data = request.json
    new_recipe = Recipe(**data)
    new_recipe.save()
    return jsonify(new_recipe.to_dict()), 201

@recipes_bp.route('/api/recipes/<int:id>', methods=['PUT'])
@authenticate_user
def update_recipe(id):
    recipe = Recipe.query.get_or_404(id)
    data = request.json
    for key, value in data.items():
        setattr(recipe, key, value)
    recipe.save()
    return jsonify(recipe.to_dict()), 200

@recipes_bp.route('/api/recipes/<int:id>', methods=['DELETE'])
@authenticate_user
def delete_recipe(id):
    recipe = Recipe.query.get_or_404(id)
    recipe.delete()
    return jsonify({'message': 'Recipe deleted successfully'}), 204

@recipes_bp.route('/api/recipes/<int:id>/favorite', methods=['POST', 'DELETE'])
@authenticate_user
def toggle_favorite(id):
    recipe = Recipe.query.get_or_404(id)
    # Logic to toggle favorite status
    return jsonify({'message': 'Favorite status toggled'}), 200

@recipes_bp.route('/api/recipes/<int:id>/want-to-try', methods=['POST', 'DELETE'])
@authenticate_user
def toggle_want_to_try(id):
    recipe = Recipe.query.get_or_404(id)
    # Logic to toggle want-to-try status
    return jsonify({'message': 'Want-to-try status toggled'}), 200