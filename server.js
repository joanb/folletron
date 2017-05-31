const path = require('path');
var fs = require('fs');
var express = require('express');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('sslcert/key.pem', 'utf8');
var certificate = fs.readFileSync('sslcert/certificate.pem', 'utf8');

var app = express();

var httpPort = process.env.PORT || 3000;
var httpsPort = 8443;

app.use("/js", express.static(path.join(__dirname, "js")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/css", express.static(path.join(__dirname, "css")));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});


var credentials = {key: privateKey, cert: certificate};

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(httpPort, function() {
  console.log("HTTP Server Started on port " + httpPort);
});

if(httpPort == 3000) {
  httpsServer.listen(httpsPort, function() {
    console.log("HTTPS Server Started on port " + httpsPort);
  })
}