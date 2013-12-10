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
      var parsedData = data.split('=')[1];
      fs.appendFile('../data/sites.txt', '\n' + parsedData, function(err) {   //could do some string manipulation here
        if (err) throw err;                                                   //right now the system can't handle backslashes anywhere in the url
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
  fs.readFile(__dirname + '/../data/sites' + req.url, function(err, data) {
    if (err) throw err;
    newheaders = helpers.headers;
    newheaders['Content-type'] = "text/html";
    res.writeHead(200, helpers.headers);
    res.end(data);
  });
}


module.exports.handleRequest = function (req, res) {
  console.log("Serving " + req.method + " request at url " + req.url);
  var method = router[req.url];
  updateArchives();                       //This function is async, so this is actually a bad place to put it
  if (method) {
    method(req, res);
  } else if (archives[req.url]) {         //This system could be much more flexible, right now the url must be exactly right
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

var archives = {};  

function updateArchives() {
  fs.readdir(__dirname + "/../data/sites", function(err, files) {
    for (var i=0;i<files.length;i++) {
      archives['/' + files[i]] = true;
      console.log('created path to ' + files[i]);
    }
  });
};

updateArchives();











