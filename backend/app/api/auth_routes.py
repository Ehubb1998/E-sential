from flask import Blueprint, jsonify, session, request, make_response
import jwt
import datetime
from ..config import Config
from app.models import db, User

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
    
    if capital_result == False or num_result == False or symbol_result == False:
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
    rememberMe = request.json["rememberMe"]

    password_result = validate_signup_password(password)
    email_result = validate_signup_email(email)

    if email == '' and firstName == '' and lastName == '' and primaryBank == '' and job == '' and password_result == False:
        return make_response("Please fill out all required fields 1", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'"})

    if email == '' and firstName == '' and lastName == '' and primaryBank == '' and job == '':
        return make_response("Please fill out all required fields 2", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'"})

    if email == '' and firstName == '' and lastName == '' and primaryBank == '':
        return make_response("Please fill out all required fields 3", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'"})

    if email == '' and lastName == '' and primaryBank == '' and job == '' and password_result == False:
        return make_response("Please fill out all required fields 4", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'"})

    if email == '' and lastName == '' and primaryBank == '' and job == '':
        return make_response("Please fill out all required fields 5", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'"})

    if email == '' and firstName == '' and primaryBank == '' and job == '' and password_result == False:
        return make_response("Please fill out all required fields 6", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'"})

    if email == '' and firstName == '' and primaryBank == '' and job == '':
        return make_response("Please fill out all required fields 7", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'"})

    if email == '' and primaryBank == '' and job == '' and password_result == False:
        return make_response("Please fill out all required fields 8", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'"})

    if firstName == '' and lastName == '' and primaryBank == '' and job == '' and password_result == False:
        return make_response("Please fill out all required fields 9", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'"})

    if firstName == '' and lastName == '' and primaryBank == '' and job == '':
        return make_response("Please fill out all required fields 10", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'"})

    if firstName == '' and primaryBank == '' and job == '' and password_result == False:
        return make_response("Please fill out all required fields 11", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'"})

    if lastName == '' and primaryBank == '' and job == '' and password_result == False:
        return make_response("Please fill out all required fields 12", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'"})

    if email == '' and firstName == '' and lastName == '' and password_result == False:
        return make_response("Please fill out all required fields 13", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'"})

    if email == '' and firstName == '' and primaryBank == '' and password_result == False:
        return make_response("Please fill out all required fields 14", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'"})

    if firstName == '' and lastName == '' and job == '' and password_result == False:
        return make_response("Please fill out all required fields 15", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'"})

    if firstName == '' and lastName == '' and email == '' and job == '':
        return make_response("Please fill out all required fields 16", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'"})

    if email == '' and lastName == '' and primaryBank == '':
        return make_response("Please fill out Last Name, Email, and Primary Bank fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'"})

    if email == '' and firstName == '' and primaryBank == '':
        return make_response("Please fill out First Name, Email, and Primary Bank fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'"})

    if email == '' and firstName == '' and job == '':
        return make_response("Please fill out First Name, Email, and Job fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'"})

    if email == '' and primaryBank == '' and job == '':
        return make_response("Please fill out Email and Primary Bank and Job fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'"})

    if email == '' and lastName == '' and job == '':
        return make_response("Please fill out Last Name, Email, and Job fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'"})

    if firstName == '' and lastName == '' and primaryBank == '':
        return make_response("Please fill out First Name, Last Name, and Primary Bank fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'"})

    if firstName == '' and lastName == '' and job == '':
        return make_response("Please fill out First Name, Last Name, and Job fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'"})

    if firstName == '' and lastName == '' and password_result == False:
        return make_response("Please fill out First Name, Last Name, and correct Password fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'"})

    if firstName == '' and primaryBank == '' and job == '':
        return make_response("Please fill out First Name, Primarty Bank, and Job fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'"})

    if lastName == '' and job == '' and password_result == False:
        return make_response("Please fill out Last Name, Job, and correct Password fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'"})

    if lastName == '' and primaryBank == '' and job == '':
        return make_response("Please fill out Last Name, Primary Bank, and Job fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'"})

    if email == '' and firstName == '' and lastName == '':
        return make_response("Please fill out First Name, Last Name, and Email fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'"})

    if email == '' and primaryBank == '' and job == '':
        return make_response("Please fill out Email, Primary Bank, and Job fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'"})

    if lastName == '' and password_result == False:
        return make_response("Please fill out Last Name and correct Password fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'"})

    if firstName == '' and password_result == False:
        return make_response("Please fill out First Name and correct Password fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'"})

    if primaryBank == '' and job == '' and password_result == False:
        return make_response("Please fill out Primary Bank, Job, and correct Password fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'"})

    if firstName == '' and primaryBank == '':
        return make_response("Please fill out First Name and Primary Bank fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'"})

    if firstName == '' and job == '':
        return make_response("Please fill out First Name and Job fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'"})

    if lastName == '' and job == '':
        return make_response("Please fill out Last Name and Job fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'"})

    if lastName == '' and primaryBank == '':
        return make_response("Please fill out Last Name and Primary Bank fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'"})

    if lastName == '' and job == '':
        return make_response("Please fill out Last Name and Job fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'"})

    if email == '' and firstName == '':
        return make_response("Please fill out First Name and Email fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'"})

    if email == '' and lastName == '':
        return make_response("Please fill out Last Name and Email fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'"})

    if email == '' and primaryBank == '':
        return make_response("Please fill out Email and Primary Bank fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'"})

    if email == '' and job == '':
        return make_response("Please fill out Email and Job fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'"})

    if firstName == '' and lastName == '':
        return make_response("Please fill out First Name and Last Name fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'"})

    if primaryBank == '' and job == '':
        return make_response("Please fill out Primary Bank and Job fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'"})

    if primaryBank == '' and password_result == False:
        return make_response("Please fill out Primary Bank and correct Password fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'"})

    if job == '' and password_result == False:
        return make_response("Please fill out Job and correct Password fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'"})

    if email == '' and password_result == '':
       return make_response("Please fill out Email and correct Password fields", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'"})

    if password != confirmedPassword:
        return make_response("Password and Confirmed Password must match", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'"})

    if password_result == False:
        return make_response("Please follow Password requirements", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'"})

    if email_result == False:
        return make_response("Sorry, that email already exists", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'"})

    if firstName == '':
        return make_response("Please fill out First Name field", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'"})

    if lastName == '':
        return make_response("Please fill out Last Name field", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'"})

    if email == '':
        return make_response("Please fill out Email field", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'"})

    if primaryBank == '':
        return make_response("Please fill out Primary Bank field", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'"})

    if job == '':
        return make_response("Please fill out Job field", 401, {"WWW-Authenticate": "Basic realm='Sign Up failed'"})

    user = User(
        firstName=firstName,
        lastName=lastName,
        email=email,
        primaryBank=primaryBank,
        job=job
    )

    user.password = password
    db.session.add(user)
    db.session.commit()

    user_dict = user.profile_dict()
    if rememberMe == True:
        token = jwt.encode({
            "email": request.json["email"],
            "exp": datetime.datetime.utcnow() + datetime.timedelta(weeks=1040)
        },
        Config.SECRET_KEY)
        return jsonify({"token": token, "userData": user_dict})
    else:
        token = jwt.encode({
            "email": request.json["email"],
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=12)
        },
        Config.SECRET_KEY)
        return jsonify({"token": token, "userData": user_dict})



@auth_routes.route("/login", methods=["POST"])
def login():
    email = request.json["email"]
    password = request.json["password"]
    rememberMe = request.json["rememberMe"]

    user = User.query.filter(User.email == email).first()
    if user:
        password_results = user.check_password(password)
        if password_results == True:
            if rememberMe == True:
                token = jwt.encode({
                    "email": request.json["email"],
                    "exp": datetime.datetime.utcnow() + datetime.timedelta(weeks=1040)
                },
                Config.SECRET_KEY)
                user_dict = user.profile_dict()
                return jsonify({"token": token, "userData": user_dict})
            else:
                token = jwt.encode({
                    "email": request.json["email"],
                    "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=12)
                },
                Config.SECRET_KEY)
                user_dict = user.profile_dict()
                return jsonify({"token": token, "userData": user_dict})
        else:
            return make_response("Incorrect Password", 401, {"WWW-Authenticate": "Basic realm='Login Required'"})
    else:
        return make_response("The provided Email does not exist", 401, {"WWW-Authenticate": "Basic realm='Login Required'"})
