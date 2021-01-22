from werkzeug.security import generate_password_hash
from app.models import db, WatchList

# Adds a demo user, you can add other users here if you want


def seed_watchList():

    demo_watchList1 = WatchList(user_id="1", stock="aapl")
    demo_watchList2 = WatchList(user_id="1", stock="amzn")

    db.session.add(demo_watchList1)
    db.session.add(demo_watchList2)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_watchList():
    db.session.execute('TRUNCATE watchLists;')
    db.session.commit()