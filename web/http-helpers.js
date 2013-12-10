var path = require('path');
var fs = require('fs');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveStaticAssets = function(res, folder, asset, type) {
  fs.readFile("./" + folder + "/" + asset, function(err, data) {
    var status = 200;
    if (err) {
      status = 404;
      console.log("Could not load asset.");
    }
    headers['Content-Type'] = type;
    res.writeHead(200, headers);
    res.end(data);
  });
};
