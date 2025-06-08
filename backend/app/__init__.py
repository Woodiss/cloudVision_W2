from flask import Flask
from flask_cors import CORS
def create_app():
  app = Flask(__name__)
  CORS(app, origins=["http://localhost:5173"], supports_credentials=True)
  # Importer les blueprints
  from .routes import main_routes
  
  # Enregistrer les blueprints
  app.register_blueprint(main_routes)

  return app