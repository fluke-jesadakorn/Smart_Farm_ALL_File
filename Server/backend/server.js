const api = require('./main/api')
var nbserver = require('./main/nbserver')
var store = require('./main/store')
var realtimegraph = require('./main/realtimesocket')

realtimegraph.server()
nbserver.listen()
setInterval(()=>{console.log(store.temp)},1000)