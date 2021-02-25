import os
from flask import Flask, request, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import generate_csrf

from .models import db
from .api.auth_routes import auth_routes
from .api.bankInfo_routes import bankInfo_routes
from .api.plan_routes import plan_routes
from .api.stockInfo_routes import stockInfo_routes
from .api.user_routes import user_routes
from .api.watchList_routes import watchList_routes
from .api.watchList_routes2 import watchList_routes2

from .seeds import seed_commands 
from .config import Config

app = Flask(__name__)

app.cli.add_command(seed_commands)
app.config.from_object(Config)
app.register_blueprint(auth_routes, url_prefix="/api/auth")
app.register_blueprint(bankInfo_routes, url_prefix="/api/bank_info")
app.register_blueprint(plan_routes, url_prefix="/api/plan")
app.register_blueprint(stockInfo_routes, url_prefix="/api/stock_info")
app.register_blueprint(user_routes, url_prefix="/api/user")
app.register_blueprint(watchList_routes, url_prefix="/api/watch_list")
app.register_blueprint(watchList_routes2, url_prefix="/info/api/watch_list")

db.init_app(app)
Migrate(app, db)
CORS(app)


@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie('csrf_token',
                        generate_csrf(),
                        secure=True if os.environ.get(
                            'FLASK_ENV') == 'production' else False,
                        samesite='Strict' if os.environ.get(
                            'FLASK_ENV') == 'production' else None,
                        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    print("path", path)
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')
