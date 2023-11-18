"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Movie, Showtime, Multiplex 
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


# RUTAS MOVIES (FRANCESCA)
@api.route('/movies', methods=['GET'])
def get_movies():
    all_movies = Movie.query.all()
    result = list(map(lambda item: item.serialize(), all_movies))
    return jsonify(result), 200

@api.route('/movies/<int:movie_id>', methods=['GET'])
def get_movie(movie_id):
    movie = Movie.query.filter_by(id=movie_id).first()
    return jsonify(movie.serialize()), 200

@api.route('/movies', methods=['POST'])
def create_movie():
    body = request.get_json()
    new_movie = Movie(name=body["name"],release_date=body["release_date"],rating=body["rating"],overview=body["overview"],image_url=body["image_url"])
    db.session.add(new_movie)
    db.session.commit()
    return jsonify(new_movie.serialize()), 200

@api.route('/movies/<int:movie_id>', methods=['PUT'])
def edit_movie(movie_id):
    body = request.get_json()
    movie = Movie.query.filter_by(id=movie_id).first()
    name = body["name"]
    release_date = body["release_date"]
    rating = body["rating"]
    overview = body["overview"]
    image_url = body["image_url"]
    movie.name = name
    movie.release_date = release_date
    movie.rating = rating
    movie.overview = overview
    movie.image_url = image_url
    db.session.commit()
    return jsonify(movie.serialize()), 200

@api.route('/movies/<int:movie_id>', methods=['DELETE'])
def delete_movie(movie_id):
    delete_movie = Movie.query.filter_by(id=movie_id).first()
    db.session.delete(delete_movie)
    db.session.commit()
    return jsonify(), 200


# RUTAS SHOWTIMES (FRANCESCA)
@api.route('/showtimes', methods=['GET'])
def get_showtimes():
    all_showtimes = Showtime.query.all()
    result = list(map(lambda item: item.serialize(), all_showtimes))
    return jsonify(result), 200

@api.route('/showtimes/<int:showtime_id>', methods=['GET'])
def get_showtime(showtime_id):
    get_showtime = Showtime.query.filter_by(id=showtime_id).first()
    return jsonify(get_showtime.serialize()), 200

@api.route('/showtimes', methods=['POST'])
def create_showtime():
    body = request.get_json()
    new_showtime = Showtime(showtime=body["showtime"],movie_name=body["movie_name"], image_url=body["image_url"])
    db.session.add(new_showtime)
    db.session.commit()
    return jsonify(new_showtime.serialize()), 200

@api.route('/showtimes/<int:showtime_id>', methods=['PUT'])
def edit_showtime(showtime_id):
    body = request.get_json()
    showtime = Showtime.query.filter_by(id=showtime_id).first()
    time = body["showtime"]
    movie_name = body["movie_name"]
    image_url = body["image_url"]
    showtime.showtime = time
    showtime.movie_name = movie_name
    showtime.image_url = image_url
    db.session.commit()
    return jsonify(showtime.serialize()), 200

@api.route('/showtimes/<int:showtime_id>', methods=['DELETE'])
def delete_showtime(showtime_id):
    delete_showtime = Showtime.query.filter_by(id=showtime_id).first()
    db.session.delete(delete_showtime)
    db.session.commit()
    return jsonify(), 200


# RUTAS MULTIPLEX (ADJANI)
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


# RUTAS PARA CREAR AL USUARIO
@api.route("/user", methods=["POST"])
def crear_user():
    body = request.get_json()
    user = User(
            name = body["name"],
            email = body["email"],
            password = body["password"],
            is_active = body["is_active"]
    )
    db.session.add(user)
    db.session.commit()
    print("creado")
    response_body = {
        "msg":"user creado"
    }
    return jsonify(response_body), 200

# CREA RUTA PARA AUTENTICAR EL USER, DEVUELVE JWTs/TOKEN.(ADJANI)
@api.route("/login", methods=["POST"])
def login():
    name = request.json.get("name", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(name=name).first()   
    if user is None:
        return jsonify({"msg":"el user no está en sistema"}), 401
    print(user.serialize())
    print(user.password)

    if password != user.password:
        return jsonify({"msg": "password incorrecto"}), 401
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)


# PROTEJE LA RUTA CON EL TOKEN, EVITA EL ACCESO.
@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()   
    print(user)
    response_body = {
        "msg":"User encontrado",
        "user": user.serialize()
    }
    return jsonify(response_body), 200


