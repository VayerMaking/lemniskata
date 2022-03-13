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
    images = {}
    tiles = []
    urls = []
    for j in json.loads(bd): # FIXME: load?
        url = api_url(j['x'], j['y'], j['z'])
        urls.append(url)
        tile_id = f"Tile-{j['x']}-{j['y']}-{j['z']}"
        tiles.append(tile_id)
        images[tile_id] = Image.open(BytesIO(requests.get(url).content))
    topo_evaluator = TopoEvaluator(images)
    results = topo_evaluator.eval()

    response = {}
    i = 0
    # Iterate over tiles
    for tile_name, ss_res in results.items():
        pm, _ = tuple(ss_res)
        pm_response = []
        i += 1
        # Iterate over prob maps of clusters in a single tile
        for cluster, points in pm.items():
            for coords3d, p in points.items():
                x,y,z = coords3d
                pm_response.append({'x':x,'y':y,'z':z,'p':p})
        response[tile_name] = pm_response
        with open(f'{tile_id}.json', 'w') as fp:
            json.dump(response, fp)
    return urls


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
        urls = multistep(self.__body())
        self.wfile.write(bytes(str(urls).encode('utf-8')))


if __name__ == "__main__":
    httpd = socketserver.TCPServer(("height_service", 6972), TopoService)
    httpd.serve_forever()
