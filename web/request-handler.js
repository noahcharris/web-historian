var path = require('path');
module.exports.datadir = path.join(__dirname, "../data/sites.txt"); // tests will need to override this.
var helpers = require('./http-helpers.js');

var homepage = function(req, res) {
  if (req.method === 'GET')
    helpers.serveStaticAssets(res, 'public', 'index.html', 'text/html');
  if (req.method === 'POST') {
    req.on('data', function(data) {
      res.writeHead(200, helpers.headers);
      res.end(data);
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
  } else if (archives[req.url]) {
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

var archives = {
  '/www.google.com': sendArchive //ok this is a little screwy, needs to change
}