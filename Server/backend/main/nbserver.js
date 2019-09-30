module.exports = {listen}
var express = require('express') 
var store = require('./store')
var dgram = require("dgram")
var server = dgram.createSocket("udp4")
var socketIO = require ('socket.io')
var bodyParser =require('body-parser')
var sc = express()
var port = 3003;

sc.use(bodyParser.json())
sc.use(bodyParser.urlencoded({
	extended: true
}))
const app = sc.listen(port, function (err, result) {
	console.log('running in port http://localhost:' + port)
})
const io = socketIO.listen(app);
    // รอการ connect จาก client
    /*io.on('connection', client => {
        console.log('user connected')
    
        // เมื่อ Client ตัดการเชื่อมต่อ
        client.on('disconnect', () => {
            console.log('user disconnected')
        })

        // ส่งข้อมูลไปยัง Client ทุกตัวที่เขื่อมต่อแบบ Realtime
        client.on('sent-message', function (message) {
            //ส่งข้อความที่รอรับจาก client
            io.sockets.emit('new-message', message)
            //เอา Temp กระจายทุก client
        })  
    })*/

function listen() {
	server.on("error", function (err) {
		console.log("server error:\n" + err.stack);
		server.close()
	})

	server.on("message", function (msg, rinfo) {
		//console.log("server got: " + msg + " from " + rinfo.address + ":" + rinfo.port);
		store.temp = msg.toString()
		store.nbip = rinfo.address
		store.nbport = rinfo.port
		
		var ack = new Buffer("Hello ack")
		server.send(ack, 0, ack.length, rinfo.port, rinfo.address, function(err, bytes) {
		console.log("sent ACK.")
			io.sockets.emit('nb', store.temp)
		})
		//console.log(store);
	})

	server.on("listening", function () {
		var address = server.address()
		console.log("server listening " + address.address + ":" + address.port)
	})

	server.bind({
		address: '0.0.0.0',
		port: 7000,
		exclusive: true
	});
}
