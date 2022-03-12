from flask import Flask, jsonify, make_response
import requests


app = Flask(__name__)


@app.route("/")
def index():
    return "lemniskata api index page"


@app.route("/qwerty")
def qwerty():
    response = requests.get('http://test_service:8080/asdf')
    return response.json()


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=6970)

