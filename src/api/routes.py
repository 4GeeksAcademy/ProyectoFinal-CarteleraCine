"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Movie, Showtime
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/', methods=['GET'])
def get_movies():
    all_movies = Movie.query.all()
    result = list(map(lambda item: item.serialize(), all_movies))
    return jsonify(result), 200

@api.route('/<int:movie_id>', methods=['GET'])
def get_movie(movie_id):
    movie = Movie.query.filter_by(id=movie_id).first()
    return jsonify(movie.serialize()), 200

@api.route('/', methods=['POST'])
def create_movie():
    body = request.get_json()
    new_movie = Movie(name=body["name"],release_date=body["release_date"],rating=body["rating"],overview=body["overview"],image_url=["image_url"])
    db.session.add(new_movie)
    db.session.commit()
    return jsonify(new_movie.serialize()), 200

@api.route('/<int:movie_id>', methods=['PUT'])
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

@api.route('/<int:movie_id>', methods=['DELETE'])
def delete_movie(movie_id):
    delete_movie = Movie.query.filter_by(id=movie_id).first()
    db.session.delete(delete_movie)
    db.session.commit()
    return jsonify(), 200

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
    new_showtime = Showtime(showtime=body["showtime"],movie_name=body["movie_name"])
    db.session.add(new_showtime)
    db.session.commit()
    return jsonify(new_showtime.serialize()), 200

@api.route('/showtimes/<int:showtime_id>', methods=['PUT'])
def edit_showtime(showtime_id):
    body = request.get_json()
    showtime = Showtime.query.filter_by(id=showtime_id).first()
    time = body["showtime"]
    movie_name = body["movie_name"]
    showtime.showtime = time
    showtime.movie_name = movie_name
    db.session.commit()
    return jsonify(showtime.serialize()), 200

@api.route('/showtimes/<int:showtime_id>', methods=['DELETE'])
def delete_showtime(showtime_id):
    delete_showtime = Showtime.query.filter_by(id=showtime_id).first()
    db.session.delete(delete_showtime)
    db.session.commit()
    return jsonify(), 200