const express = require("express");
const Itinerary = require("../models/itineraryModel");
const itineraryRouter = express.Router();

itineraryRouter.route("/:name").get((req, res) => {
  Itinerary.find({ city: req.params.name }, (err, itineraries) => {
    res.json(itineraries);
  });
});

itineraryRouter.route("/").get((req, res) => {
  Itinerary.find({}, (err, itineraries) => {
    res.json(itineraries);
  });
});

module.exports = itineraryRouter;
