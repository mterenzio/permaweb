const express = require("express");
const router = express.Router();

const ArticleController = require("../controllers/Article");
const FeedController = require("../controllers/Feed");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'api.open.news' });
});

router.route("/article").post(ArticleController.getArticle);

router.route("/feed").post(FeedController.getFeed);

module.exports = router;
