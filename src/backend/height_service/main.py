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
            json_array = json.loads(body)
            urls_array = []
            for point in json_array:
                x_coordinate = point['x']
                y_coordinate = point['y']
                z_coordinate = point['z']
                url = f'https://trek.nasa.gov/tiles/Mars/EQ/Mars_MOLA_blend200ppx_HRSC_ClrShade_clon0dd_200mpp_lzw/1.0.0//default/default028mm/{z_coordinate}/{y_coordinate}/{x_coordinate}.jpg'
                urls_array.append(url)
                img_res = requests.get(url)
                img = Image.open(BytesIO(img_res.content))
                # TODO call algorithm

            self.wfile.write(bytearray(urls_array))


httpd = socketserver.TCPServer(("height_service", 6972), MyHandler)
httpd.serve_forever()
