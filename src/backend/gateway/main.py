# flask
import socket
from werkzeug.exceptions import HTTPException
import werkzeug
from typing import List
from dataclasses import dataclass
from sqlalchemy import desc
from sqlalchemy.dialects import postgresql
from sqlalchemy.orm import relationship
from flask_sqlalchemy import SQLAlchemy
from flask import render_template, request, flash, redirect, url_for, session, jsonify, send_from_directory, abort
from flask import Flask, Response

app = Flask(__name__)


@app.route("/")
def index():
    return "leminiskata api index page"


@app.route("/height", methods=['GET'])
def height():
    gw_to_height_socket.send("hello from gateway")
    return "leminiskata api index page"


def start_server():
    app.run(host="0.0.0.0", port=6969)
