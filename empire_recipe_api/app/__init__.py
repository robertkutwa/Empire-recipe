from flask import Flask
from .config import Config
from .routes.auth import auth_bp
from .routes.demo import demo_bp
from .routes.recipes import recipes_bp
from .routes.users import users_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Register Blueprints
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(demo_bp, url_prefix='/api/demo')
    app.register_blueprint(recipes_bp, url_prefix='/api/recipes')
    app.register_blueprint(users_bp, url_prefix='/api/users')

    return app