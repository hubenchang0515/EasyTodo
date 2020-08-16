#! /usr/bin/env python3
import os
from flask import Flask, redirect
from module.common import init
from module.user.model import User
import module.user.handler

if __name__ == "__main__":
    sql_url = "sqlite:///" + os.path.join(os.path.abspath(os.path.dirname(__file__)), "database.sqlite")
    app = init(sql_url)

    # 找不到的URL让前端进行路由
    @app.errorhandler(404)
    def index(e):
        return app.send_static_file('index.html')

    app.run(host="0.0.0.0", port=80, debug=True)

