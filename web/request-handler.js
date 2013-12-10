var path = require('path');
var fs = require('fs');
var helpers = require('./http-helpers.js');
module.exports.datadir = path.join(__dirname, "../data/sites.txt");

var homepage = function(req, res) {
  if (req.method === 'GET')
    helpers.serveStaticAssets(res, 'public', 'index.html', 'text/html');
  if (req.method === 'POST') {
    var data = '';
    req.on('data', function(d) {
      data += d;
    });
    req.on('end', function() {
      fs.writeFile('../data/sites.txt', data, function(err) {
        if (err) throw err;
        console.log('Saved data to sites.txt!');
        res.writeHead(302, helpers.headers);
        res.end();
      });
    });
  }
}


var sendStyles = function(req, res) {
  helpers.serveStaticAssets(res, 'public', 'styles.css', 'text/css');
}

var sendIcon = function(req, res) {
  helpers.serveStaticAssets(res, 'public', 'favicon.ico', 'image/png');
}

var sendArchive = function(req, res) {
  res.writeHead(200, helpers.headers);
  res.end("www.google.com");
}


module.exports.handleRequest = function (req, res) {
  console.log("Serving " + req.method + " request at url " + req.url);
  var method = router[req.url];
  if (method) {
    method(req, res);
  } else if (archives[req.url]) {       //handler should read the sites directory to see if it has the site in question
    sendArchive(req, res);
  } else {
    res.writeHead(404, helpers.headers);
    res.end("404 - Page not found");
  }
};

var router = {
  '/': homepage,
  '/styles.css': sendStyles,
  '/favicon.ico': sendIcon
};

var archives = {};        //THIS MUST CHANGE, the way i'm dealing with data right now is a quick fix...

var fileString = fs.readFileSync('../data/sites.txt').toString();
var temp = fileString.split('=');
for (var i=0;i<temp.length;i++) {
  archives['/' + temp[i]] = true;
}



// var archives = {
//   '/www.google.com': sendArchive //ok this is a little screwy, needs to change
// }













