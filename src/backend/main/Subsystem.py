import socket


class Subsystem:

    def __init__(self, identifier, ip_and_port, num_sockets=1):
        self.identifier = identifier
        self.ip_and_port = ip_and_port
        self.sockets = {}

    def connect_to(self, ss, conn_args=(socket.AF_INET, socket.SOCK_DGRAM)):
        s = socket.socket(*conn_args)
        s.connect(ss.ip_and_port)
        self.sockets[ss.identifier] = s
        print(
            f"{self.identifier} ({self.ip_and_port}) connected to {ss.identifier} ({ss.ip_and_port}) using '{s.getsockname()[0]}'")

    def disconnect_from(self, ss_identifier):
        s = self.sockets[ss_identifier]
        print(
            f"{self.identifier} ({self.ip_and_port}) disconnected from {ss_identifier}")
        s.close()
        del self.sockets[ss_identifier]
