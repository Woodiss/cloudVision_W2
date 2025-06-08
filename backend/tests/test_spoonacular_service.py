import io
import pytest
from app import create_app  # ou comment tu importes ton app Flask

@pytest.fixture
def client():
    app = create_app()
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_spoonacular_api(client):
    # Envoi d'un fichier vide pour déclencher la route POST
    data = {
        'file': (io.BytesIO(b'test content'), 'test.txt')
    }
    response = client.post('/', data=data, content_type='multipart/form-data')
    
    assert response.status_code == 200
    json_data = response.get_json()
    assert isinstance(json_data, list)  # Spoonacular renvoie une liste de recettes

    # Par exemple vérifier que la première recette a bien un 'id' et un 'title'
    assert 'id' in json_data[0]
    assert 'title' in json_data[0]
