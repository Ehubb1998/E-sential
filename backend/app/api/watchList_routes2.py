from flask import Blueprint, jsonify, session, request, make_response
from app.models import db, WatchList
from .check_for_token import check_for_token

watchList_routes2 = Blueprint("watchList2", __name__)


@watchList_routes2.route("/", methods=["POST"])
@check_for_token
def create_watchList():
    user_id = request.json["userId"]
    stock = request.json["stockName"]

    watchLists = WatchList.query.filter(
        (WatchList.user_id == user_id) & (WatchList.stock == stock)).first()
    if (watchLists):
        return make_response(jsonify("Stock already in watch list"), 404)

    new_watchList = WatchList(
        user_id=user_id,
        stock=stock
    )

    db.session.add(new_watchList)
    db.session.commit()
    return jsonify({"NewWatchListInfo": new_watchList.watch_list()})
