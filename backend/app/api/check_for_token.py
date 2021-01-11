from flask import request, jsonify
from ..config import Config
from functools import wraps
import jwt


def check_for_token(func):
    @wraps(func)
    def wrapped(*args, **kwargs):
        try:
            token = request.json["token"]
        except:
            return jsonify({"message": "Missing Token"}), 401
        try:
            data = jwt.decode(token, Config.SECRET_KEY, algorithms="HS256")
        except:
            return jsonify({"message": "Invalid Token"}), 401
        return func(*args, **kwargs)
    return wrapped
