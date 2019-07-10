const express = require("express");
const router = express.Router();

const ArticleController = require("../controllers/Article");

/* GET home page. */
router.route("/").get((req, res, next) => {
  res.json("Home page");
});

router.route("/article").post(ArticleController.getArticle);

module.exports = router;
