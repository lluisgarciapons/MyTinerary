const express = require("express");
// import City from "../models/cityModel";
const City = require("../models/cityModel");
const cityRouter = express.Router();

cityRouter
  .route("/")
  .get((req, res) => {
    City.find({}, (err, cities) => {
      res.json(cities);
    });
  })
  .post((req, res) => {
    let city = new City(req.body);
    city.save();
    res.status(201).send(city);
  });

cityRouter.route("/:name").get((req, res) => {
  City.find({ name: req.params.name }, (err, city) => {
    res.json(city);
  });
});

module.exports = cityRouter;
