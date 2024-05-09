#include <chrono>
#include <functional>
#include <memory>
#include <string>

#include "rclcpp/rclcpp.hpp"
#include "std_msgs/msg/Int8.hpp"

using namespace std::chrono_literals;

// TODO: Create a custom msg type eyebot_radio with members of enable and stationNum and volume? 


class radioStationPub : public rclcpp::Node {

    public:
        radioStationPub() : Node("radioStationPub"), count_(0) {
            publisher_ = this->create_publisher<std_msgs::msg::Int8>("eyebot_radioStation", 10);
            timer_ = this->create_wall_timer(500ms, std::bind(&radioStationPub::callback, this));
        }

    private:
        void callback() {
            auto message = std_msgs::msg::Int8();
            
            if(count_ % 10 == 0) {
                message.data = 2;                                                                               // THIS is the radio station number 
            } else {
                message.data = 1;                                                                               // THIS is the radio station number 
            }
            count_++;

            RCLCPP_INFO(this->get_logger(), "Publishing Radio Station: %s", message.data.c_str());
            publisher_->publish(message);
        }

        rclcpp::TimerBase::SharedPtr timer_;
        rclcpp::Publisher<std_msgs::msg::Int8>::SharedPtr publisher_;
        size_t count_;
};

int main(int argc, char * argv[]) {
  
  rclcpp::init(argc, argv);
  
  rclcpp::spin(std::make_shared<radioStationPub>());
  rclcpp::shutdown();
  
  return 0;
}