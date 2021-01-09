from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin




class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(100), nullable=False)
    lastName = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    primaryBank = db.Column(db.String(100), nullable=False)
    job = db.Column(db.String(100), nullable=False)
    hashedPassword = db.Column(db.String(500), nullable=False)


    @property
    def password(self):
        return self.hashedPassword
    

    @password.setter
    def password(self, password):
        self.hashedPassword = generate_password_hash(password)
    

    def check_password(self, password):
        return check_password_hash(self.password, password)


    @property
    def setEmail(self):
        return self.email


    @setEmail.setter
    def setEmail(self, email):
        self.email = email


    @property
    def setBank(self):
        return self.primaryBank


    @setBank.setter
    def setBank(self, bank):
        self.primaryBank = bank


    @property
    def setJob(self):
        return self.job


    @setJob.setter
    def setJob(self, job):
        self.job = job


    def profile_dict(self):
        return {
            "id": self.id,
            "firstName": self.firstName,
            "lastName": self.lastName,
            "email": self.email,
            "primaryBank": self.primaryBank,
            "job": self.job,
        }
