import json
import socketserver
from http.server import BaseHTTPRequestHandler


def some_function():
    print("some_function got called")


class MyHandler(BaseHTTPRequestHandler):
    def _set_headers(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()

    def do_GET(self):
        self._set_headers()
        if self.path == '/asdf':
            # some_function()
            self.wfile.write(
                bytes(json.dumps({'hello': 'world', 'received': 'ok'}), 'utf-8'))


httpd = socketserver.TCPServer(("test_service", 8080), MyHandler)
httpd.serve_forever()
