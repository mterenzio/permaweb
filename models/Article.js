const mongoose = require("mongoose");

const ArticleSchema = mongoose.Schema({
  title: String,
  author: String,
  date_published: { type: Date, default: Date.now },
  dek: String,
  lead_image_url: String,
  content: String,
  next_page_url: String,
  url: { type: String, required: true },
  domain: String,
  excerpt: String,
  word_count: Number,
  direction: String,
  total_pages: Number,
  rendered_pages: Number
});

module.exports = mongoose.model("Article", ArticleSchema);
