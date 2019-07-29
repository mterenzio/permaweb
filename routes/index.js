const express = require("express");
const router = express.Router();

const SourceController = require("../controllers/Source");
const ArticleController = require("../controllers/Article");

router.route("/article").post(SourceController.getArticle);
router.route("/feed").post(SourceController.getFeed);

//DATABASE FUNCTIONALITY
router
  .route("/db/article")
  .post(ArticleController.saveArticle)
  .put(ArticleController.editArticle)
  .get(ArticleController.viewArticle)
  .delete(ArticleController.deleteArticle);

router
  .route("/db/articles")
  .get(ArticleController.viewAllArticles)
  .delete(ArticleController.deleteAllArticles);

module.exports = router;
