module.exports = {server} 
function server(){
var express = require('express') 
var bodyParser =require('body-parser') 
var http = require('http') 
var socketIO =require ('socket.io')

const server = express()
const port = 3003;

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({
    extended: true
}))

const app = server.listen(port, function (err, result) {
    console.log('running in port http://localhost:' + port)
})

const io = socketIO.listen(app);
// รอการ connect จาก client
io.on('connection', client => {
    console.log('user connected')
  
    // เมื่อ Client ตัดการเชื่อมต่อ
    client.on('disconnect', () => {
        console.log('user disconnected')
    })

    // ส่งข้อมูลไปยัง Client ทุกตัวที่เขื่อมต่อแบบ Realtime
    client.on('sent-message', function (message) {
        io.sockets.emit('new-message', message)
    })
})

}