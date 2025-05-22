from flask import Flask, request, jsonify
import os
from services.image_processing import preprocess_image
import cv2
import numpy as np

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    file = request.files['image']
    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)

    processed_image = (preprocess_image(filepath) * 255).astype(np.uint8)
    # debug_image = (processed_image * 255).astype(np.uint8)

    # Enregistre l’image traitée pour vérif ou debug
    cv2.imwrite(os.path.join(UPLOAD_FOLDER, 'processed_' + file.filename), processed_image)

    return jsonify({'message': 'Image processed successfully.'}), 200

if __name__ == '__main__':
    app.run(debug=True)
