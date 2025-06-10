from flask import Flask
import pytest
from app.routes.main_routes import main_routes  # Ajuste selon ton projet

@pytest.fixture
def client():
    app = Flask(__name__)
    app.register_blueprint(main_routes)
    app.config['TESTING'] = True
    return app.test_client()

def test_home_get(client):
    response = client.get('/')
    assert response.status_code == 200
    assert response.data == b'Hello World !'
