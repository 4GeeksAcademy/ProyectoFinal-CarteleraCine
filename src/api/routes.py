"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Movies
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/movies', methods=['GET'])
def get_movies():
    all_movies = Movies.query.all()
    result = list(map(lambda item: item.serialize(), all_movies))
    return jsonify(result), 200

@api.route('/movies', methods=['POST'])
def create_movie():
    body = request.get_json()
    new_movie = Movies(name=body["name"],release_date=body["release_date"],rating=body["rating"],overview=body["overview"])
    db.session.add(new_movie)
    db.session.commit()
    return jsonify(new_movie.serialize()), 200

@api.route('/movies/<int:movie_id>', methods=['PUT'])
def edit_movie(movie_id):
    body = request.get_json()
    movie = Movies.query.filter_by(id=movie_id).first()
    name = body["name"]
    release_date = body["release_date"]
    rating = body["rating"]
    overview = body["overview"]
    movie.name = name
    movie.release_date = release_date
    movie.rating = rating
    movie.overview = overview
    db.session.commit()
    return jsonify(movie.serialize()), 200

@api.route('/movies/<int:movie_id>', methods=['DELETE'])
def delete_movie(movie_id):
    delete_movie = Movies.query.filter_by(id=movie_id).first()
    db.session.delete(delete_movie)
    db.session.commit()
    return jsonify(), 200