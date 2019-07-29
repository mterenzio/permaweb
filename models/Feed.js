const mongoose = require("mongoose");

const FeedSchema = mongoose.Schema({
  feed: String,
  url: String
});

module.exports = mongoose.model("Feed", FeedSchema);
