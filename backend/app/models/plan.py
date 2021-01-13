from .db import db

class Plan(db.Model):
    __tablename__ = "plans"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    name = db.Column(db.String(100), nullable=False)
    job = db.Column(db.String(100), nullable=False)
    monthlyIncome = db.Column(db.Integer, nullable=False)
    stock = db.Column(db.String(100), nullable=False)
    amountToSave = db.Column(db.Integer, nullable=False)
    targetAmountToInvest = db.Column(db.Integer, nullable=False)

    user = db.relationship("User")

    
    def plan(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "name": self.name,
            "job": self.job,
            "monthlyIncome": self.monthlyIncome,
            "stock": self.stock,
            "amountToSave": self.amountToSave,
            "targetAmountToInvest": self.targetAmountToInvest,
        }