# flask
from flask import Flask, Response
from flask import render_template, request, flash, redirect, url_for, session, jsonify, send_from_directory, abort
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from sqlalchemy.dialects import postgresql
from sqlalchemy import desc
from dataclasses import dataclass
from typing import List
import werkzeug
from werkzeug.exceptions import HTTPException

# socket connection
from src.backend.main.subsystem import Subsystem


# socket connections setup
gw_to_height_address = 'height_service'
gw_to_weather_address = 'weather_service'
gw_to_height_port = '2003'
gw_to_weather_port = '2004'

gw_to_height_socket = Subsystem(gw_to_height_address, gw_to_height_port)
gw_to_weather_socket = Subsystem(gw_to_weather_address, gw_to_height_port)

gw_to_height_socket.connect_to(gw_to_height_address, gw_to_height_port)
gw_to_weather_socket.connect_to(gw_to_weather_address, gw_to_weather_port)


app = Flask(__name__)


@app.route("/")
def index():
    return "leminiskata api index page"


@app.route("/height", methods=['GET'])
def height():
    gw_to_height_socket.send("hello from gateway")
    return "leminiskata api index page"


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=6969)
