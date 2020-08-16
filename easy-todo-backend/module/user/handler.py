from flask import Flask, request, jsonify
from ..common import app, db, getJson
from .model import User
from .method import *

@app.route("/api/user/register", methods=["POST"])
def register():
    json = getJson()
    username = json['username']
    password = json['password']
    userId = addUser(username, password)
    if userId != 0:
        return jsonify({"status": "ok", "username": username, "user id": userId})
    else:
        return jsonify({"status": "error", "username": username, "message": username + " is exist"})

@app.route("/api/user/login", methods=["GET", "POST"])
def login():
    json = getJson()
    username = json['username']
    password = json['password']
    if checkPassword(username, password):
        return jsonify({"status": "ok", "username": username})
    else:
        return jsonify({"status": "error", "username": username, "message": "Auth failed"})

