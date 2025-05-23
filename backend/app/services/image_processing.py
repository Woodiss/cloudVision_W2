import cv2
import numpy as np

def preprocess_image(image_np: np.ndarray, target_size=(640, 640)) -> np.ndarray:
    """
    Traite l'image (RGB) : BGR, débruitage, éclaircissement, normalisation, redimensionnement
    Renvoie une image prête pour YOLO (format 416x416, float32)
    """

    # Convertir RGB → BGR (OpenCV attend du BGR)
    image_bgr = cv2.cvtColor(image_np, cv2.COLOR_RGB2BGR)

    # Denoising
    denoised = cv2.GaussianBlur(image_bgr, (3, 3), 0.5)

    # Éclaircissement
    brightened = cv2.convertScaleAbs(denoised, alpha=1.0, beta=20)

    # Normalisation
    normalized = brightened.astype(np.float32) / 255.0

    # --- Redimensionnement avec padding intégré ---
    h, w = normalized.shape[:2]
    target_w, target_h = target_size
    scale = min(target_w / w, target_h / h)
    new_w = int(w * scale)
    new_h = int(h * scale)

    resized = cv2.resize(normalized, (new_w, new_h), interpolation=cv2.INTER_AREA)

    delta_w = target_w - new_w
    delta_h = target_h - new_h
    top, bottom = delta_h // 2, delta_h - (delta_h // 2)
    left, right = delta_w // 2, delta_w - (delta_w // 2)

    padded = cv2.copyMakeBorder(resized, top, bottom, left, right, cv2.BORDER_CONSTANT, value=(0, 0, 0))

    return padded
