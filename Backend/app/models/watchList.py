from .db import db

class WatchList(db.Model):
    __tablename__ = "watchLists"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"))
    stock = db.Column(db.String(100))

    user = db.relationship("User")

    def watch_list(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "stock": self.stock,
        }