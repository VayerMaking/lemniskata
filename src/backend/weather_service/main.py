import json
import socketserver
from http.server import BaseHTTPRequestHandler

from weather import WeatherEvaluater


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

            result = dict()
            for value in json.loads(body):
                longitude = value['x']
                latitude = value['y']
                try:
                    day = value[2]
                except KeyError:
                    day = 0
                result["{}:{}".format(longitude, latitude)] = weather_eval(longitude, latitude, day)

            self.wfile.write(bytes(str(result).encode('utf-8')))


httpd = socketserver.TCPServer(("weather_service", 6971), MyHandler)
httpd.serve_forever()
