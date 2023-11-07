"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, City
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


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






    