const Sitemapper = require('sitemapper')
const sitemap = new Sitemapper();

module.exports = {

  getSitemap: (req, res, next) => {
    sitemap.fetch(req.body.url).then(function(result) {
      res.json(result);
    });
  }

};
