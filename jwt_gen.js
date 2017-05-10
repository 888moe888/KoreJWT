var jwt = require('jwt-simple');
var qs = require('qs');

var keyArr = {
    "clientId": "iss",
    "identity": "sub"
};

function generateToken(payload) {
    var jwtSecret = "";
    var jwtData = {};

    var iat = Math.floor(Date.now()/1000);
    var exp = iat + 86400;

    jwtData["iat"] = iat;
    jwtData["exp"] = exp;

    for (var keys in payload) {
        if (keys == "clientSecret")
            jwtSecret = payload[keys];
        else {
            if (keys in keyArr)
                jwtData[keyArr[keys]] = payload[keys];
            else
                jwtData[keys] = payload[keys];
        }
    }
    var token = jwt.encode(jwtData, jwtSecret, 'HS256');
    // console.log(token);
    return token;
}

function authToken(req, res) {
    var body = [];
    var token;

    req.on('data', function (chunk) {
        body.push(chunk);
    }).on('end', function () {
        body = Buffer.concat(body).toString();
        var payload = qs.parse(body);
        console.log(payload);

        token = generateToken(payload);
        console.log(token);

        var responseBody = {
            "jwt": token
        };

        res.writeHead(200, {
            'content-type': 'application/json',
            'authorization': token
        });
        res.write(JSON.stringify(responseBody));
        res.end();
    });
}

module.exports = {
    handler: authToken
};