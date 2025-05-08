from flask import Flask

def create_app():
  app = Flask(__name__)
  # Importer les blueprints
  from .routes import main_routes
 
  # Enregistrer les blueprints
  app.register_blueprint(main_routes)

  return app