const Mercury = require("@postlight/mercury-parser");

module.exports = {
  getArticle: (req, res, next) => {
    Mercury.parse(req.body.url, { contentType: "text" })
      .then(result => {
        console.log(`Inside Mercury!\n${result}`);
        res.json(result);
      })
      .catch(err => {
        res.status(404).json({
          error: "Invalid url"
        });
      });
  },

  getFeed: (req, res, next) => {}
};
