from flask import Blueprint, jsonify, session, request, make_response
from app.models import db, WatchList
from .check_for_token import check_for_token

watchList_routes = Blueprint("watchList", __name__)

@watchList_routes.route("/", methods=["POST"])
@check_for_token
def create_watchList():
    user_id = request.json["userId"]
    stock = request.json["stockName"]

    watchLists = WatchList.query.filter((WatchList.user_id == user_id) & (WatchList.stock == stock)).first()
    if (watchLists):
        return make_response(jsonify("Stock already in watch list"), 404)
    
    new_watchList = WatchList(
        user_id=user_id,
        stock=stock
    )
    
    db.session.add(new_watchList)
    db.session.commit()
    return jsonify({"NewWatchListInfo": new_watchList.watch_list()})


@watchList_routes.route("/list/<id>/<token>")
@check_for_token
def watchList_info(*args, **kwargs):
    id = kwargs["id"]

    watchLists = WatchList.query.filter(WatchList.user_id == id).all()

    if not watchLists:
        return make_response(jsonify("You do not have any stocks in your Watch List"), 404)

    info = [watchList.watch_list() for watchList in watchLists]
    return jsonify({"WatchList": info})


@watchList_routes.route("/", methods=["DELETE"])
@check_for_token
def delete_watchList():
    # if user != "" and amount != "":
    #     user_id = user
    #     watchLists = WatchList.query.filter(WatchList.user_id == user_id).all()

    #     if not watchLists:
    #         return make_response(jsonify("You do not have any stocks in your Watch List"), 404)

    #     for watchList in watchLists:
    #         db.session.delete(watchList)
    #         db.session.commit()
    #     return jsonify("Watch List Deleted")
    # else:
    user_id = request.json["userId"]
    stock = request.json["stockName"]

    watchList = WatchList.query.filter((WatchList.user_id == user_id) & (WatchList.stock == stock)).first_or_404(description="You do not have this stock")
    db.session.delete(watchList)
    db.session.commit()

    return jsonify("Successfully Deleted ")
