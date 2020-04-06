const request = require('request');
const cheerio = require('cheerio');

function getLinkedData (req, res, next) {
  let new_url = req.body.url;
  request(new_url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(body);
      var obj = $("script[type='application/ld+json']");
      for (var i in obj){
        for (var j in obj[i].children) {
          var data = JSON.parse(obj[i].children[j].data);
            if (data) {
              console.log(data);
              res.json(data);
            } else {
              res.status(404).json({
                error: "error fetching article data"
              });
            }
         }
      }
    }
  });
}
