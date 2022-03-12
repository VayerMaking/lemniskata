from flask import Flask, request

from src.backend.evals.weather import WeatherEvaluater

app = Flask(__name__)


@app.route("/")
def index():
    return "lemniskata api index page"


@app.route("/api/weather", methods=["GET"])
def fetch_weather_data() -> str:
    longitude = request.args.get('longitude')
    latitude = request.args.get('latitude')
    day: int = int(request.args.get('day'))

    return weather.check_weather(longitude, latitude, day)


if __name__ == "__main__":
    weather = WeatherEvaluater()
    app.run(host="0.0.0.0", port=80)
