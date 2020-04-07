const request = require('request');
const cheerio = require('cheerio');

function getLinkedData (req, res, next) {
  let new_url = req.body.url;
  request(new_url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(body);
      var obj = $("script[type='application/ld+json']").html();
      res.json(JSON.parse(obj));
    } else {
      res.status(404).json({
        error: "error fetching article data"
      });
    }
  });
}
