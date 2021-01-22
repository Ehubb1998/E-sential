from werkzeug.security import generate_password_hash
from app.models import db, Plan

# Adds a demo user, you can add other users here if you want


def seed_plans():

    demo_plan1 = Plan(user_id="1", name="Apple Stock", job="Dominoes", monthlyIncome="1000", stock="AAPL", amountToSave="80", targetAmountToInvest="600")
    demo_plan2 = Plan(user_id="1", name="Amazon Stock", job="Dominoes", monthlyIncome="1000", stock="AAPL", amountToSave="80", targetAmountToInvest="600")

    db.session.add(demo_plan1)
    db.session.add(demo_plan2)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_plans():
    db.session.execute('TRUNCATE plans;')
    db.session.commit()
