module.exports = { listen, sendBtSwToLine }
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

function listen() {
	server.on("error", function (err) {
		console.log("server error:\n" + err.stack);
		server.close()
	})

	server.on("message", (msg, rinfo) => {
		console.log("server got: " + msg + " from " + rinfo.address + ":" + rinfo.port);
		store.moi = msg.toString()
		store.nbip = rinfo.address
		store.nbport = rinfo.port
		io.sockets.emit('nb', store.moi)
		console.log(msg)
		axios.post("http://localhost:5004/api/addData", { data: store.moi })

		var ack = new Buffer("0")
		server.send(ack, 0, ack.length, rinfo.port, rinfo.address, function (err, bytes) {
			console.log("sent ACK.")
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

function sendBtSwToLine(sw) {
	let ack0 = new Buffer("0")
	let ack1 = new Buffer("1")

	if (sw == false) {
		server.send(ack0, 0, ack0.length, store.nbport , store.nbip, function (err, bytes) {
			console.log("sent SW = 0.")
		})
	}
	else server.send(ack1, 0, ack1.length, store.nbport, store.nbip, function (err, bytes) {
		console.log("sent SW = 1.")
	})
}