

var helpers = require('./lib/html-fetcher-helpers');


helpers.readUrls(function(urls) {     //should probably check to see whether the site exists already or not
  helpers.downloadUrls(urls);         //because right now it's just redownloading everything everytime
});