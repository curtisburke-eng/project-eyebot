#include <memory>

#include "rclcpp/rclcpp.hpp"
#include "std_msgs/msg/int8.hpp"
using std::placeholders::_1;

// const std_msgs::msg::int8 & stationNumber_;
// 
// void checkNewStation(const std_msgs::msg::int8 & stationNumber) {
//     if (stationNumber_ != stationNumber){
//         cout << "new station" << endl;
//     }
//     stationNumber_ = stationNumber;
// }


class radioStationSub : public rclcpp::Node {
    public:
        radioStationSub() : Node("radioStationSub") {
            subscription_ = this->create_subscription<std_msgs::msg::int8>("eyebot_radioStation", 10, std::bind(&radioStationSub::topic_callback, this, _1));
        }

    private:
        void topic_callback(const std_msgs::msg::int8 & msg) const {
            RCLCPP_INFO(this->get_logger(), "Radio Station Recieved: %s", msg.data.c_str());
            // checkNewStation(msg.data.c_str());
        }
        rclcpp::Subscription<std_msgs::msg::int8>::SharedPtr subscription_;
};

int main(int argc, char * argv[]) {
  
  rclcpp::init(argc, argv);
  rclcpp::spin(std::make_shared<radioStationSub>());
  rclcpp::shutdown();
  
  return 0;
}