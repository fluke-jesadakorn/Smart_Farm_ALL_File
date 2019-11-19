module.exports = { listen }
require('dotenv').config()
const config = require('../01_backend_config')
const express = require('express')
const store = require('./store')
const dgram = require("dgram")
const server = dgram.createSocket("udp4")
const socketIO = require('socket.io')
const bodyParser = require('body-parser')
const sc = express()
const port = config.SOCKET_PORT
const axios = require('axios')

sc.use(bodyParser.json())
sc.use(bodyParser.urlencoded({
	extended: true
}))
const app = sc.listen(port, function (err, result) {
	console.log('SocketIO API Start On http://localhost:' + port)
})

const io = socketIO.listen(app);
function LineSw(data) {
	let state = { moi: [], nbip, nbport };
	switch (data.type) {
		case "setMoi": state.moi = data.payload
		case "setNbip": state.nbip = data.payload
		case "nbPort": state.nbport = data.payload
		case "getData ": return state.moi
	}
}

function listen() {
	server.on("error", function (err) {
		console.log("server error:\n" + err.stack);
		server.close()
	})

	server.on("message", (msg, rinfo) => {
		console.log("server got: " + msg + " from " + rinfo.address + ":" + rinfo.port);
		LineSw({
			type:"setMoi",
			payload:msg.toString()
		})
		LineSw({
			type:"setNbip",
			payload : rinfo.address
		})
		LineSw({
			type:"nbPort",
			payload : rinfo.port
		})
		io.sockets.emit('nb', store.moi)
		console.log(store.moi)
		axios.post("http://localhost:5004/api/addData", { data: store.moi })

		var ack = new Buffer(getLineSw())
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
		port: config.NB_PORT,
		exclusive: true
	});
}