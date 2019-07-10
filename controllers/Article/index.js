const Mercury = require("@postlight/mercury-parser");

module.exports = {
  getArticle: (req, res, next) => {
    const title = req.body.title.split(" ").join("-");
    const url = `https://medium.com/the-node-js-collection/${title}`;
    console.log("URL is ", url);
    Mercury.parse(url)
      .then(result => {
        console.log(`Inside Mercury!\n${result}`);
        res.json(result);
      })
      .catch(err => {
        res.status(404).json({
          error: "Mistake happened!"
        });
      });
  }
};
