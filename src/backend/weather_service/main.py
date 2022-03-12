import json
import socketserver
from http.server import BaseHTTPRequestHandler

from src.backend.evals.weather import WeatherEvaluater


def weather_eval(longitude, latitude, day):
    weather = WeatherEvaluater()
    return weather.check_weather(longitude, latitude, day)


class MyHandler(BaseHTTPRequestHandler):
    def _set_headers(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()

    def do_POST(self):
        self._set_headers()

        if self.path == '/generate/map/weather':
            content_length = int(self.headers['Content-Length'])
            body = self.rfile.read(content_length)
            weather_eval(json.loads(body)['longitude'], json.loads(body)['latitude'],
                         0 if json.loads(body)['day'] is None else int(json.loads(body)['day']))
            self.wfile.write(body)


httpd = socketserver.TCPServer(("weather_service", 6971), MyHandler)
httpd.serve_forever()

# @app.route("/api/weather", methods=["GET"])
# def fetch_weather_data():
# longitude = request.args.get('longitude')
# latitude = request.args.get('latitude')
# day = 0 if request.args.get('day') is None else int(request.args.get('day'))

# return weather.check_weather(longitude, latitude, day)
