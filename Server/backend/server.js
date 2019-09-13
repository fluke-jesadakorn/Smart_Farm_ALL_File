const api = require('./main/api')
var nbserver = require('./main/nbserver')
var store = require('./main/store')

nbserver.listen();
setInterval(()=>{console.log(store.temp)},1000)