const express = require("express");
const Activity = require("../models/activityModel");
const activityRouter = express.Router();

activityRouter.route("/:name").get((req, res) => {
  Activity.find({ city: req.params.name }, (err, activities) => {
    res.json(activities);
  });
});

activityRouter.route("/").get((req, res) => {
  Activity.find({}, (err, activities) => {
    res.json(activities);
  });
});

module.exports = activityRouter;
