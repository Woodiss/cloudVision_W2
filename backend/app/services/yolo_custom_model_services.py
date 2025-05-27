class YoloModelService:

    @staticmethod
    def get_result_traitement_ia(img):
        from ultralytics import YOLO
        from PIL import Image
        import numpy as np
        import io
        import base64

        # Load a model
        model = YOLO("app/yolo_model/yolo11_fridge_complet_v0_5.pt")
        image = Image.open(img.stream)
        image_array = np.array(image)

        results = model.predict(source=image_array, conf=0.25, save=False)
        
        # Génère l'image annotée (avec bounding boxes) dans une variable
        annotated_array = results[0].plot()  # NumPy array avec annotations

        # Convertit en image PIL
        annotated_img = Image.fromarray(annotated_array)

        # Encode en base64 (sans sauvegarder)
        buffered = io.BytesIO()
        annotated_img.save(buffered, format="JPEG")
        encoded_image = base64.b64encode(buffered.getvalue()).decode("utf-8")

        return {
            "names": results[0].names,
            "boxes": results[0].boxes.xyxy.tolist(),
            "confs": results[0].boxes.conf.tolist(),
            "classes": results[0].boxes.cls.tolist(),
            "annotated_image": encoded_image,
        }