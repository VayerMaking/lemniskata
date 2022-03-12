import json
import socketserver
from http.server import BaseHTTPRequestHandler
from PIL import Image
import requests
from io import BytesIO


# TODO import height map algorithm here

class MyHandler(BaseHTTPRequestHandler):
    def _set_headers(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()

    def do_POST(self):
        self._set_headers()

        if self.path == '/generate/map/height':
            content_length = int(self.headers['Content-Length'])
            body = self.rfile.read(content_length)
            url = json.loads(body)['url']
            img_res = requests.get(url)
            img = Image.open(BytesIO(img_res.content))
            # TODO call algorithm
            self.wfile.write(body)


httpd = socketserver.TCPServer(("height_service", 6972), MyHandler)
httpd.serve_forever()
