const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const itinerarySchema = new Schema(
  {
    title: { type: String },
    city: { type: String },
    userName: { type: String },
    profilePicture: { type: String },
    likes: { type: Number },
    time: { type: Number },
    price: { type: String },
    hastags: { type: Array }
  },
  { collection: "itineraries" }
);
module.exports = itineraryModel = mongoose.model(
  "itineraries",
  itinerarySchema
);
