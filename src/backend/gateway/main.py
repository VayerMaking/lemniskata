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

app = Flask(__name__)


@app.route("/")
def index():
    return "leminiskata api index page"


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80)
