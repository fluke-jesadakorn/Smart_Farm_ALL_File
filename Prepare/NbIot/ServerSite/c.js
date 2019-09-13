// -------------------- udp client ----------------
var udp = require('dgram');
var buffer = require('buffer');
var HOST = '52.221.184.203';
var PORT = 8080;

// creating a client socket
var client = udp.createSocket('udp4');

//sending msg
var data = Buffer.from('getData');
client.send(data,PORT,HOST,function(error){
  if(error){
    client.close();
  }else{
    console.log('Data sent !!!');
  }
});

//recieve from proxy
client.on('message',function(msg,info){
  console.log('Data received from server : ' + msg.toString());
  console.log('Received %d bytes from %s:%d\n',msg.length, info.address, info.port);
});


