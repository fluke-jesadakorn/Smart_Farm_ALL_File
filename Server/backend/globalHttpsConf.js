const fs = require('fs');
const https = require('https');
const http = require('http');
module.exports = (PORT, appFromExpress, serverType) => {
    

    let server
    if (process.env.NODE_ENV === 'production') {
        let https_options = {
            key: fs.readFileSync("/etc/letsencrypt/live/nbiot.werapun.com-0001/privkey.pem", "utf8"),
            cert: fs.readFileSync("/etc/letsencrypt/live/nbiot.werapun.com-0001/cert.pem", "utf8"),
            ca: fs.readFileSync('/etc/letsencrypt/live/nbiot.werapun.com-0001/chain.pem', "utf8")
        }
        server = https.createServer(https_options, appFromExpress)
    } else if (process.env.NODE_ENV === 'development') {
        server = http.createServer(appFromExpress)
    }

    server.listen(PORT, function () {
        console.log(`${serverType} Server Running on : 0.0.0.0:${PORT}`);
    });
}