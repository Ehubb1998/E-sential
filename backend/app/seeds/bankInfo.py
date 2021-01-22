from werkzeug.security import generate_password_hash
from app.models import db, BankInfo

# Adds a demo user, you can add other users here if you want


def seed_bank_info():

    demo_bankInfo = BankInfo(user_id="1", accountBalance="2400", monthlyIncome="2500")

    db.session.add(demo_bankInfo)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_bank_info():
    db.session.execute('TRUNCATE bankInfos;')
    db.session.commit()
