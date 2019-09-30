var nbserver = require('./main/nbserver')
var store = require('./main/store')
//var realtimegraph = require('./main/realtimesocket')

//realtimegraph.server()
nbserver.listen()
setInterval(()=>{console.log('temp : ' + store.temp)},5000)