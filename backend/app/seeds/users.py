from werkzeug.security import generate_password_hash
from app.models import db, User

# Adds a demo user, you can add other users here if you want


def seed_users():

    demo = User(firstName="Elijah", lastName="Hubbard", email='demo@demo.com', primaryBank="Bank Of America", job="Disney +",
                password="pbkdf2:sha256:150000$z5zPxLd4$7f44d32ca52b1008d58ba40ed68ffab2bcce0773a25f037d2d0c3214bba69244")

    db.session.add(demo)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_users():
    db.session.execute('TRUNCATE users;')
    db.session.commit()
