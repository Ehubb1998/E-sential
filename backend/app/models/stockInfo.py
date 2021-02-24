from .db import db


class StockInfo(db.Model):
    __tablename__ = "stockInfos"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    stock = db.Column(db.String(100))
    shares = db.Column(db.Integer)
    pps = db.Column(db.Integer)

    user = db.relationship("User")


    @property
    def numShares(self):
        return self.shares


    @numShares.setter
    def numShares(self, number):
        self.shares = number


    @property
    def pricePerShare(self):
        return self.pps


    @pricePerShare.setter
    def pricePerShare(self, number):
        self.pps = number

    
    def stock_info(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "stock": self.stock,
            "shares": self.shares,
            "pps": self.pps,
        }


    def pps_function(self):
        return self.pps


    def shares_function(self):
        return self.shares