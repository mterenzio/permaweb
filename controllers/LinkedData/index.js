const request = require('request');
const { JSDOM } = require("jsdom");

module.exports = {

  getLinkedData: (req, res, next) => {
    request(req.body.url, function(error, response, body) {
      const dom = new JSDOM(body);
      var jsonld = JSON.parse(dom.window.document.querySelector('script[type="application/ld+json"]').textContent)
      res.json(jsonld);
    });
  }

};
