from flask import Blueprint, jsonify, session, request
from app.models import db, User

auth_routes = Blueprint("auth", __name__)

@auth_routes.route("/")
def authenticate():
    