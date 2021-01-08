from flask import Blueprint, jsonify, session, request, make_response
from functools import wraps
import jwt
import datetime
from ..config import Config
from app.models import db, User

auth_routes = Blueprint("auth", __name__)

def check_for_token(func):
    @wraps(func)
    def wrapped(*args, **kwargs):
        token = request.args.get("token")
        if not token:
            return jsonify({"message": "Missing Token"}), 401
        try:
            data = jwt.decode(token, Config.SECRET_KEY)
        except:
            return jsonify({"message": "Invalid Token"}), 401
        return func(*args, **kwargs)
    return wrapped


@auth_routes.route("/")
@check_for_token
def authenticate():
    return "It works big fella"


@auth_routes.route("/login")
def login():
    if request.json["userName"] == "Demo" and request.json["password"] == "password":
        token = jwt.encode({
            "user": request.json["userName"],
            "exp": datetime.datetime.utcnow() + datetime.timedelta(seconds=30)
        },
        Config.SECRET_KEY)
        return jsonify({"token": token})
    else:
        return make_response("Unable to verify", 401, {"WWW-Authenticate": "Basic realm='Login Required'"})