import socket
import time
HOST = 'test_gateway'
PORT = 2001

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect((HOST, PORT))

while True:
    s.send(b'Hello, world. IPC success!')
