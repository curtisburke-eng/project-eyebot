#include <chrono>
#include <functional>
#include <memory>
#include <string>

#include "rclcpp/rclcpp.hpp"
#include "std_msgs/msg/string.hpp"

using namespace std::chrono_literals;

class radioStationPub : public rclcpp::Node {

    public:
        radioStationPub() : Node("radioStationPub"), count_(0) {
            publisher_ = this->create_publisher<std_msgs::msg::String>("eyebot_radioStation", 10);
            timer_ = this->create_wall_timer(500ms, std::bind(&radioStationPub::callback, this));
        }

    private:
        void callback() {
            auto message = std_msgs::msg::String();
            
            if(count_ % 10 == 0) {
                message.data = "2";                                                                               // THIS is the radio station number 
            } else {
                message.data = "1";                                                                               // THIS is the radio station number 
            }
            count_++;

            RCLCPP_INFO(this->get_logger(), "Publishing Radio Station: %s", message.data.c_str());
            publisher_->publish(message);
        }

        rclcpp::TimerBase::SharedPtr timer_;
        rclcpp::Publisher<std_msgs::msg::String>::SharedPtr publisher_;
        size_t count_;
};

int main(int argc, char * argv[]) {
  
  rclcpp::init(argc, argv);
  rclcpp::spin(std::make_shared<radioStationPub>());
  rclcpp::shutdown();
  
  return 0;
}