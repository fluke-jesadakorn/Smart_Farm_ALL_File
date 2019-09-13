const api = require('./main/api')
const nbserver = require('./main/nbserver')

setInterval(function(){console.log(nbserver.getData().temp)},1000)
nbserver.listen()