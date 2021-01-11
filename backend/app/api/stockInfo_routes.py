from flask import Blueprint, jsonify, session, request, make_response
from app.models import db, StockInfo
from ..config import Config
from .check_for_token import check_for_token
import requests

stockInfo_routes = Blueprint("stockInfo", __name__)

def iex_stock_info(company):
    # api_key = Config.IEX_KEY
    test_key = Config.IEX_TEST_KEY
    response = requests.get(f"https://sandbox.iexapis.com/stable/stock/{company}/batch", params={"types": "company,chart,news", "token": test_key})
    if response:
        company = response.json()
        return company
    else: 
        return "Invalid Company Stock Symbol"


@stockInfo_routes.route("/", methods=["POST"])
@check_for_token
def new_stock_info():
    user_id = request.json["userId"]
    company_name = request.json["companyName"]

    new_info = StockInfo(
        user_id=user_id,
    )

    db.session.add(new_info)
    db.session.commit()

    info = new_info.stock_info()
    return jsonify({"StockInfo": info})
