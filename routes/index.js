const express = require("express");
const router = express.Router();

const ArticleController = require("../controllers/Article");
const FeedController = require("../controllers/Feed");
const AmpController = require("../controllers/Amp");
const OpmlController = require("../controllers/Opml");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'api.open.news' });
});

router.route("/article").post(ArticleController.getArticle);

router.route("/feed").post(FeedController.getFeed);

router.route("/amp").post(AmpController.getAmpPage);

router.route("/opml").post(OpmlController.getOpml);

module.exports = router;
