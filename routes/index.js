const express = require("express");
const router = express.Router();

const SourceController = require("../controllers/Source");
const ArticleController = require("../controllers/Article");

//Getting info from the url links
router.route("/article").post(SourceController.getArticle);
router.route("/feed").post(SourceController.getFeed);

//single article db setup
router
  .route("/db/article")
  .post(ArticleController.saveArticle)
  .put(ArticleController.editArticle)
  .get(ArticleController.viewArticle)
  .delete(ArticleController.deleteArticle);

//multiple articles db setup
router
  .route("/db/articles")
  .get(ArticleController.viewAllArticles)
  .delete(ArticleController.deleteAllArticles)
  .post(ArticleController.searchArticle);

module.exports = router;
