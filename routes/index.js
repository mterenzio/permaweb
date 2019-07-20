const express = require("express");
const router = express.Router();

const SourceController = require("../controllers/Source");

/* GET home page. */
router.route("/").get((req, res, next) => {
  res.json("Home page");
});

router.route("/article").post(SourceController.getArticle);
router.route("/feed").post(SourceController.getFeed);

module.exports = router;
