var nbserver = require('./main/nbserver')
var store = require('./main/store')
var database = require('./main/mongodb')

//realtimegraph.server()
nbserver.listen()
setInterval(()=>{console.log('temp : ' + store.temp)},5000)
database.database()