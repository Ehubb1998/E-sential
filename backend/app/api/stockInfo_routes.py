from flask import Blueprint, jsonify, session, request, make_response
from app.models import db, StockInfo
from ..config import Config
from .check_for_token import check_for_token
import requests

stockInfo_routes = Blueprint("stockInfo", __name__)

def iex_stock_info(company, postMethod=False):
    # api_key = Config.IEX_KEY
    test_key = Config.IEX_TEST_KEY
    response = requests.get(f"https://sandbox.iexapis.com/stable/stock/{company}/batch", params={"types": "company,chart,news", "token": test_key})
    if response:
        company = response.json()
        if postMethod == True:
            chart = company["chart"][1]
            return chart["close"]
        else:
            return company
    else: 
        return "Invalid Company Stock Symbol"


@stockInfo_routes.route("/", methods=["POST"])
@check_for_token
def new_stock_info():
    user_id = request.json["userId"]
    company = request.json["companyName"]
    num_shares = request.json["numShares"]
    stock_price = iex_stock_info(company, postMethod=True)

    if stock_price != "Invalid Company Stock Symbol":

        new_info = StockInfo(
            user_id=user_id,
            stock=company,
            shares=num_shares,
            pps=stock_price
        )

        db.session.add(new_info)
        db.session.commit()

        info = new_info.stock_info()
        return jsonify({"StockInfo": info})
    else:
        "Invalid Company Stock Symbol"


@stockInfo_routes.route("/info")
@check_for_token
def stock_info():
    user_id = request.json["userId"]
    allOrOne = request.json["allOrOne"]

    if allOrOne == "one":
        stock_name = request.json["stock"]
        stocks = StockInfo.query.filter(StockInfo.user_id == user_id).all()

        if not stocks:
            return make_response(f"You do not own any {stock_name} stock", 401, {"WWW-Authenticate": "Basic realm='Invalid'"})

        for stock in stocks:
            stock_info = stock.stock_info()
            if stock_info["stock"] == stock_name:
                info = stock.stock_info()
                return jsonify({"StockInfo": info})
        return make_response("Not a valid stock name", 401, {"WWW-Authenticate": "Basic realm='Invalid'"})
    else:
        stocks = StockInfo.query.filter(StockInfo.user_id == user_id).all()

        if not stocks:
            return make_response("You do not own stocks", 401, {"WWW-Authenticate": "Basic realm='Invalid'"})

        info = [stock.stock_info() for stock in stocks]
        return jsonify({"StockInfo": info})




