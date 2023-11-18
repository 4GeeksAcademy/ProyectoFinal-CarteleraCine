"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Movie, Showtime, Multiplex , City, Movie2
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

# RUTAS CIUDADES (ERIK)

@api.route('/city', methods=['GET'])
def get_all_city():
    city = City.query.all()
    if len(city) < 1:
        raise APIException('City not found', status_code=404)
    city = list(map(lambda item: item.serialize(), city))
    return jsonify(city), 200

@api.route('/city/<int:city_id>', methods=['GET'])
def get_city(city_id):
   city = City.query.get(city_id)
   if city is None:
      raise APIException('City not found', status_code=404)

   return jsonify(city.serialize()), 200


@api.route('/city', methods=[ 'POST'])
def create_cities():
   body = request.get_json()
   new_city = City (name=body["name"],image=body["image"])
   db.session.add(new_city)
   db.session.commit()
   return jsonify({"msg": "City created successfully"}), 200

@api.route('/city/<int:city_id>', methods=['PUT'])
def update_city(city_id):
    body = request.get_json()
    city = City.query.get(city_id)

    if city is None:
        raise APIException('City not found', status_code=404)

    if 'name' in body:
        city.name = body['name']
    if 'image' in body:
        city.image = body['image']

    db.session.commit()
    
    return jsonify({"msg": "City modified successfully"}), 200


@api.route('/city/<int:city_id>', methods=['DELETE'])
def delete_city(city_id):
    delete_city = City.query.get(city_id)
    db.session.delete(delete_city)
    db.session.commit()
    return jsonify({"msg": "City deleted successfully"}), 200

# RUTAS Movies2 (ERIK)


@api.route('/movie2', methods=['GET'])  
def get_all_movie():
    movies = Movie2.query.all()  
    if len(movies) < 1:  
        raise APIException('Movie not found', status_code=404)
    movies = list(map(lambda item: item.serialize(), movies))  
    return jsonify(movies), 200

@api.route('/movie2/<int:movie_id>', methods=['GET'])  
def get_movie(movie_id):
    movie = Movie2.query.get(movie_id)  
    if movie is None:
        raise APIException('Movie not found', status_code=404)

@api.route('/movie2', methods=['POST'])  
def create_movies():
    body = request.get_json()
    new_movie = Movie2(title=body["title"], posterPath=body["posterPath"], overview=body["overview"])  # Cambié el nombre aquí
    db.session.add(new_movie)
    db.session.commit()
    return jsonify({"msg": "Movie created successfully"}), 200

@api.route('/movie2/<int:movie_id>', methods=['PUT'])  
def update_movie(movie_id):
    body = request.get_json()
    movie = Movie2.query.get(movie_id)  # Cambié el nombre aquí

    if movie is None:
        raise APIException('Movie not found', status_code=404)

    if 'title' in body:
        movie.title = body['title']
    if 'posterPath' in body:
        movie.posterPath = body['posterPath']
    if 'overview' in body:
        movie.overview = body['overview']

    db.session.commit()
    
    return jsonify({"msg": "Movie modified successfully"}), 200

@api.route('/movie2/<int:movie_id>', methods=['DELETE'])  
def delete_movie(movie_id):
    delete_movie = Movie2.query.get(movie_id) 
    db.session.delete(delete_movie)
    db.session.commit()
    return jsonify({"msg": "Movie deleted successfully"}), 200





