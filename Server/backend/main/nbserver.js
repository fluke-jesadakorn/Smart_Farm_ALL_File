module.exports = {listen}
/*var data = {
	temp : null,
	switch : false // true == on, false == off
}*/
const store = require('./store')
const dgram = require("dgram");
const server = dgram.createSocket("udp4");

function listen() {
	server.on("error", function (err) {
		console.log("server error:\n" + err.stack);
		server.close();
	});
	server.on("message", function (msg, rinfo) {
		//console.log("server got: " + msg + " from " + rinfo.address + ":" + rinfo.port);
		store.temp = msg.toString();
		var ack = new Buffer("Hello ack");
		server.send(ack, 0, ack.length, rinfo.port, rinfo.address, function(err, bytes) {
		console.log("sent ACK.");
		//console.log(store.data);
		});
	});
	server.on("listening", function () {
		var address = server.address();
		console.log("server listening " + address.address + ":" + address.port);
	});
	server.bind({
		address: '0.0.0.0',
		port: 7000,
		exclusive: true
	});
}