const httpsServer = require('https').createServer
const httpServer = require('http').createServer
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const express = require('express');
const appNonSSL = express();

const dev = true // process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const lineServ = require('./backend/lineServ.js');
const NBServer = require('./backend/NBServ.js');
const MongoServer = require('./backend/mongoServer.js');

let https_options;
let PORThttps = 443;
let PORThttpDev = 5004;
let PORThttpRedirect = 80;
appNonSSL.get('*', (req, res) => {
  res.status(301).redirect(`https://${req.headers.host}${req.url}`) // redirect to url request
  // console.log(req.params['0']);
})

appNonSSL.listen(PORThttpRedirect, () => {
  console.log('HTTP ready for redirect to https')
})

if (process.env.NODE_ENV === 'production') {
  try {
    https_options = {
      key: fs.readFileSync("/etc/letsencrypt/live/nbiot.werapun.com-0001/privkey.pem", "utf8"),
      cert: fs.readFileSync("/etc/letsencrypt/live/nbiot.werapun.com-0001/cert.pem", "utf8"),
      ca: fs.readFileSync('/etc/letsencrypt/live/nbiot.werapun.com-0001/chain.pem', "utf8")
    }
  } catch (err) {
    console.log('error is ' + err);
  }

} else if (process.NODE_ENV === 'development') {
  https_options = null;
}

if (process.env.NODE_ENV === 'production') {
  app.prepare().then(() => {
    httpsServer(https_options, (req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);

    }).listen(PORThttps, err => {
      if (err) console.error(err);
      console.log(`HTTPS > Ready on https://localhost:${PORThttps}`);
    });
  });
}

else if (process.env.NODE_ENV === 'development') {
  app.prepare().then(() => {
    httpServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);

    }).listen(PORThttpDev, err => {
      if (err) console.error(err);
      console.log(`HTTP > Ready on http://localhost:${PORThttpDev}`);
    });
  });
}