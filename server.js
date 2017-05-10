var port = process.env.PORT || 1337;
var http = require('http');
var app = require('./jwt_gen');

http.createServer(function (req, res) {
    var url = req.url;

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST");
    res.setHeader("Access-Control-Max-Age", "1000");

    if (url === '/auth') {
        app.handler(req, res);
    }
}).listen(port);

console.log("Visit: http://127.0.0.1:" + port);