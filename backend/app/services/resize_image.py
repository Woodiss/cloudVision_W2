import cv2
import numpy as np

def resize_with_padding(image, target_size=(416, 416), pad_color=(0, 0, 0)):
    h, w = image.shape[:2]
    target_w, target_h = target_size

    # Calcul des ratios de redimensionnement
    scale = min(target_w / w, target_h / h)
    new_w = int(w * scale)
    new_h = int(h * scale)

    # Redimensionnement de l'image
    resized_image = cv2.resize(image, (new_w, new_h), interpolation=cv2.INTER_AREA)

    # Calcul du padding
    delta_w = target_w - new_w
    delta_h = target_h - new_h
    top, bottom = delta_h // 2, delta_h - (delta_h // 2)
    left, right = delta_w // 2, delta_w - (delta_w // 2)

    # Ajout du padding
    padded_image = cv2.copyMakeBorder(resized_image, top, bottom, left, right, cv2.BORDER_CONSTANT, value=pad_color)

    return padded_image
