const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const activitySchema = new Schema(
  {
    city: { type: String },
    itineraryName: { type: String },
    image: { type: String },
    alt: { type: String }
  },
  { collection: "activities" }
);
module.exports = activityModel = mongoose.model("activities", activitySchema);
