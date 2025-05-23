from flask import Flask, request, jsonify
import os
from services.image_processing import preprocess_image
import cv2
import numpy as np
from io import BytesIO
from PIL import Image
import torch
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/', methods=['POST'])
def upload_image():
    # Récupérer le fichier via 'image' ou 'file'
    file = request.files.get('image') or request.files.get('file')
    if file is None:
        return jsonify({'error': 'No image provided'}), 400

    # Lire le contenu binaire du fichier
    image_bytes = file.read()

    # Sauvegarder l'image originale dans le dossier uploads
    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    with open(filepath, 'wb') as f:
        f.write(image_bytes)

    # Conversion en image PIL puis NumPy
    image_stream = BytesIO(image_bytes)
    pil_image = Image.open(image_stream).convert('RGB')
    image_np = np.array(pil_image)

    # Prétraitement de l'image avec OpenCV
    processed_image = preprocess_image(image_np)
    debug_image = (processed_image * 255).astype(np.uint8)

    # Ajout de la dimension batch pour PyTorch (C, H, W)
    image_tensor = torch.from_numpy(processed_image).permute(2, 0, 1).unsqueeze(0).float()

    # ─── YOLOv11: à activer quand prêt ─────────────────────────────
    # from yolo_model import model  # À adapter selon ton code
    # results = model(image_tensor)
    # predictions = results[0]
    # return jsonify({
    #     'message': 'Detection complete',
    #     'results': predictions  # Tu peux adapter selon le format retourné
    # }), 200
    # ───────────────────────────────────────────────────────────────

    # Sauvegarder l'image traitée dans uploads/
    processed_path = os.path.join(UPLOAD_FOLDER, 'processed_' + file.filename)
    cv2.imwrite(processed_path, debug_image)

    return jsonify({'message': 'Image processed successfully.'}), 200

if __name__ == '__main__':
    app.run(debug=True)
