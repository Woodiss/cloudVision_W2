from flask import Blueprint, jsonify

# Création du blueprint
main_routes = Blueprint('main', __name__)

@main_routes.route('/')
def home():
    data = {
            "message": "Bienvenue sur la page d'accueil !",
            "status": "success"
        }
    return jsonify(data)