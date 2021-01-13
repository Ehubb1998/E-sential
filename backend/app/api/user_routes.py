from flask import Blueprint, jsonify, session, request, make_response
from app.models import db, User
from .check_for_token import check_for_token
from .bankInfo_routes import delete_bank_info
from .stockInfo_routes import delete_stock_info
from .plan_routes import delete_plan
from .watchList_routes import delete_watchList

user_routes = Blueprint("user", __name__)

@user_routes.route("/")
@check_for_token
def user_info():
    user_id = request.json["userId"]

    user = User.query.filter(User.id == user_id).first_or_404(description="That user does not exist")
    return jsonify({"User Info": user.profile_dict()})


@user_routes.route("/edit", methods=["PUT"])
@check_for_token
def edit_user():
    user_id = request.json["userId"]
    edit = request.json["whatToEdit"]
    edit_value = request.json["editValue"]

    user = User.query.filter(User.id == user_id).first_or_404(description="That user does not exist")

    if edit == "password":
        password_results = user.check_password(edit_value)
        if password_results == True:
            return "Password Matches"
        else:
            return "Incorrect Password"
    if edit == "email":
        user.setEmail = edit_value
        db.session.add(user)
        db.session.commit()
        return "Email Successfully Updated"
    if edit == "bank":
        user.setBank = edit_value
        db.session.add(user)
        db.session.commit()
        return "Primary Bank Successfully Updated"
    if edit == "job":
        user.setJob = edit_value
        db.session.add(user)
        db.session.commit()
        return "Job Successfully Updated"

    return make_response("Edit Info Required", 404, {"WWW-Authenticate": "Basic realm='Edit Info Required'"})


@user_routes.route("/edit/password", methods=["PUT"])
@check_for_token
def update_password():
    user_id = request.json["userId"]
    edit_value = request.json["editValue"]

    user = User.query.filter(User.id == user_id).first_or_404(description="That user does not exist")

    user.password = edit_value
    db.session.add(user)
    db.session.commit()
    return "Password Successfully Updated"


@user_routes.route("/", methods=["DELETE"])
@check_for_token
def delete_user():
    user_id = request.json["userId"]

    user = User.query.filter(User.id == user_id).first_or_404(description="That user does not exist")
    delete_bank_info(user_id)
    delete_stock_info(user=user_id, amount="all")
    delete_plan(user=user_id, amount="all")
    delete_watchList(user=user_id, amount="all")
    
    db.session.delete(user)
    db.session.commit()
    return "Account Successfully Deleted"
    
