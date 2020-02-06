const dgram = require("dgram");
const server = dgram.createSocket("udp4");
const NbIoTPort = 5003;
const axios = require('axios');

let stateNBiot = {
	ip:null,
	port:null
}

var NBIoT = {
	NbIP: null,
	NBPort: null,
	NBMsg: null,
}

server.on("error", (err) => {
	console.log("server error:\n" + err.name + err.message + err.stack);
	//server.close()
})

server.on("close", (err) => {
	console.log("server close:\n" + err.stack);
	//server.close()
})

server.on("message", async (msg, rinfo) => {
	console.log("server got: " + msg + " from " + rinfo.address + ":" + rinfo.port);

	NBIoT.NbIP = rinfo.address;
	NBIoT.NBPort = rinfo.port;
	NBIoT.NBMsg = msg.toString();

	var ack = new Buffer("1")
	server.send(ack, 0, ack.length, rinfo.port, rinfo.address, function (err, bytes) {
		console.log("sent ACK. 0 ")
	})
})

server.on("listening", function () {
	var address = server.address()
	console.log("NB Iot API Start On : " + address.address + ":" + address.port)
})

server.bind({
	address: '0.0.0.0',
	port: NbIoTPort,
	exclusive: true
});

const waterOnOff = (OnOff) => {
	var ack2 = new Buffer(OnOff.toString())
	if(NBIoT.NbIP !== null){
		server.send(ack2, 0, ack2.length, NBIoT.NBPort, NBIoT.NbIP, function (err, bytes) {
			console.log("sent ACK. 0 ")
		})
	}else{
		console.log('PleaseWait')
	}
}
const getLastData = () => {
	return NBIoT.NBMsg.toString();
}

module.exports = {waterOnOff, getLastData}