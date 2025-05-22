import cv2
import numpy as np
from services.resize_image import resize_with_padding

def preprocess_image(image_path):
    image = cv2.imread(image_path)

    if image is None:
        raise ValueError("Image non chargée")

    denoised = cv2.GaussianBlur(image, (3, 3), 0.5)

    brightened = cv2.convertScaleAbs(denoised, alpha=1.0, beta=20)

    normalized = brightened.astype(np.float32) / 255.0

    image_resized = resize_with_padding(normalized)

    return image_resized
