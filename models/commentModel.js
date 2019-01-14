const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const commentSchema = new Schema(
  {
    user: {
      name: { type: String },
      photo: { type: String }
    },
    itineraryId: { type: String },
    message: { type: String },
    date: {
      type: Date,
      default: Date.now()
    },
    city: { type: String }
  },
  { collection: "comments" }
);
module.exports = commentModel = mongoose.model("comments", commentSchema);
