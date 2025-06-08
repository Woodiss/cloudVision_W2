from ultralytics import YOLO
from PIL import Image
import numpy as np
import cv2
import io
import base64

class YoloModelService:

    @staticmethod
    def get_result_traitement_ia(img):
        image_data = base64.b64decode(img)
        np_arr = np.frombuffer(image_data, np.uint8)
        image = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
        original = image.copy()

        # detec les ingrdients
        hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
        lower_white = np.array([0, 0, 200])
        upper_white = np.array([180, 40, 255])
        mask = cv2.inRange(hsv, lower_white, upper_white)
        objects_mask = cv2.bitwise_not(mask)

        
        kernel = np.ones((5, 5), np.uint8)
        cleaned = cv2.morphologyEx(objects_mask, cv2.MORPH_OPEN, kernel)

        # les détour
        contours, _ = cv2.findContours(cleaned, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

        model = YOLO("app/yolo_model/yolo11_fridge_complet_v0_5.pt")
        rename_map = {
            "bakingpowder": "baking-powder",
            "bakingsoda": "baking-soda",
            "bellpepper": "bell-pepper",
            "chickenbreast": "chicken-breast",
            "grated_cheese": "grated-cheese",
            "greenonion": "green-onion",
            "peanutbutter": "peanut-butter",
            "soysauce": "soy-sauce",
            "sweetpotato": "sweet-potato",
            "tomatosauce": "tomato-sauce",
            "vanilla_extract": "vanilla-extract",
            "whole_chicken": "chicken"
        }

        model.model.names = {
            i: rename_map.get(name, name)
            for i, name in model.model.names.items()
        }

        all_boxes = []
        all_classes = []
        all_confs = []

        # Annoter sur une copie de l'image originale
        annotated = original.copy()

        for cnt in contours:
            x, y, w, h = cv2.boundingRect(cnt)
            if w * h > 500:
                crop = original[y:y + h, x:x + w]

                # Prédiction sur le crop
                results = list(model.predict(source=crop, conf=0.2, save=False))
                if not results:
                    continue

                for box, cls, conf in zip(
                    results[0].boxes.xyxy.tolist(),
                    results[0].boxes.cls.tolist(),
                    results[0].boxes.conf.tolist()
                ):
                    x1, y1, x2, y2 = box
                    # Repositionnement global
                    x1g, y1g, x2g, y2g = x + x1, y + y1, x + x2, y + y2
                    all_boxes.append([x1g, y1g, x2g, y2g])
                    all_classes.append(cls)
                    all_confs.append(conf)

                    # Dessiner la box sur l'image finale
                    label = model.model.names[int(cls)]
                    cv2.rectangle(annotated, (int(x1g), int(y1g)), (int(x2g), int(y2g)), (0, 0, 255), 4)
                    cv2.putText(annotated, f"{label} {conf:.2f}", (int(x1g), int(y1g) - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 1.5, (0, 0, 255), 3)

        # Encoder l'image finale
        annotated_rgb = cv2.cvtColor(annotated, cv2.COLOR_BGR2RGB)
        final_image = Image.fromarray(annotated_rgb)
        buffer = io.BytesIO()
        final_image.save(buffer, format="JPEG")
        encoded_image = base64.b64encode(buffer.getvalue()).decode("utf-8")

        return {
            "names": model.model.names,
            "boxes": all_boxes,
            "confs": all_confs,
            "classes": all_classes,
            "annotated_image": encoded_image,
        }
