var express = require('express')
var nbserver = require('./main/nbserver')
var database = require('./main/mongodb')
var line = require('./main/lineAPI')
var app = express();

//realtimegraph.server()
nbserver.listen()
//setInterval(()=>{console.log('temp : ' + store.temp)},5000)
database.database()
line.line()

if (process.env.NODE_ENV === 'production') {
    app.use(express.static("client/build/"))
    app.get('*', function (req, res) {
        res.sendFile(path.resolve(__dirname + '/client', 'build', 'index.html'));
    });
}

app.listen(80, () => console.log(`MongoDB API Start On Port 80`));