"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Multiplex
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200



@api.route("/multiplex", methods=["GET"])
def mostrar_cines():
    multiplex = Multiplex.query.all()
    result = list(map(lambda multiplex: multiplex.serialize(), multiplex))
    
    return jsonify(result), 200


@api.route("/multiplex/<int:multiplex_id>", methods=["GET"])
def mostrar_cine(multiplex_id):
    cine = Multiplex.query.filter_by(id=multiplex_id).first()
    
    return jsonify(cine.serialize()), 200


@api.route("/multiplex", methods=["POST"])
def crear_multiplex():
    body = request.get_json()
    multiplex = Multiplex(
            cadena = body["cadena"],
            cinema = body["cinema"],
            ciudad = body["ciudad"],
            pais = body["pais"]
    )
    db.session.add(multiplex)
    db.session.commit()
    print("creado")
    response_body = {
        "msg":"multiplex creado"
    }
    return jsonify(response_body), 200


@api.route("/multiplex/<int:multiplex_id>", methods=["PUT"])
def modificar_multiplex(multiplex_id):
    multiplex = Multiplex.query.filter_by(id=multiplex_id).first()
    body = request.get_json()
    multiplex.cadena = body["cadena"]
    multiplex.cinema = body["cinema"]
    multiplex.ciudad = body["ciudad"]
    multiplex.pais = body["pais"]
    db.session.commit()

    return jsonify(multiplex.serialize()), 200


@api.route("/multiplex/<int:multiplex_id>", methods=["DELETE"])
def Eliminar_multiplex(multiplex_id):
    multiplex = Multiplex.query.filter_by(id=multiplex_id).first()  
    db.session.delete(multiplex)
    db.session.commit()
    response_body = {
        "msg":"Multiplex Eliminado"
    }
    return jsonify(response_body), 200
