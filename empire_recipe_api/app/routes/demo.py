from flask import Blueprint, jsonify

demo_bp = Blueprint('demo', __name__)

@demo_bp.route('/api/demo', methods=['GET'])
def handle_demo():
    return jsonify({"message": "Hello from RecipeShare API!"})