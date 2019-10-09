var request = require('request'); // for fetching the amp page

const ampToolboxCacheUrl = require('@ampproject/toolbox-cache-url');

module.exports = {

  getAmpPage: (req, res, next) => {
    var result;
    console.log(req.body.url);
    ampToolboxCacheUrl.createCacheUrl('cdn.ampproject.org', req.body.url).then((cacheUrl) => {
      console.log(cacheUrl);
      var ampreq = request(cacheUrl, {timeout: 10000, pool: false}, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the page
        res.send(body)
      });
    });
  }
};
