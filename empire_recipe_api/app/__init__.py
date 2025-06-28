from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from .config import Config
from .routes.auth import auth_bp
from .routes.demo import demo_bp
from .routes.recipes import recipes_bp
from .routes.users import users_bp

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///recipes.db'
    db.init_app(app)

    # Register Blueprints
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(demo_bp, url_prefix='/api/demo')
    app.register_blueprint(recipes_bp, url_prefix='/api/recipes')
    app.register_blueprint(users_bp, url_prefix='/api/users')

    @app.route("/")
    def index():
        return {"message": "Welcome to the Recipe API!"}

    return app