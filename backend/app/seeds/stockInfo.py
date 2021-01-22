from werkzeug.security import generate_password_hash
from app.models import db, StockInfo

# Adds a demo user, you can add other users here if you want


def seed_stockInfo():

    demo_stocksInfo1 = StockInfo(user_id="1", stock="aapl", shares="7", pps="134")
    demo_stocksInfo2 = StockInfo(user_id="1", stock="nflx", shares="10", pps="521")
    demo_stocksInfo3 = StockInfo(user_id="1", stock="amzn", shares="3", pps="3220")

    db.session.add(demo_stocksInfo1)
    db.session.add(demo_stocksInfo2)
    db.session.add(demo_stocksInfo3)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_stockInfo():
    db.session.execute('TRUNCATE stockInfos;')
    db.session.commit()
