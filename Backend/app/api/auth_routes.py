from flask import Blueprint, jsonify, session, request, make_response
import jwt
import datetime
from ..config import Config
from app.models import db, User
from .check_for_token import check_for_token

auth_routes = Blueprint("auth", __name__)


# @auth_routes.route("/")
# @check_for_token
# def authenticate():
#     return "It works big fella"
def validate_signup_password(password):
    capital_result = False
    num_result = False
    symbol_result = False
    length = len(password)
    letters = list(password)

    def had_number(string):
        return any(char.isdigit() for char in string)
    

    for letter in letters:
        pass


def validate_signup_email(email):
    user = User.query.filter(User.email == email).all()
    if user:
        return False
    return True


@auth_routes.route("/signup", methods=["POST"])
def signup():
    firstName = request.json["firstName"]
    lastName = request.json["lastName"]
    email = request.json["email"]
    primaryBank = request.json["primaryBank"]
    job = request.json["job"]
    hashedPassword = request.json["hashedPassword"]



@auth_routes.route("/login", methods=["POST"])
def login():
    email = request.json["email"]
    password = request.json["password"]
    user = User.query.filter(User.email == email).first()
    if user:
        password_results = user.check_password(password)
        if password_results == True:
            token = jwt.encode({
                "email": request.json["email"],
                "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=12)
            },
            Config.SECRET_KEY)
            user_dict = user.proile_dict()
            return jsonify({"token": token, "userData": user_dict})
    else:
        return make_response("Unable to verify", 401, {"WWW-Authenticate": "Basic realm='Login Required'"})
