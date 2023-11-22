"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Movie, Showtime, Multiplex 
from api.utils import generate_sitemap, APIException

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
    movie.name = body["name"]
    movie.release_date = body["release_date"]
    movie.rating = body["rating"]
    movie.overview = body["overview"]
    movie.image_url = body["image_url"]
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

@api.route('/showtimes/<int:movie_name>/<int:multiplex_cinema>', methods=['GET'])
def get_showtime_movie_id(movie_name, multiplex_cinema):
    get_showtime = Showtime.query.filter_by(movie_name=movie_name, multiplex_cinema=multiplex_cinema).all()
    result = list(map(lambda item: item.serialize(), get_showtime))
    return jsonify(result), 200

@api.route('/showtimes/multiplex/<int:multiplex_cinema>', methods=['GET'])
def get_showtime_multiplex_id(multiplex_cinema):
    get_showtime = Showtime.query.filter_by(multiplex_cinema=multiplex_cinema).all()
    result = list(map(lambda item: item.serialize(), get_showtime))
    return jsonify(result), 200

@api.route('/showtimes', methods=['POST'])
def create_showtime():
    body = request.get_json()
    new_showtime = Showtime(movie_name=body["movie_name"], multiplex_cinema=body["multiplex_cinema"], showtime=body["showtime"])
    db.session.add(new_showtime)
    db.session.commit()
    return jsonify(new_showtime.serialize()), 200

@api.route('/showtimes/<int:showtime_id>', methods=['PUT'])
def edit_showtime(showtime_id):
    body = request.get_json()
    showtime = Showtime.query.filter_by(id=showtime_id).first()
    showtime.movie_name = body["movie_name"]
    showtime.multiplex_cinema = body["multiplex_cinema"]
    showtime.showtime = body["showtime"]
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
