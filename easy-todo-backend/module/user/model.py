from flask_sqlalchemy import SQLAlchemy
from ..common import db

# 用户
class User(db.Model) :
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, index=True, nullable=False)
    password = db.Column(db.String(1024), nullable=False)
    email = db.Column(db.String(128))

    def __repr__(self) :
        return '<Role %r>' % self.username