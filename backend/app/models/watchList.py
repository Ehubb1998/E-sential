from .db import db

class WatchList(db.Model):
    __tablename__ = "watchLists"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    stock = db.Column(db.String(100))

    user = db.relationship("User")

    # def watch_list(self):
    #     return {
    #         "id": self.id,
    #         "userId": self.user_id,
    #         "stock": self.stock,
    #     }
    def watch_list(self):
        return self.stock
