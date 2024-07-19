# import rclpy
# from rclpy.node import Node
# from std_msgs.msg import Int16
import os
import time
from datetime import datetime

# Define global variables
SEC_PER_DAY = 86400
cmdStation = 0
currentStation = None
user = "mr-burke"

# --- Class Definitions ---------------------------------------
class Station:
    def __init__(self, id, name, filePath, length):
        self.id = id
        self.name = name
        self.filePath = filePath
        self.length = length
        self.timeFactor = length / SEC_PER_DAY

# class RadioNode(Node):
#     def __init__(self):
#         super().__init__('radio_node')
#         self.subscription = self.create_subscription(
#             Int16,
#             'radioStation',
#             self.listenerCallback,
#             10)
#         self.subscription  # prevent unused variable warning
#         global cmdStation
#         self.cmdStation = cmdStation

#     def listenerCallback(self, msg):
#         global cmdStation
#         cmdStation = msg.data

# --- Function Definitions ---------------------------------------
# Get the current time of day and convert it to a number of seconds
def getCurrentTime():       # in Seconds
    now = datetime.now()
    return now.hour * 3600 + now.minute * 60 + now.second


# Assign station info to current station class 
def getStation(cmdStation):
    
    if cmdStation == 1:
        return Station(1, "Enclave-Radio", "~/eyebot_ws/src/project-eyebot/audio/enclave/enclave.wav", 70)
    
    elif cmdStation == 2:
        return Station(2, "Galaxy-News-Radio", "~/eyebot_ws/src/project-eyebot/audio/GNR/civilization.wav", 180)
    
    elif cmdStation == 3:
        return Station(3, "Diamond-City-Radio", "/path/to/station3/file.mp3", 5400)
    
    # Default
    else:
        return Station(0, "Default Station", "/path/to/default/file.mp3", 3600)


# Play the audio file for the current station at a given timestamp
def playStation(station):
    # Get the current time of day
    currentTime = getCurrentTime()
    # Convert the time of day to the corresponding time within the station track (file)
    currentTimestamp = currentTime / station.timeFactor
    
    # for testing/debug:
    currentTimestamp = 10
    # Play the audio file
    os.system(f"play {station.filePath} trim {currentTimestamp} {station.length}")

# factor = 70 seconds / 86400 sec  = 0.0008101 ** TODO: I think the factor and current timestamps needs to be a double or float
# currentTime = 12 * 3600 + 5 * 60 + 10 = 43200 + 300+10 = 43310
# currentTimestamp = 43310 / 0.0008101 = 1.99 

# --- Main Program ---------------------------------------
def main(args=None):
    global cmdStation, currentStation

    # rclpy.init(args=args)
    # radioNode = RadioNode()

    try:
        while True:
        # while rclpy.ok():
            # Check the subscription to the radioStation topic
            # rclpy.spin_once(radioNode)

            # Use terminal input for testing
            cmdStation = int(input("Enter station number: "))

            # Compare command station (from ROS topic) to current station
            if currentStation is None or currentStation.id != cmdStation: # if a new station is requested
                # Get the info for the new current station
                currentStation = getStation(cmdStation)
                
                # Stop current audio output
                os.system("killall play")
                time.sleep(1)

                # Play the audio on the new current station
                playStation(currentStation)
                time.sleep(1)  # Add a short delay to avoid rapid re-triggering

    except KeyboardInterrupt:
        pass

    finally:
        rclpy.shutdown()

if __name__ == '__main__':
    main()
