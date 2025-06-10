# apelle la function create_app qui se trouve dans /app (point d'entré __init__.py)
from app import create_app
import os
import requests

def download_model_if_needed():
    url = "https://www.dropbox.com/scl/fi/5uv6lh60287540ns0xouh/yolo11_fridge_complet_v0_5.pt?rlkey=fwyb5i1dlufepclikwlatawoq&dl=1"
    output_path = "app/yolo_model/yolo11_fridge_complet_v0_5.pt"

    if not os.path.exists(output_path):
        print("Téléchargement du modèle...")
        with requests.get(url, stream=True) as r:
            r.raise_for_status()
            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            with open(output_path, 'wb') as f:
                for chunk in r.iter_content(chunk_size=8192):
                    f.write(chunk)
        print("Modèle téléchargé.")
    else:
        print("Modèle déjà présent.")

# stock la function sous app
download_model_if_needed()
app = create_app()

if __name__ == "__main__":
    # lance app
    app.run(debug=True)