const Arweave = require('arweave/node');


function indexArticle (req, res, next) {
  console.log(req.body);
  //this will do the transaction
}

function articleHasChanged (req, res, next) {
  console.log(req.body);
  //this will compared proposed version with one indexed either return the new version or return false
}

function articleExists (req, res, next) {
  console.log(req.body);
  //this will check to see if the article is indexed and either return it or return false
}

function transformToPNP (req, res, next) {
  console.log(req.body);
  //this will take existing data and make it a PNP format for trasaction
  //do we validate json-ld here or somewhere else?
}

module.exports = {
  indexArticle: indexArticle,
  articleHasChanged: articleHasChanged,
  articleExists: articleExists,
  transformToPNP: transformToPNP
};
