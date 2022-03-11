import socket
import time
HOST = 'test_gateway'
PORT = 2001

print("Server start at: %s/:%s" % (HOST, PORT))
print("Waiting for connection...")

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind((HOST, PORT))
s.listen()
conn, addr = s.accept()
print('Connected by', addr)

while True:
    data = conn.recv(1024)
    if not data:
        break
    print(f'Received from: {addr} :', data)
