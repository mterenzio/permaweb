const Arweave = require('arweave/node');

module.exports = {

  indexArticle: (req, res, next) => {
    console.log(req.body);
    //this will validate the json-ld in the body and create a news item
  }

};
