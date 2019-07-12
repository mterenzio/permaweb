const express = require("express");
const router = express.Router();

const LinkController = require("../controllers/Link");

/* GET home page. */
router.route("/").get((req, res, next) => {
  res.json("Home page");
});

router.route("/link").post(LinkController.getLink);

module.exports = router;
