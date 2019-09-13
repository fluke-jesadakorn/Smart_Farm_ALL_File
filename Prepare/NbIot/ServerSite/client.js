var PORT = 8080;
var HOST = '52.221.184.203';
var dgram = require('dgram');
var message = null;
var client = dgram.createSocket('udp4');

client.on('listening', function () {
	var address = client.address();
	console.log('UDP Server listening on ' + address.address + ":" + 
	address.port);
});

client.on('message', function (message, remote) {
	console.log("got message from server ==> ",remote.address + ':' + 
	remote.port +' - ' + message);
});

function sendMessage(message) {
    if (message) {
    client.send(message, 0, message.length, PORT, HOST, function (err, 
    bytes) {
        if (err) throw err;
        console.log('UDP message sent to ' + HOST + ':' + PORT);
       // client.close();
       });
   }
}