from flask import Blueprint, jsonify, session, request, make_response
from app.models import db, StockInfo
from ..config import Config
from .check_for_token import check_for_token

stockInfo_routes = Blueprint("stockInfo", __name__)




# @stockInfo_routes.route("/", methods=["POST"])
# @check_for_token
# def new_stock_info():
#     user_id = request.json["userId"]
#     accountBalance = request.json["accountBalance"]
#     monthlyIncome = request.json["monthlyIncome"]

#     new_info = BankInfo(
#         user_id=user_id,
#         accountBalance=accountBalance,
#         monthlyIncome=monthlyIncome
#     )

#     db.session.add(new_info)
#     db.session.commit()

#     info = new_info.bank_info()
#     return jsonify({"BankInfo": info})
