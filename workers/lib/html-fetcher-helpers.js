var httpGet = require('http-request');
var fs = require('fs');

// httpGet.get({
//   url:'www.reddit.com',
//   progress: function(current, total) {
//     console.log('downloaded %d bytes from %d', current, total);
//   }
// }, './testData.txt', function(err, res) {
//   if (err) throw err;
//   console.log(res.code, res.headers);
//   });


//passes an array of urls into the callback
exports.readUrls = function(cb){
  fs.readFile(__dirname + '/../../data/sites.txt', function(err, data) {
    if (err) throw err;
    cb(data.toString().split('\n'));
  });
};

//accepts an array of urls, and downloads the landing pages (no spidering) into the data/sites directory
exports.downloadUrls = function(urls){
  for (var i=0;i<urls.length;i++) {
    httpGet.get({
      url: urls[i],
    }, __dirname + '/../../data/sites/' + urls[i], function(err, res) {
      if (err) throw err;
      console.log('Downloaded to ' + res.file);
    });
  }
};
