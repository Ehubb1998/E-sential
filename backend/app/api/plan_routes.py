from flask import Blueprint, jsonify, session, request, make_response
from app.models import db, Plan
from .check_for_token import check_for_token

plan_routes = Blueprint("plan", __name__)

@plan_routes.route("/", methods=["POST"])
@check_for_token
def create_plan():
    user_id = request.json["userId"]
    name = request.json["name"]
    job = request.json["job"]
    monthlyIncome = request.json["monthlyIncome"]
    stock = request.json["stockName"]
    amountToSave = request.json["amountToSave"]
    target = request.json["target"]

    new_plan = Plan(
        user_id=user_id,
        name=name,
        job=job,
        monthlyIncome=monthlyIncome,
        stock=stock,
        amountToSave=amountToSave,
        targetAmountToInvest=target
    )

    db.session.add(new_plan)
    db.session.commit()
    return jsonify({"Plan": new_plan.plan()})


@plan_routes.route("/info/<id>/<token>/<allOrOne>/<plan>")
@check_for_token
def plan_info(*args, **kwargs):
    id = kwargs["id"]
    allOrOne = kwargs["allOrOne"]
    plan = kwargs["plan"]

    if allOrOne == "1":
        plan = Plan.query.filter((Plan.user_id == id) & (Plan.name == plan)).first_or_404(description="User does that plan")

        return jsonify({"Plan": plan.plan()})
    else:
        plans = Plan.query.filter(Plan.user_id == id).all()

        if not plans:
            return make_response(jsonify("You do not have any plans"), 404, {"WWW-Authenticate": "Basic realm='Invalid'"})

        info = [plan.plan() for plan in plans]
        return jsonify({"Plans": info})


@plan_routes.route("/", methods=["DELETE"])
@check_for_token
def delete_plan(user, amount):
    if user != "" and amount != "":
        user_id = user
        plans = Plan.query.filter(Plan.user_id == user_id).all()
        if not plans:
            return jsonify("User does not have any plans")

        for plan in plans:
            db.session.delete(plan)
            db.session.commit()
        return jsonify("Plans Deleted")
    else: 
        user_id = request.json["userId"]
        plan_name = request.json["planName"]

        plan = Plan.query.filter((Plan.user_id == user_id) & (Plan.name == plan_name)).first_or_404(description="User does not have that plan")
        db.session.delete(plan)
        db.session.commit()
        return jsonify("Plan Deleted")

    
