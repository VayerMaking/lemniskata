from http import server
from multiprocessing import Process  # for threading
import os
import socket
from main import start_server

gw_to_height_address = 'height_service'
gw_to_weather_address = 'weather_service'
gw_to_height_port = 2003
gw_to_weather_port = 2004


def server_init():
    start_server()


def socket_init(addr, port):
    new_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    new_socket.bind((gw_to_height_address, gw_to_height_port))

    new_socket.listen()
    conn = new_socket.accept()

    # while True:
    print(conn.recv(1024))


if __name__ == '__main__':
    p1 = Process(target=server_init)
    p1.start()
    p2 = Process(target=socket_init(
        gw_to_height_address, gw_to_height_address))
    p2.start()
    p3 = Process(target=socket_init(
        gw_to_weather_address, gw_to_weather_address))
    p3.start()
