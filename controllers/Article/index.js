const Mercury = require("@postlight/mercury-parser");

module.exports = {

  getArticleData: (req, res, next) => {
    Mercury.parse(req.body.url, { contentType: "text" })
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        res.status(404).json({
          error: "error fetching article url"
        });
      });
  }

};
