from flask import Blueprint, jsonify, session, request, make_response
from app.models import db, StockInfo
from ..config import Config
from .check_for_token import check_for_token
from collections import Counter
import requests
import datetime

stockInfo_routes = Blueprint("stockInfo", __name__)

def iex_stock_info(company, time_frame, postMethod=False):
    # api_key = Config.IEX_KEY
    test_key = Config.IEX_TEST_KEY

    if time_frame == "today":
        date = datetime.datetime.now()
        year = date.year
        month = date.strftime("%m")
        day = date.strftime("%d")

        response = requests.get(f"https://sandbox.iexapis.com/stable/stock/{company}/chart/date/{year}{month}17", params={"token": test_key})
        if response:
            company_chart = response.json()
            return company_chart

    if time_frame == "week":
        response = requests.get(f"https://sandbox.iexapis.com/stable/stock/{company}/chart/5d", params={"token": test_key})
        if response:
            company_chart = response.json()
            return company_chart

    if time_frame == "month":
        response = requests.get(f"https://sandbox.iexapis.com/stable/stock/{company}/chart/1m", params={"token": test_key})
        if response:
            company_chart = response.json()
            return company_chart

    if time_frame == "6months":
        response = requests.get(f"https://sandbox.iexapis.com/stable/stock/{company}/chart/6m", params={"token": test_key})
        if response:
            company_chart = response.json()
            return company_chart

    if time_frame == "year":
        response = requests.get(f"https://sandbox.iexapis.com/stable/stock/{company}/chart/1y", params={"token": test_key})
        if response:
            company_chart = response.json()
            return company_chart

    if time_frame == "company":
        response = requests.get(f"https://sandbox.iexapis.com/stable/stock/{company}/company", params={"token": test_key})
        if response:
            company_chart = response.json()
            return company_chart
        
    # response = requests.get(f"https://sandbox.iexapis.com/stable/stock/{company}/batch", params={"types": "company,chart,news", "token": test_key})
    # if response:
    #     company = response.json()
    #     if postMethod == True:
    #         chart = company["chart"][1]
    #         return chart["close"]
    #     else:
    #         return company
    # else: 
    #     return "Invalid Company Stock Symbol"


@stockInfo_routes.route("/", methods=["POST"])
@check_for_token
def new_stock_info():
    user_id = request.json["userId"]
    stock = request.json["stockSymbol"]
    num_shares = request.json["numShares"]
    stock_price = request.json["pps"]
        
    new_info = StockInfo(
        user_id=user_id,
        stock=stock,
        shares=num_shares,
        pps=stock_price
    )

    db.session.add(new_info)
    db.session.commit()

    info = new_info.stock_info()
    return jsonify({"StockInfo": info})


@stockInfo_routes.route("/info/<id>/<token>/<allOrOne>/<stock>")
@check_for_token
def stock_info(*args, **kwargs):
    id = kwargs["id"]
    allOrOne = kwargs["allOrOne"]
    stock = kwargs["stock"]

    if allOrOne == "1":
        stock = StockInfo.query.filter((StockInfo.user_id == id) & (StockInfo.stock == stock)).first()

        if not stock:
            return make_response(jsonify(f"You do not own any {stock} stock"), 404)

        info = stock.stock_info()
        return jsonify({"StockInfo": info})
    else:
        stocks = StockInfo.query.filter(StockInfo.user_id == id).all()
        if not stocks:
            return make_response(jsonify("You do not own stocks"), 404)
        
        info = [stock.stock_info() for stock in stocks]

        stock_name_list = []
        stock_info_list = []
        for i in range(len(stocks)):
            stock_info = info[i]
            stock_name = stock_info["stock"]
            stock_name_list.append(stock_name)
        
        repeated_stocks = [k for k, v in Counter(stock_name_list).items() if v > 1]
        if repeated_stocks:
            for stockName in repeated_stocks:
                stock_list = StockInfo.query.filter((StockInfo.user_id == id) & (StockInfo.stock == stockName)).all()
                stock_pps = [stock.pps_function() for stock in stock_list]
                stock_shares = [stock.shares_function() for stock in stock_list]
                total_value = 0
                total_num_shares = 0
                for i in range(len(stock_list)):
                    current_pps = stock_pps[i]
                    current_shares = stock_shares[i]
                    value = current_pps * current_shares
                    total_value = total_value + value
                    total_num_shares = total_num_shares + current_shares

                new_pps = total_value / total_num_shares
                first_stock = StockInfo.query.filter((StockInfo.user_id == id) & (StockInfo.stock == stockName)).first()
                first_stock.pricePerShare = new_pps
                first_stock.numShares = total_num_shares
                info_from_stock = first_stock.stock_info()
                stock_info_list.append(info_from_stock)

                for i in range(len(stock_name_list)):
                    strName = stock_name_list[i]
                    if strName != stockName:
                        stock_info_list.append(info[i])

            return jsonify({"StockInfo": stock_info_list})

        return jsonify({"StockInfo": info})


@stockInfo_routes.route("/chart/<timeFrame>/<token>/<stock>")
@check_for_token
def stock_chart_data(*args, **kwargs):
    time_frame = kwargs["timeFrame"]
    stock = kwargs["stock"]
    
    if time_frame == "company":
        stock_charts = iex_stock_info(stock, time_frame)
        return jsonify({"CompanyInfo": stock_charts})
        
    stock_charts = iex_stock_info(stock, time_frame)
    # print(jsonify({"StockChart": stock_charts}).data)
    return jsonify({"StockChart": stock_charts})


@stockInfo_routes.route("/edit", methods=["PUT"])
@check_for_token
def edit_stock_info():
    user_id = request.json["userId"]
    stock_name = request.json["stock"]
    edit_value = request.json["editValue"]

    stock = StockInfo.query.filter((StockInfo.user_id == user_id) & (StockInfo.stock == stock_name)).first()

    if not stock:
        return make_response(jsonify(f"You do not own any {stock_name} stock"), 404)

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
            return jsonify("User does not own any stocks")

        for stock in stocks:
            db.session.delete(stock)
            db.session.commit()
        return jsonify("Stock Information Deleted")
    else: 
        user_id = request.json["userId"]

    stock_name = request.json["stock"]
    stock = StockInfo.query.filter((StockInfo.user_id == user_id) & (StockInfo.stock == stock_name)).first_or_404(description="User does not own that stock")

    db.session.delete(stock)
    db.session.commit()
    return jsonify("Stock Information Deleted")
