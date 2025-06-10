import base64
import pytest
from app.services.yolo_custom_model_services import YoloModelService
from run import download_model_if_needed
import os

@pytest.fixture(scope="session")
def prepare_model():
    # S'assure que le modèle est téléchargé avant les tests
    download_model_if_needed()
    yield

def test_image_base64_conversion(prepare_model):
    image_path = "tests/img/istockphoto-1282866808-612x612.jpg"
    
    # Vérifier que le fichier image existe avant de continuer
    assert os.path.exists(image_path), f"Fichier image manquant : {image_path}"

    # Charger l'image et encoder en base64
    with open(image_path, "rb") as img_file:
        img_base64 = base64.b64encode(img_file.read()).decode('utf-8')

    # Appeler la fonction avec l'image encodée
    result = YoloModelService.get_result_traitement_ia(img_base64)

    # Vérifications basiques
    assert isinstance(result, dict), "Le résultat doit être un dictionnaire"
    assert "annotated_image" in result, "La clé 'annotated_image' doit être dans le résultat"
    assert isinstance(result["annotated_image"], str), "'annotated_image' doit être une chaîne"
    assert result["annotated_image"], "'annotated_image' ne doit pas être vide"

    for key in ["names", "boxes", "confs", "classes"]:
        assert key in result, f"La clé '{key}' doit être présente dans le résultat"

def test_detection_precision(prepare_model):
    image_path = "tests/img/istockphoto-1282866808-612x612.jpg"
    assert os.path.exists(image_path), f"Fichier image manquant : {image_path}"

    with open(image_path, "rb") as img_file:
        img_base64 = base64.b64encode(img_file.read()).decode('utf-8')

    # Appeler la fonction de détection
    result = YoloModelService.get_result_traitement_ia(img_base64)

    detected_classes = result.get("classes", [])
    names = result.get("names", {})

    detected_names = [names.get(cls, names.get(str(cls), "")) for cls in detected_classes]


    expected_ingredients = {"chicken"}
    assert any(ingredient in detected_names for ingredient in expected_ingredients), \
        f"Aucun des ingrédients attendus {expected_ingredients} n'a été détecté. Noms détectés: {detected_names}"
