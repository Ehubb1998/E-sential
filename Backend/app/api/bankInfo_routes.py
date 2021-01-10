from flask import Blueprint, jsonify, session, request, make_response
from app.models import db, BankInfo
from .check_for_token import check_for_token

bankInfo_routes = Blueprint("bankInfo", __name__)