# project-eyebot
## Currently in Development: 
Three ROS2 packages intended for use as a full system. 

### eyebot-main
A 3D printed eyebot housing controled via RaspberryPi suspended from a ceiling-mounted track. 
Features:
- Two ROS2 nodes: one for motion control, one for radio station tuning (using in-game audio files)
- One servo motor interfaced to a slew gear to rotate the body along the vertical axis.
- One servo motor interfaced to a rack and pinion track system to move the bot along the predefined path.

### eyebot-endStop
An ESP32 board and limit switch which, on activation, informs the bot of its impending collision with the hardstop. 

### eyebot-controlPanel
An ESP32 board with multiple mapped buttons. The buttons comunicate on topics to toggle motion, change the radio station, etc.
