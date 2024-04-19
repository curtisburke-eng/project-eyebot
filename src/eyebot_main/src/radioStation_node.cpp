#include "rclcpp/rclcpp.hpp"
#include "example_interfaces/msg/string.hpp"

class radioStationNode : public rclcpp::Node
{
public:
    radioStationNode() : Node("radioStation")
    {
        subscriber_ = this->create_subscription<example_interfaces::msg::String>(
            "radioStation", 10,
            std::bind(&radioStationNode::callbackRadioStation, this, std::placeholders::_1));
            RCLCPP_INFO(get_logger(), "radioStation node started");
            
    }

private:
    void callbackRadioStation(const example_interfaces::msg::String::SharedPtr msg)
    {
        RCLCPP_INFO(this->get_logger(), "%s", msg->data.c_str());
    }
    rclcpp::Subscription<example_interfaces::msg::String>::SharedPtr subscriber_;
};

int main(int argc, char **argv)
{
    rclcpp::init(argc, argv);
    auto node = std::make_shared<radioStationNode>();
    rclcpp::spin(node);
    rclcpp::shutdown();
    return 0;
}