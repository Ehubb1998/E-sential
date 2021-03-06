import os

class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL")
    IEX_KEY = os.environ.get("IEX_KEY")
    IEX_TEST_KEY = os.environ.get("IEX_TEST_KEY")
