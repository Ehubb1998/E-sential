from flask import Blueprint, jsonify, session, request, make_response
import jwt
import datetime
from ..config import Config
from app.models import db, User
from .check_for_token import check_for_token

auth_routes = Blueprint("auth", __name__)


def validate_signup_password(password):
    capital_result = False
    num_result = False
    symbol_result = False
    length = len(password)
    letters = list(password)

    def has_number(string):
        return any(char.isdigit() for char in string)
    
    if has_number(password) == True:
        num_result = True

    if "!" in password or "@" in password or "#" in password or "$" in password or "%" in password or "&" in password or "^" in password or "*" in password or "," in password or "." in password or "?" in password or "+" in password or "=" in password or ";" in password or ":" in password or "-" in password or "_" in password:
        symbol_result = True

    for letter in letters:
        capital_letter = letter.upper()
        if letter == capital_letter:
            capital_result = True
    
    if capital_result == False or num_result == False:
        return False

    if length < 7:
        return False
    
    return True


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
    password = request.json["hashedPassword"]
    confirmedPassword = request.json["confirmedPassword"]

    password_result = validate_signup_password(hashedPassword)
    email_result = validate_signup_email(email)

    if email == '' and firstName == '' and lastName == '' and primaryBank == '' and job == '' and password_result == False:
        return make_response("Please fill out all required fields 1", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'")

    if email == '' and firstName == '' and lastName == '' and primaryBank == '' and job == '':
        return make_response("Please fill out all required fields ", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'")

    if email == '' and firstName == '' and lastName == '' and primaryBank == '':
        return make_response("Please fill out all required fields ", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'")

    if email == '' and lastName == '' and primaryBank == '' and job == '' and password_result == False:
        return make_response("Please fill out all required fields ", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'")

    if email == '' and lastName == '' and primaryBank == '' and job == '':
        return make_response("Please fill out all required fields ", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'")

    if email == '' and lastName == '' and primaryBank == '':
        return make_response("Please fill out Email, Last Name, and Primary Bank fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'")

    if email == '' and firstName == '' and primaryBank == '' and job == '' and password_result == False:
        return make_response("Please fill out all required fields ", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'")

    if email == '' and firstName == '' and primaryBank == '' and job == '':
        return make_response("Please fill out all required fields ", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'")

    if email == '' and firstName == '' and primaryBank == '':
        return make_response("Please fill out Email, First Name, and Primary Bank fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'")

    if email == '' and primaryBank == '' and job == '' and password_result == False:
        return make_response("Please fill out all required fields ", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'")

    if email == '' and primaryBank == '' and job == '':
        return make_response("Please fill out Email and Primary Bank and Job fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'")

    if firstName == '' and lastName == '' and primaryBank == '' and job == '' and password_result == False:
        return make_response("Please fill out all required fields ", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'")

    if firstName == '' and lastName == '' and primaryBank == '' and job == '':
        return make_response("Please fill out all required fields ", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'")

    if firstName == '' and lastName == '' and primaryBank == '':
        return make_response("Please fill out First Name, Last Name, and Primary Bank fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'")

    if firstName == '' and lastName == '' and job == '':
        return make_response("Please fill out First Name, Last Name, and Job fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'")

    if firstName == '' and lastName == '' and password_result == False:
        return make_response("Please fill out First Name, Last Name, and correct Password fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'")

    if firstName == '' and primaryBank == '':
        return make_response("Please fill out First Name and Primary Bank fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'")

    if firstName == '' and job == '':
        return make_response("Please fill out First Name and Job fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'")

    if firstName == '' and primaryBank == '' and job == '' and password_result == False:
        return make_response("Please fill out all required fields ", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'")

    if firstName == '' and primaryBank == '' and job == '':
        return make_response("Please fill out First Name, Primarty Bank, and Job fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'")

    if lastName == '' and primaryBank == '' and job == '' and password_result == False:
        return make_response("Please fill out all required fields ", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'")

    if lastName == '' and job == '' and password_result == False:
        return make_response("Please fill out Last Name, Job, and correct Password fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'")

    if lastName == '' and job == '':
        return make_response("Please fill out Last Name and Job fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'")

    if lastname == '' and primaryBank == '' and job == '':
        return make_response("Please fill out Last Name, Primary Bank, and Job fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'")

    if lastName == '' and primaryBank == '':
        return make_response("Please fill out Last Name and Primary Bank fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'")

    if lastName == '' and job == :
        return make_response("Please fill out Last Name and Job fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'")

    if lastName == '' and password_result == False:
        return make_response("Please fill out Last Name and correct Password fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'")

    if firstName == '' and password_result == False:
        return make_response("Please fill out First Name and correct Password fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'")
                    
    if email == '' and firstName == '' and lastName == '':
        return make_response("Please fill out Email, First Name, and Last Name fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'")

    if email == '' and primaryBank == '' and job == '':
        return make_response("Please fill out Email, Primary Bank, and Job fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'")

    if email == '' and firstName == '':
        return make_response("Please fill out Email and First Name fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'")

    if email == '' and lastName == '':
        return make_response("Please fill out Email and Last Name fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'")

    if email == '' and primaryBank == '':
        return make_response("Please fill out Email and Primary Bank fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'")

    if email == '' and job == '':
        return make_response("Please fill out Email and Job fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'")

    if firstName == '' and lastName == '':
        return make_response("Please fill out First Name and Last Name fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'")

    if primaryBank == '' and job == '' and password_result == False:
        return make_response("Please fill out Primary Bank, Job, and correct Password fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'")

    if primaryBank == '' and job == '':
        return make_response("Please fill out Primary Bank and Job fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'")

    if primaryBank == '' and password_result == False:
        return make_response("Please fill out Primary Bank and correct Password fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'")

    if job == '' and password_result == False:
        return make_response("Please fill out Job and correct Password fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'")

    if email == '' and password_result == '':
       return make_response("Please fill out Email and correct Password fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'")

    hashedPassword = 



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
