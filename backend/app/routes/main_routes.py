from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from app.services.yolo_custom_model_services import YoloModelService
import os
from datetime import datetime
import base64
from unidecode import unidecode

# Création du blueprint
main_routes = Blueprint('main', __name__)

@main_routes.route('/', methods=["POST", "GET", "OPTIONS"])
@cross_origin(origins="http://localhost:3000")
def home():
    if request.method == "POST":

        uploadedFile = request.files.get("file")
        print(uploadedFile)
        if uploadedFile:
            file_bytes = uploadedFile.read()
            base64_image = base64.b64encode(file_bytes).decode('utf-8')
            imageData = YoloModelService.get_result_traitement_ia(base64_image)
            # ingredients = ["eggs", "strawberry", "flour", "sugar"]

            names = imageData["names"]
            class_ids = imageData["classes"]
            ingredients = list({names[class_id] for class_id in class_ids}) 

           
            print(imageData["names"] )
            
            try:
                formatted_ingredients = [
                    {
                        "id": unidecode(name.lower().replace(" ", "_")),
                        "name": name.capitalize()
                    }
                    for name in ingredients
                ]
                return jsonify({
                    "image_url": imageData["annotated_image"],
                    "ingredients": formatted_ingredients
                })


                # return jsonify(recipes, ingredients, annotatedImage)
            except Exception as e:
                return jsonify({"error": str(e)}), 500


        return jsonify({"error": "No file received"}), 400
        
    
    return "Hello World !"
