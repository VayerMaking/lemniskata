from flask import Flask, jsonify, make_response, request
from flask_cors import CORS
import requests


app = Flask(__name__)
CORS(app)


@app.route("/")
def index():
    return "lemniskata api index page"


@app.route("/nasa/api/weather")
def weatherApi():
    response = requests.get(
        'http://weather_api:60', json=request.get_json())
    return response.json()


@app.route("/getHeightMap", methods=['POST'])
def getHeightMap():
    # TODO read coordinates from json body, dl image for coordinates and pass it to service
    response = requests.post(
        'http://height_service:6972/generate/map/height', json=request.get_json())
    return response.json()


@app.route("/getWeatherMap", methods=['POST'])
def getWeatherMap():
    # TODO read coordinates from json body, dl image for coordinates and pass it to service
    response = requests.post(
        'http://weather_service:6971/generate/map/weather', json=request.get_json())
    return response.json()


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=6969)
