cmake_minimum_required(VERSION 3.0.2)
project(testPackage)


find_package(catkin REQUIRED COMPONENTS
  roscpp
  std_msgs
)


catkin_package()

include_directories(

  ${catkin_INCLUDE_DIRS}
)

add_executable(talker_node src/talker.cpp)
target_link_libraries(talker_node ${catkin_LIBRARIES}) 
