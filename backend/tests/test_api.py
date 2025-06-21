import os
import sys
import pytest
from unittest.mock import patch
from json import JSONDecodeError
from requests.exceptions import ConnectionError, Timeout, RequestException

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from app.app import app

@pytest.fixture
def client():
    app.testing = True
    return app.test_client()

def test_get_beneficios(client):
    response = client.get('/api/beneficios')
    assert response.status_code in [200, 400, 404, 500, 502, 503, 504]
    assert 'error' in response.get_json()

def test_get_beneficio_by_id_valido(client):
    response = client.get('/api/beneficios/1')
    assert response.status_code in [200]
    assert response.get_json()['error'] is False

def test_get_beneficio_by_id_invvalido(client):
    response = client.get('/api/beneficios/-1')
    assert response.status_code in [400, 404, 500, 502, 503, 504]
    assert response.get_json()['error'] is True


# Timeout
@patch('app.routes.api.requests.get')
def test_get_beneficios_api_caida(mock_get, client):
    mock_get.side_effect = Timeout('Tiempo de espera excedido')
    response = client.get('/api/beneficios')
    assert response.status_code==504
    assert response.get_json()['error'] is True

@patch('app.routes.api.requests.get')
def test_get_beneficios_byId_api_caida(mock_get, client):
    mock_get.side_effect = Timeout('Tiempo de espera excedido')
    response = client.get('/api/beneficios/1')
    assert response.status_code==504
    assert response.get_json()['error'] is True


# ConnectionError
@patch('app.routes.api.requests.get')
def test_get_beneficios_api_caida(mock_get, client):
    mock_get.side_effect = ConnectionError('API caida')
    response = client.get('/api/beneficios')
    assert response.status_code==503
    assert response.get_json()['error'] is True

@patch('app.routes.api.requests.get')
def test_get_beneficios_byId_api_caida(mock_get, client):
    mock_get.side_effect = ConnectionError('API caida')
    response = client.get('/api/beneficios/1')
    assert response.status_code==503
    assert response.get_json()['error'] is True

# JSONDecodeError
@patch("app.routes.api.requests.get")
def test_get_beneficios_json_invalido(mock_get, client):
    mock_response = mock_get.return_value
    mock_response.json.side_effect = JSONDecodeError("Expecting value", "", 0)
    response = client.get("/api/beneficios")
    assert response.status_code == 502
    assert response.get_json()['error'] is True

@patch("app.routes.api.requests.get")
def test_get_beneficiosById_json_invalido(mock_get, client):
    mock_response = mock_get.return_value
    mock_response.json.side_effect = JSONDecodeError("Expecting value", "", 0)
    response = client.get("/api/beneficios/1")
    assert response.status_code == 502
    assert response.get_json()['error'] is True


# RequestException
@patch("app.routes.api.requests.get")
def test_get_beneficios_request_exception(mock_get, client):
    mock_get.side_effect = RequestException("Error en el request")
    response = client.get("/api/beneficios")
    assert response.status_code == 502
    assert response.get_json()['error'] is True

@patch("app.routes.api.requests.get")
def test_get_beneficiosById_request_exception(mock_get, client):
    mock_get.side_effect = RequestException("Error en el request")
    response = client.get("/api/beneficios/1")
    assert response.status_code == 502
    assert response.get_json()['error'] is True


# ValidationError
@patch("app.routes.api.requests.get")
def test_get_beneficios_datos_mal_formateados(mock_get, client):
    mock_response = mock_get.return_value
    mock_response.json.return_value = {
        "error": False,
        "status": 200,
        "body": {
                "beneficios": "esto debería ser una lista"
            }
    }
    response = client.get("/api/beneficios")
    assert response.status_code == 400
    assert response.get_json()['error'] is True

@patch("app.routes.api.requests.get")
def test_get_beneficiosById_datos_mal_formateados(mock_get, client):
    mock_response = mock_get.return_value
    mock_response.json.return_value = {
        "error": False,
        "status": 200
    }
    response = client.get("/api/beneficios/1")
    assert response.status_code == 400
    assert response.get_json()['error'] is True