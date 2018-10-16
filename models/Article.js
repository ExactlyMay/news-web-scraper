var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  headline: {
    type: String,
    unique: true
  },
  summary: String,
  storyUrl: String,
  imgUrl: String,
  byLine: String,
  saved: {
    type: Boolean,
    default: false
  },
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Note"
    }
  ]
  // ,
  // title: {
  //   type: String,
  //   required: true
  // },
  // link: {
  //   type: String,
  //   required: true
  // }
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
