//
//
//
//
// 

// Create ros object to communicate over your Rosbridge connection
const ros = new ROSLIB.Ros({ url: "ws://10.0.0.121:9090" });

// When the Rosbridge server connects, fill the span with id "status" with "successful"
ros.on("connection", () => {
    document.getElementById("status").innerHTML = "successful";
});

// When the Rosbridge server experiences an error, fill the "status" span with the returned error
ros.on("error", (error) => {
    document.getElementById("status").innerHTML = `errored out (${error})`;
});

// When the Rosbridge server shuts down, fill the "status" span with "closed"
ros.on("close", () => {
    document.getElementById("status").innerHTML = "closed";
});

// ----------------------
// Subscribing to a Topic
// ----------------------

// Like when publishing a topic, we first create a Topic object with details of the topic's name
// and message type. Note that we can call publish or subscribe on the same topic object.
var listener = new ROSLIB.Topic({
    ros : ros,
    name : 'topic',
    messageType : 'std_msgs/String'
});

// Then we add a callback to be called every time a message is published on this topic.
listener.subscribe(function(message) {
    console.log('Received message on ' + listener.name + ': ' + message.data);
    const ul = document.getElementById("messages");
    const newMessage = document.createElement("li");
    newMessage.appendChild(document.createTextNode(message.data));
    ul.appendChild(newMessage);
    // If desired, we can unsubscribe from the topic as well.
    //listener.unsubscribe();
});

// ------------------
// Publishing a Topic
// ------------------

// First, we create a Topic object with details of the topic's name and message type.
var talker = new ROSLIB.Topic({
    ros : ros,
    name : 'topic',
    messageType : 'std_msgs/String'
});

// Then we create the payload to be published. The object we pass in to ros.Message matches the
// fields defined in the geometry_msgs/Twist.msg definition.
var pub_msg = {
    data: "Sup Wurld"
};

// And finally, publish.
talker.publish(pub_msg);