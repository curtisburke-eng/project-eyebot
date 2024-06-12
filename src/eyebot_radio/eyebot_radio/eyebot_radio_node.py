#!/usr/bin python3
# import rclpy
# from rclpy.node import Node
import pyaudio
import wave
import time


# class eyebotRadioNode(Node):
#     # Define a consructor
#     def __init__(self):
#         super().__init__("eyebot_radio_node")
#         self.get_logger().info("Hello from ROS2")

# Main function
def main():

    # rclpy.init()
    # node = eyebotRadioNode()

    # rclpy.spin(node)
    # rclpy.shutdown()



    paused = False    # global to track if the audio is paused


    # you audio here
    wf = wave.open('../../../audio/GNRhello.wav', 'rb')

    # instantiate PyAudio
    p = pyaudio.PyAudio()

    # define callback
    def callback(in_data, frame_count, time_info, status):
        data = wf.readframes(frame_count)
        return (data, pyaudio.paContinue)

    # open stream using callback
    stream = p.open(format=p.get_format_from_width(wf.getsampwidth()), channels=wf.getnchannels(), rate=wf.getframerate(), output=True, stream_callback=callback)

    # start the stream
    stream.start_stream()

    # stop stream
    stream.stop_stream()
    stream.close()
    wf.close()

    # close PyAudio
    p.terminate()


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        pass
