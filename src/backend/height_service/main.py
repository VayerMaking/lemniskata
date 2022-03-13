import json
import socketserver
from http.server import BaseHTTPRequestHandler
from PIL import Image
import requests
from io import BytesIO

from topo import *

def b():
    with open('harry_json.json', 'r') as f:
        return f.read()

def api_url(x, y, z):
        return f'https://trek.nasa.gov/tiles/Mars/EQ/Mars_MOLA_blend200ppx_HRSC_ClrShade_clon0dd_200mpp_lzw/1.0.0//default/default028mm/{z}/{y}/{x}.jpg'


def multistep(bd):
    urls_to_imgs = {}
    for j in json.loads(bd): # FIXME: load?
        url = api_url(j['x'], j['y'], j['z'])
        print(url)
        urls_to_imgs[url] = Image.open(BytesIO(requests.get(url).content))
        urls_to_imgs[url].show()
    topo_evaluator = TopoEvaluator(list(urls_to_imgs.values()))
    total = topo_evaluator.eval()
    return total


class TopoService(BaseHTTPRequestHandler):

    def __api_url(x, y, z):
        return f'https://trek.nasa.gov/tiles/Mars/EQ/Mars_MOLA_blend200ppx_HRSC_ClrShade_clon0dd_200mpp_lzw/1.0.0//default/default028mm/{z}/{y}/{x}.jpg'

    def __set_headers(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()


    def __body(self):
        return self.rfile.read(int(self.headers['Content-Length']))


    def do_POST(self):
        if self.path != '/generate/map/height':
            return
        self.__set_headers()
        multistep(self.__body())
        # FIXME: self.wfile.write(list(urls_to_imgs.keys()).encode("utf-8"))


if __name__ == "__main__":
    httpd = socketserver.TCPServer(("height_service", 6972), TopoService)
    httpd.serve_forever()
