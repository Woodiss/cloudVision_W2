import requests
import numpy as np
import cv2
from PIL import Image
from io import BytesIO
import base64

#Fonction pour supprimer le blanc autour de l'image en se basant sur la teinte du blanc
def remove_white_margins(image: Image.Image) -> Image.Image:
    img_np = np.array(image.convert("RGB"))
    gray = cv2.cvtColor(img_np, cv2.COLOR_RGB2GRAY)
    mask = gray < 250
    coords = np.argwhere(mask)

    if coords.size == 0:
        return image

    y0, x0 = coords.min(axis=0)
    y1, x1 = coords.max(axis=0) + 1
    cropped_img_np = img_np[y0:y1, x0:x1]
    return Image.fromarray(cropped_img_np)

# #Fonction pour récupérer l'image et supprimer le blanc autour des images où cela est nécessaire
# def fetch_and_clean_image_from_url(image_url: str) -> str:
#     response = requests.get(image_url)
#     if response.status_code != 200:
#         raise Exception(f"Erreur de téléchargement : {response.status_code}")

#     image = Image.open(BytesIO(response.content)).convert("RGB")
#     cleaned_image = remove_white_margins(image)

#     # Encoder l'image nettoyée en base64
#     buffered = BytesIO()
#     cleaned_image.save(buffered, format="JPEG")
#     encoded_image = base64.b64encode(buffered.getvalue()).decode("utf-8")
#     return encoded_image
