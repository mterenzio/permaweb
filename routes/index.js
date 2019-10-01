const express = require("express");
const router = express.Router();

//const SourceController = require("../controllers/Source");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'api.open.news' });
});

//router.route("/article").post(SourceController.getArticle);

module.exports = router;
