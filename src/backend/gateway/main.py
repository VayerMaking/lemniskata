from flask import Flask, jsonify, make_response, request
import requests


app = Flask(__name__)


@app.route("/")
def index():
    return "lemniskata api index page"


@app.route("/getHeightMap")
def getMaps():
    # TODO read coordinates from json body, dl image for coordinates and pass it to service
    response = requests.post(
        'http://height_service:6971/generate/map/height', json=request.get_json())
    return response.json()


@app.route("/getWeatherMap")
def getMaps():
    # TODO read coordinates from json body, dl image for coordinates and pass it to service
    response = requests.post(
        'http://weather_service:6971/generate/map/weather', json=request.get_json())
    return response.json()


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=6970)

