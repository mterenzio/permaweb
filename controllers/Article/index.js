const db = require("../../models");

module.exports = {
  saveArticle: (req, res) => {
    db.Article.create(req.body)
      .then(article => res.json(article))
      .catch(err => res.json(err));
  },
  viewArticle: (req, res) => {
    db.Article.findOne({ _id: req.body._id })
      .then(article => res.json(article))
      .catch(err => res.status(404).json({ err: `Article not found ${err}` }));
  },
  editArticle: (req, res) => {
    db.Article.findOneAndUpdate({ _id: req.body._id }, req.body)
      .then(updatedArticle => res.json(updatedArticle))
      .catch(err =>
        res.status(404).json({ err: `Couldn't update an article ${err}` })
      );
  },
  deleteArticle: (req, res) => {
    db.Article.deleteOne({ _id: req.body._id })
      .then(() => res.json({ success: "Successfully deleted" }))
      .catch(err =>
        res.status(404).json({ err: `Error deleting an article ${err}` })
      );
  },
  searchArticle: (req, res) => {
    db.Article.find({ $text: { $search: req.body.search } })
      .then(articles => res.json(articles))
      .catch(err =>
        res.status(404).json({
          err: `Sorry, we couldn't find what you were looking for :( ${err}`
        })
      );
  },
  viewAllArticles: (req, res) => {
    db.Article.find()
      .then(articles => res.json(articles))
      .catch(err => res.status(404).json({ err: `No articles found ${err}` }));
  },
  deleteAllArticles: (req, res) => {
    db.Article.remove({})
      .then(() =>
        res.json({
          success: "Successfully deleted all articles from the database"
        })
      )
      .catch(err =>
        res.status(404).json({
          err: `Error deleting all articles from the database${err}`
        })
      );
  }
};
