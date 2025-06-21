from requests.exceptions import Timeout, ConnectionError, RequestException
from app.models.Beneficios import BeneficiosResponseModel
from app.models.Beneficio import BeneficioResponseModel
from flask import Blueprint, jsonify, request
from pydantic import ValidationError
from urllib.parse import urlencode
import app.utils.config as config
from urllib.parse import urljoin
import requests
import json

apiBp = Blueprint('api', __name__, url_prefix='/api')

# region /api/beneficios
@apiBp.route("/beneficios", methods=['GET'])
def getBeneficios():
    params = {
        "page": request.args.get("page", 1),
        "pageSize": request.args.get("pageSize", 5),
        "archivado": request.args.get("archivado", False),
        "sinCategoria": request.args.get("sinCategoria", False),
        "mapa": request.args.get("mapa", False),
        "simple": request.args.get("simple", False),
        "comercio": request.args.get("comercio", ''),
    }

    query_string = urlencode(params)
    url = urljoin(config.API_URL_BASE, f"beneficios?{query_string}")
    print(f"Fetching to: {url}")
    try:
        response = requests.get(url)
        response_json = response.json()
        if response_json['error'] == True:
            return jsonify({
                "error": True,
                "message": response_json['details']
            }), 400
        
        parsed = BeneficiosResponseModel(**response_json)
        return jsonify({
            "error": False,
            "data": parsed.body.model_dump()
        }), 200 
    except Timeout:
        return jsonify({"error": True, "message": "La solicitud tomó demasiado tiempo (timeout)."}), 504 
    except ConnectionError:
        return jsonify({"error": True, "message": "No se pudo conectar a la API externa."}), 503
    except json.JSONDecodeError:
        return jsonify({"error": True, "message": "La respuesta no tiene un formato JSON válido."}), 502
    except RequestException as e:
        return jsonify({"error": True, "message": "Error al consultar la API externa", "details": str(e)}), 502 
    except ValidationError as e:
        return jsonify({
            "error": True,
            "message": "Formato de datos incorrecto",
            "details": e.errors()
        }), 400
    except Exception as e:
        return jsonify({"error": True, "message": "Error inesperado", "details": str(e)}), 500
# endregion /api/beneficios

# region /api/beneficios/<id>
@apiBp.route("/beneficios/<id>", methods=['GET'])
def getBeneficiosById(id):
    url = urljoin(config.API_URL_BASE, f"beneficios/{id}")
    print(f"Fetching to: {url}")
    try:
        response = requests.get(url)
        response_json = response.json()
        print(response_json)
        if response_json['error'] == True:
            if response_json['body'].lower() == "no se encontró el beneficio":
                return jsonify({
                    "error": True,
                    "message": "Ningún beneficio encontrado con ese id"  
                }), 404
            return jsonify({
                "error": True,
                "message": response_json['body']
            }), 400
        
        parsed = BeneficioResponseModel(**response_json)
        return jsonify({
            "error": False,
            "data": parsed.body.model_dump()
        }), 200 
    except Timeout:
        return jsonify({"error": True, "message": "La solicitud tomó demasiado tiempo (timeout)."}), 504 
    except ConnectionError:
        return jsonify({"error": True, "message": "No se pudo conectar a la API externa."}), 503
    except json.JSONDecodeError:
        return jsonify({"error": True, "message": "La respuesta no tiene un formato JSON válido."}), 502
    except RequestException as e:
        return jsonify({"error": True, "message": "Error al consultar la API externa", "details": str(e)}), 502 
    except ValidationError as e:
        return jsonify({
            "error": True,
            "message": "Formato de datos incorrecto",
            "details": e.errors()
        }), 400
    except Exception as e:
        return jsonify({"error": True, "message": "Error inesperado", "details": str(e)}), 500
# endregion /api/beneficios/<id>