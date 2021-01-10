from .db import db


class BankInfo(db.Model):
    __tablename__ = "bankInfos"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    accountBalance = db.Column(db.Integer, nullable=False)
    monthlyIncome = db.Column(db.Integer, nullable=False)

    user = db.relationship("User")


    @property
    def balance(self):
        return self.accountBalance
    

    @balance.setter
    def balance(self, number):
        self.accountBalance = number
    
    @property
    def income(self):
        return self.monthlyIncome

    @income.setter
    def income(self, number):
        self.monthlyIncome = number


    def bank_info(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "accountBalance": self.accountBalance,
            "monthlyIncome": self.monthlyIncome,
        }
