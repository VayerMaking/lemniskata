import unittest
import names


class SubsystemTest(unittest.TestCase):

    def test_subsystem_connections(self):
        sss = []
        for i in range(10):
            sss.append(Subsystem(names.get_first_name(), ("localhost", 420 + i)))
        for i in range(0, 10, 2):
            sss[i].connect_to(sss[i + 1])
            self.assertTrue(sss[i + 1].identifier in [s.identifier for s in sss[i].sockets])
        for i in range(0, 10, 2):
            sss[i].disconnect_from(sss[i + 1].identifier)
            self.assertTrue(sss[i + 1].identifier not in [s.identifier for s in sss[i].sockets])


if __name__ == "__main__":
    unittest.main()
