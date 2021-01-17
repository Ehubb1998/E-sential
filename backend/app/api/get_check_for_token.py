from flask import request, jsonify
from ..config import Config
from functools import wraps
import jwt


def get_check_for_token(func):
    @wraps(func)
    def wrapped(id, token):
        if not token:
            return jsonify({"message": "Missing Token"}), 401
        try:
            data = jwt.decode(token, Config.SECRET_KEY, algorithms="HS256")
        except:
            return jsonify({"message": "Invalid Token"}), 401
        return func(id, token)
    return wrapped
