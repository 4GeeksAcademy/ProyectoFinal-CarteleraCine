from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Movie
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)

@api.route('/movie', methods=['GET'])
def get_all_movie():
    city = Movie.query.all()
    if len(movie) < 1:
        raise APIException('Movie not found', status_code=404)
    movie = list(map(lambda item: item.serialize(), movie))
    return jsonify(movie), 200


@api.route('/movie/<int:movie_id>', methods=['GET'])
def get_movie(movie_id):
   movie = Movie.query.get(movie_id)
   if movie is None:
      raise APIException('Movie not found', status_code=404)


@api.route('/movie', methods=[ 'POST'])
def create_movies():
   body = request.get_json()
   new_movie = Movie(title=body["title"],posterPath=body["posterPath"],overview=body["overview"] )
   db.session.add(new_movie)
   db.session.commit()
   return jsonify({"msg": "Movie created successfully"}), 200


@api.route('/movie/<int:movie_id>', methods=['PUT'])
def update_movie(movie_id):
    body = request.get_json()
    movie = Movie.query.get(movie_id)

    if movie is None:
        raise APIException('City not found', status_code=404)

    if 'title' in body:
        movie.title = body['title']
    if 'posterPath' in body:
        movie.posterPath = body['posterPath']
    if 'overview' in body:
        movie.overview = body['overview']

    db.session.commit()
    
    return jsonify({"msg": "Movie modified successfully"}), 200



@api.route('/movie/<int:movie_id>', methods=['DELETE'])
def delete_movie(movie_id):
    delete_movie = Movie.query.get(movie_id)
    db.session.delete(delete_movie)
    db.session.commit()
    return jsonify({"msg": "Movie deleted successfully"}), 200
