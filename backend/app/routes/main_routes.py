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


            
            # dataSpoon = [
            #     {
            #         "id": 73420,
            #         "image": "https://img.spoonacular.com/recipes/73420-312x231.jpg",
            #         "imageType": "jpg",
            #         "likes": 0,
            #         "missedIngredientCount": 3,
            #         "missedIngredients": [
            #             {
            #                 "aisle": "Baking",
            #                 "amount": 1.0,
            #                 "id": 18371,
            #                 "image": "https://img.spoonacular.com/ingredients_100x100/white-powder.jpg",
            #                 "meta": [],
            #                 "name": "baking powder",
            #                 "original": "1 tsp baking powder",
            #                 "originalName": "baking powder",
            #                 "unit": "tsp",
            #                 "unitLong": "teaspoon",
            #                 "unitShort": "tsp"
            #             },
            #             {
            #                 "aisle": "Spices and Seasonings",
            #                 "amount": 1.0,
            #                 "id": 2010,
            #                 "image": "https://img.spoonacular.com/ingredients_100x100/cinnamon.jpg",
            #                 "meta": [],
            #                 "name": "cinnamon",
            #                 "original": "1 tsp cinnamon",
            #                 "originalName": "cinnamon",
            #                 "unit": "tsp",
            #                 "unitLong": "teaspoon",
            #                 "unitShort": "tsp"
            #             },
            #             {
            #                 "aisle": "Milk, Eggs, Other Dairy",
            #                 "amount": 1.0,
            #                 "id": 1123,
            #                 "image": "https://img.spoonacular.com/ingredients_100x100/egg.png",
            #                 "meta": [],
            #                 "name": "egg",
            #                 "original": "1 egg",
            #                 "originalName": "egg",
            #                 "unit": "",
            #                 "unitLong": "",
            #                 "unitShort": ""
            #             }
            #         ],
            #         "title": "Apple Or Peach Strudel",
            #         "unusedIngredients": [],
            #         "usedIngredientCount": 1,
            #         "usedIngredients": [
            #             {
            #                 "aisle": "Produce",
            #                 "amount": 6.0,
            #                 "id": 9003,
            #                 "image": "https://img.spoonacular.com/ingredients_100x100/apple.jpg",
            #                 "meta": [],
            #                 "name": "apples",
            #                 "original": "6 large baking apples",
            #                 "originalName": "baking apples",
            #                 "unit": "large",
            #                 "unitLong": "larges",
            #                 "unitShort": "large"
            #             }
            #         ]
            #     },
            #     {
            #         "id": 632660,
            #         "image": "https://img.spoonacular.com/recipes/632660-312x231.jpg",
            #         "imageType": "jpg",
            #         "likes": 3,
            #         "missedIngredientCount": 4,
            #         "missedIngredients": [
            #             {
            #                 "aisle": "Milk, Eggs, Other Dairy",
            #                 "amount": 1.5,
            #                 "extendedName": "unsalted butter",
            #                 "id": 1001,
            #                 "image": "https://img.spoonacular.com/ingredients_100x100/butter-sliced.jpg",
            #                 "meta": [
            #                     "unsalted",
            #                     "cold"
            #                 ],
            #                 "name": "butter",
            #                 "original": "1 1/2 sticks cold unsalted butter cold unsalted butter<",
            #                 "originalName": "cold unsalted butter cold unsalted butter<",
            #                 "unit": "sticks",
            #                 "unitLong": "sticks",
            #                 "unitShort": "sticks"
            #             },
            #             {
            #                 "aisle": "Produce",
            #                 "amount": 4.0,
            #                 "id": 1079003,
            #                 "image": "https://img.spoonacular.com/ingredients_100x100/red-delicious-apples.png",
            #                 "meta": [
            #                     "red",
            #                     " such as golden delicious, peeled, cored and cut into 1/4-inch-thick slices "
            #                 ],
            #                 "name": "red apples",
            #                 "original": "4 larges red apples, such as Golden Delicious, peeled, cored and cut into 1/4-inch-thick slices",
            #                 "originalName": "s red apples, such as Golden Delicious, peeled, cored and cut into 1/4-inch-thick slices",
            #                 "unit": "large",
            #                 "unitLong": "larges",
            #                 "unitShort": "large"
            #             },
            #             {
            #                 "aisle": "Spices and Seasonings",
            #                 "amount": 2.0,
            #                 "id": 2010,
            #                 "image": "https://img.spoonacular.com/ingredients_100x100/cinnamon.jpg",
            #                 "meta": [],
            #                 "name": "cinnamon",
            #                 "original": "2 teaspoons cinnamon",
            #                 "originalName": "cinnamon",
            #                 "unit": "teaspoons",
            #                 "unitLong": "teaspoons",
            #                 "unitShort": "tsp"
            #             },
            #             {
            #                 "aisle": "Nut butters, Jams, and Honey",
            #                 "amount": 2.0,
            #                 "id": 19719,
            #                 "image": "https://img.spoonacular.com/ingredients_100x100/apricot-jam.jpg",
            #                 "meta": [
            #                     "melted"
            #                 ],
            #                 "name": "apricot preserves",
            #                 "original": "2 tablespoons apricot preserves, melted and strained",
            #                 "originalName": "apricot preserves, melted and strained",
            #                 "unit": "tablespoons",
            #                 "unitLong": "tablespoons",
            #                 "unitShort": "Tbsp"
            #             }
            #         ],
            #         "title": "Apricot Glazed Apple Tart",
            #         "unusedIngredients": [
            #             {
            #                 "aisle": "Produce",
            #                 "amount": 1.0,
            #                 "id": 9003,
            #                 "image": "https://img.spoonacular.com/ingredients_100x100/apple.jpg",
            #                 "meta": [],
            #                 "name": "apples",
            #                 "original": "apples",
            #                 "originalName": "apples",
            #                 "unit": "serving",
            #                 "unitLong": "serving",
            #                 "unitShort": "serving"
            #             }
            #         ],
            #         "usedIngredientCount": 0,
            #         "usedIngredients": []
            #     }
            # ]
            # return jsonify(dataSpoon)
        return jsonify({"error": "No file received"}), 400
        
    
    return "Hello World !"