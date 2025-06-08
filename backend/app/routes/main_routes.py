from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from app.services.spoonacular_services import SpoonacularService

# Création du blueprint
main_routes = Blueprint('main', __name__)

@main_routes.route('/', methods=["POST", "GET", "OPTIONS"])
@cross_origin(origins="http://localhost:5173")
def home():
    if request.method == "POST":

        uploadedFile = request.files.get("file")
        print(uploadedFile)
        if uploadedFile:
            # data = {
            #     "message": "Bienvenue sur la page d'accueil !",
            #     "status": "success",
            # }
            # Récupérer les ingrédients ici
            ingredients = ["eggs", "strawberry", "flour", "sugar"]

            #Récupérer l'image avec les bouding boxes
            annotatedImage = "https://images.unsplash.com/photo-1745179276969-d9db2e682b5d?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

            try:
                recipes = SpoonacularService.get_recipes_by_ingredients(ingredients)
                return jsonify(recipes, ingredients, annotatedImage)
            except Exception as e:
                return jsonify({"error": str(e)}), 500


        return jsonify({"error": "No file received"}), 400
        
    
    return "Hello World !"


@main_routes.route('/api', methods=["POST", "GET", "OPTIONS"])
@cross_origin(origins="http://localhost:3000")
def api():
    if request.method == "POST":

        uploadedFile = request.files.get("file")
        print(uploadedFile)
        if uploadedFile:
            # data = {
            #     "message": "Bienvenue sur la page d'accueil !",
            #     "status": "success",
            # }
            # Récupérer les ingrédients ici
            ingredients = ["eggs", "strawberry", "flour", "sugar"]

            #Récupérer l'image avec les bouding boxes
            annotatedImage = "https://images.unsplash.com/photo-1745179276969-d9db2e682b5d?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

            try:
                recipes = SpoonacularService.get_recipes_by_ingredients(ingredients)
                return jsonify({
                    "image_url": "https://plus.unsplash.com/premium_photo-1700151910462-a682b2b1ef80?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    "ingredients": [
                        { "id": "beef", "name": "Beef" },
                        { "id": "salad", "name": "Salad" },
                        { "id": "tomato", "name": "Tomato" }
                    ]
                })


                # return jsonify(recipes, ingredients, annotatedImage)
            except Exception as e:
                return jsonify({"error": str(e)}), 500


        return jsonify({"error": "No file received"}), 400
        
    
    return "Hello World !"
