#include "rclcpp/rclcpp.hpp"
#include "example_interfaces/msg/string.hpp"

class testRadioStation : public rclcpp::Node {
    public:
        testRadioStation() : Node("radioStation") 
        {
            publisher_ = this->create_publisher<example_interfaces::msg::String>("radioStation", 10);
            timer_ = this->create_wall_timer(std::chrono::milliseconds(500),
                                            std::bind(&testRadioStation::publishRadioStation, this));
            RCLCPP_INFO(get_logger(), "Radio Station Test Publisher has started.");
            
        }

    private:
        void publishRadioStation()
        {
            auto msg = example_interfaces::msg::String();
            msg.data = 1;
            publisher_->publish(msg);
        }
        rclcpp::Publisher<example_interfaces::msg::String>::SharedPtr publisher_;
        rclcpp::TimerBase::SharedPtr timer_;
};

int main(int argc, char **argv)
{
    rclcpp::init(argc, argv);
    auto node = std::make_shared<testRadioStation>(); // MODIFY NAME
    rclcpp::spin(node);
    rclcpp::shutdown();
    return 0;
}