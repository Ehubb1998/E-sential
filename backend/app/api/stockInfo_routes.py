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


@stockInfo_routes.route("/info/<id>/<token>/<allOrOne>/<stock>")
@check_for_token
def stock_info(*args, **kwargs):
    id = kwargs["id"]
    allOrOne = kwargs["allOrOne"]
    stock = kwargs["stock"]

    if allOrOne == "1":
        stock = StockInfo.query.filter((StockInfo.user_id == id) & (StockInfo.stock == stock)).first()

        if not stock:
            return make_response(f"You do not own any {stock} stock", 404, {"WWW-Authenticate": "Basic realm='Invalid'"})

        info = stock.stock_info()
        return jsonify({"StockInfo": info})
    else:
        stocks = StockInfo.query.filter(StockInfo.user_id == id).all()

        if not stocks:
            return make_response("You do not own stocks", 404, {"WWW-Authenticate": "Basic realm='Invalid'"})

        info = [stock.stock_info() for stock in stocks]
        return jsonify({"StockInfo": info})


@stockInfo_routes.route("/edit", methods=["PUT"])
@check_for_token
def edit_stock_info():
    user_id = request.json["userId"]
    stock_name = request.json["stock"]
    edit_value = request.json["editValue"]

    stock = StockInfo.query.filter((StockInfo.user_id == user_id) & (StockInfo.stock == stock_name)).first()

    if not stock:
        return make_response(f"You do not own any {stock_name} stock", 404, {"WWW-Authenticate": "Basic realm='Invalid'"})

    stock.numShares = edit_value
    db.session.add(stock)
    db.session.commit()

    return jsonify({"Stock Info": stock.stock_info()})


@stockInfo_routes.route("/", methods=["DELETE"])
@check_for_token
def delete_stock_info(user="", amount=""):
    if user != "" and amount != "":
        user_id = user
        stocks = StockInfo.query.filter(StockInfo.user_id == user_id).all()
        if not stocks:
            return "User does not own any stocks"

        for stock in stocks:
            db.session.delete(stock)
            db.session.commit()
        return "Stock Information Deleted"
    else: 
        user_id = request.json["userId"]

    stock_name = request.json["stock"]
    stock = StockInfo.query.filter((StockInfo.user_id == user_id) & (StockInfo.stock == stock_name)).first_or_404(description="User does not own that stock")

    db.session.delete(stock)
    db.session.commit()
    return "Stock Information Deleted"
