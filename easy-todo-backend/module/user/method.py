from ..common import db
from .model import User
from hashlib import sha256

def isUserExist(username:str):
    user = User.query.filter_by(username=username).first()
    if user is None:
        return False
    return True

def checkPassword(username:str, password:str):
    passwordSha256 = sha256(password.encode("utf-8")).hexdigest()
    user = User.query.filter_by(username=username, password=passwordSha256).first()
    if user is None:
        return False
    return True

def addUser(username:str, password:str, email:str=None):
    if isUserExist(username):
        return 0

    passwordSha256 = sha256(password.encode("utf-8")).hexdigest()
    user = User(username=username, password=passwordSha256, email=email)
    db.session.add(user)
    db.session.commit()
    return user.id