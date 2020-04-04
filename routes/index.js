const express = require("express");
const router = express.Router();

const ArticleController = require("../controllers/Article");
const FeedController = require("../controllers/Feed");
const AmpController = require("../controllers/Amp");
const OpmlController = require("../controllers/Opml");
const PermawebController = require("../controllers/Permaweb");
const LinkedDataController = require("../controllers/LinkedData");
const SitemapController = require("../controllers/Sitemap");

/* GET home page */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'api.permaweb.news' });
});

router.route("/article").post(ArticleController.getArticleData);

router.route("/feed").post(FeedController.getFeed);

router.route("/amp").post(AmpController.getAmpPage);

router.route("/opml").post(OpmlController.getOpml);

router.route("/permaweb").post(PermawebController.indexArticle);

router.route("/sitemap").post(SitemapController.getSitemap);

router.route("/ld").post(LinkedDataController.getLinkedData);

module.exports = router;
