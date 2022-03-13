import json
import socketserver
from http.server import BaseHTTPRequestHandler
from PIL import Image
import requests
from io import BytesIO
import numpy as np

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
    response_short = {}
    i = 0
    # Iterate over tiles
    for tile_id, ss_res in results.items():
        pm, gb = tuple(ss_res)
        pm_response = []
        gb_response = []
        i += 1
        # Iterate over prob maps of clusters in a single tile
        for cluster, points in pm.items():
            for coords3d, p in points.items():
                x,y,z = coords3d
                pm_response.append({'x':x,'y':y,'z':z,'p':float(p)})
        response[tile_id] = pm_response
        # Iterate over geo borders in a single tile
        for cluster_id, boundary_points in gb.items():
            for bp in boundary_points:
                x, y, z = tuple(bp)
                x += cluster_id % 3 * 256 - 256 - 128
                y += cluster_id / 3 * 256 - 256 - 128
                gb_response.append({'x':x,'y':y,'z':z,'p':float(pm[cluster_id][bp])})
        response_short[tile_id] = gb_response
        # print(f"tile_id = {tile_id}")
        # def np_encoder(object):
        #     if isinstance(object, np.generic):
        #         return object.item()
        # with open(f'{tile_id}.json', 'w') as fp:
        #     json.dump(response_short, fp, default=np_encoder)
    return response_short


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
        res = multistep(self.__body())
        self.wfile.write(bytes(str(res).encode('utf-8')))


if __name__ == "__main__":
    httpd = socketserver.TCPServer(("height_service", 6972), TopoService)