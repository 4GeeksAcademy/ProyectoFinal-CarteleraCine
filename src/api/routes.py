"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Movie, Showtime, Multiplex , City, Movie2
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
@jwt_required()
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
def get_movie2(movie_id):
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
def delete_movie2(movie_id):
    delete_movie = Movie2.query.get(movie_id) 
    db.session.delete(delete_movie)
    db.session.commit()
    return jsonify({"msg": "Movie deleted successfully"}), 200


# RUTAS PARA CREAR AL USUARIO
@api.route("/user", methods=["GET"])
def mostrar_user():
    user = User.query.all()
    result = list(map(lambda user: user.serialize(), user))
    
    return jsonify(result), 200

@api.route("/user", methods=["POST"])
def crear_user():
    body = request.get_json()
    user = User(
            name = body["name"],
            email = body["email"],
            password = body["password"],
            is_active = True
    )
    db.session.add(user)
    db.session.commit()
    print("creado")
    response_body = {
        "msg":"user creado"
    }
    return jsonify(response_body), 200

@api.route("/user/<int:user_id>", methods=["PUT"])
def modificar_user(user_id):
    user = User.query.filter_by(id=user_id).first()
    body = request.get_json()
    user.name = body["name"]
    user.email = body["email"]
    user.password = body["password"]
    db.session.commit()

    return jsonify(user.serialize()), 200

@api.route("/user/<int:user_id>", methods=["DELETE"])
def Eliminar_user(user_id):
    user = User.query.filter_by(id=user_id).first()  
    db.session.delete(user)
    db.session.commit()
    response_body = {
        "msg":"Usuario Eliminado"
    }
    return jsonify(response_body), 200


# CREA RUTA PARA AUTENTICAR EL USER, DEVUELVE JWTs/TOKEN.(ADJANI)
@api.route("/login", methods=["POST"])
def login():
    name = request.json.get("name", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email).first() 

    if user is None:
        return jsonify({"msg":"el user no está en sistema"}), 401
    print(user.serialize())
    print(user.password)

    if password != user.password:
        return jsonify({"msg": "password incorrecto"}), 401
    
    access_token = create_access_token(identity=email)
    return jsonify({"token":access_token, "name": user.name})

@api.route("/signup", methods=["POST"]) 
def signup():
    body = request.get_json()
    print(body)
    
    user = User.query.filter_by(email=body["email"]).first()
    print(user)
    if user is None:
        user = User(
            name = body["name"],
            email = body["email"],
            password = body["password"],
            is_active = True
        )
        db.session.add(user)
        db.session.commit()
        response_body = {
            "msg": "Usuario Creado"
        }
        return jsonify(response_body), 200
    else:
        return jsonify({"msg": "Usuario Existente"}), 401
    
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






# @api.route("/login", methods=["POST"])
# def login():
#     email = request.json.get("email", None)
#     password = request.json.get("password", None)
#     user = User.query.filter_by(email=email).first()
#     print(user)

#     if user is None:
#         return jsonify({"msg": "The user doesnt exist"}), 401

#     if password != user.password:
#         return jsonify({"msg": "Wrong password"}), 401

#     access_token = create_access_token(identity=email)
#     return jsonify(access_token=access_token)

# @api.route('/signup', methods=['POST'])
# def signup():
#     body = request.get_json()
#     print(body)
#     user = User.query.filter_by(email=body["email"]).first()
#     print(user)
#     if user == None:
#         new_user = User(email=body["email"],password=body["password"], is_active=True)
#         db.session.add(new_user)
#         db.session.commit()
#         response_body = {
#             "msg": "New user created"
#         }
#         return jsonify(response_body), 200
#     else:
#         return jsonify({"msg": "There is already a user created with this email"}), 401
