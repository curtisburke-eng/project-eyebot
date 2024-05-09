#!/usr/bin python3
import rclpy
from rclpy.node import Node

class eyebotRadioNode(Node):
    # Define a consructor
    def __init__(self):
        super().__init__("eyebot_radio_node")
        self.get_logger().info("Hello from ROS2")

# Main function
def main():

    rclpy.init()
    node = eyebotRadioNode()

    rclpy.spin(node)
    rclpy.shutdown()

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        pass
