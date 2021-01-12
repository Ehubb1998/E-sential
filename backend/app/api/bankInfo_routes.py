from flask import Blueprint, jsonify, session, request, make_response
from app.models import db, BankInfo
from .check_for_token import check_for_token

bankInfo_routes = Blueprint("bankInfo", __name__)

@bankInfo_routes.route("/", methods=["POST"])
@check_for_token
def new_bank_info():
    user_id = request.json["userId"]
    accountBalance = request.json["accountBalance"]
    monthlyIncome = request.json["monthlyIncome"]
    
    new_info = BankInfo(
        user_id=user_id,
        accountBalance=accountBalance,
        monthlyIncome=monthlyIncome
    )

    db.session.add(new_info)
    db.session.commit()

    info = new_info.bank_info()
    return jsonify({ "BankInfo": info })


@bankInfo_routes.route("/info")
@check_for_token
def bank_info():
    user_id = request.json["userId"]
    bank = BankInfo.query.filter(BankInfo.user_id == user_id).first()

    if not bank:
        return make_response("Please add Bank Information", 401, {"WWW-Authenticate": "Basic realm='Bank Info Required'"})
    info = bank.bank_info()

    return jsonify({ "BankInfo": info })


@bankInfo_routes.route("/edit", methods=["PUT"])
@check_for_token
def edit_bank_info():
    user_id = request.json["userId"]
    edit = request.json["whatToEdit"]
    edit_value = request.json["editValue"]
    bank = BankInfo.query.filter(BankInfo.user_id == user_id).first()

    if edit == "balance":
        bank.balance = edit_value
    if edit == "income":
        bank.income = edit_value

    db.session.add(bank)
    db.session.commit()
    bankInfo = bank.bank_info()

    return jsonify({ "BankInfo": bankInfo })


@bankInfo_routes.route("/", methods=["DELETE"])
@check_for_token
def delete_bank_info():
    user_id = request.json["userId"]
    bank = BankInfo.query.filter(BankInfo.user_id == user_id).first()

    db.session.delete(bank)
    db.session.commit()
    return "Bank Information Deleted"
