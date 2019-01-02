// import mongoose from "mongoose";
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const citySchema = new Schema(
  {
    name: { type: String },
    country: { type: String }
  },
  { collection: "cities" }
);
module.exports = cityModel = mongoose.model("cities", citySchema);
