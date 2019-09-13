var dgram = require("dgram");
var server = dgram.createSocket("udp4");
var keep_msg = null;

let data = {a:""}
server.on("error", function (err) {
    console.log("server error:\n" + err.stack);
    server.close();
});


server.on("message", function (msg, rinfo) {
    console.log("Server got: " + msg + " from " + rinfo.address + ":" + rinfo.port);
    
    /*var ack = new Buffer("abc");
   			server.send(ack, 0, ack.length, rinfo.port, rinfo.address, function(err, bytes) {
      		
      		console.log("sent ACK to Client.");
    });*/
    
    if (msg >= 0 && msg < 5000){
        data.a = msg;
    }
    else if (msg == "getData"){
        server.send(data.a, 0, data.a.length, rinfo.port, rinfo.address, function(err, bytes) {
          console.log("Sent " + data.a + " To Client");
      });
    }else{
   			server.send(msg, 0, msg.length, rinfo.port, rinfo.address, function(err, bytes) {
      		console.log("Sent Data to Mobile.");
    	});
    }
})

/*server.on("message", function (msg, rinfo){
  if (msg == "getData" && this.data >= 0 && this.data < 5000){
      server.send(this.data, 0, this.data.length, rinfo.port, rinfo.address, function(err, bytes) {
        console.log("sent ACK.");
      });
    }
});*/

server.on("listening", function () {
    var address = server.address();
    console.log("server listening " + address.address + ":" + address.port);
});
server.bind({
    address: '0.0.0.0',
    port: 8080,
    exclusive: true
});