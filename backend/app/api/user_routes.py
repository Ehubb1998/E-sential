from flask import Blueprint, jsonify, session, request, make_response
from app.models import db, User
from .check_for_token import check_for_token
from .bankInfo_routes import delete_bank_info
from .stockInfo_routes import delete_stock_info
from .plan_routes import delete_plan
from .watchList_routes import delete_watchList

user_routes = Blueprint("user", __name__)

@user_routes.route("/<id>/<token>")
@check_for_token
def user_info(*args, **kwargs):
    id = kwargs["id"]
    
    user = User.query.filter(User.id == id).first_or_404(description="That user does not exist")
    return jsonify({"userData": user.profile_dict()})


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
            return jsonify("Password Matches")
        else:
            return jsonify("Incorrect Password")
    if edit == "email":
        user.setEmail = edit_value
        db.session.add(user)
        db.session.commit()
        return jsonify({"userData": user.profile_dict()})
    if edit == "bank":
        user.setBank = edit_value
        db.session.add(user)
        db.session.commit()
        return jsonify({"userData": user.profile_dict()})
    if edit == "job":
        user.setJob = edit_value
        db.session.add(user)
        db.session.commit()
        return jsonify({"userData": user.profile_dict()})

    return make_response(jsonify("Edit Info Required"), 404)


@user_routes.route("/edit/password", methods=["PUT"])
@check_for_token
def update_password():
    user_id = request.json["userId"]
    edit_value = request.json["editValue"]

    user = User.query.filter(User.id == user_id).first_or_404(description="That user does not exist")

    user.password = edit_value
    db.session.add(user)
    db.session.commit()
    return jsonify("Password Successfully Updated")


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
    return jsonify("Account Successfully Deleted")
    
