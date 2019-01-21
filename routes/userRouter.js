const express = require("express");
const User = require("../models/userModel");
const userRouter = express.Router();

userRouter
  .route("/")
  .get((req, res) => {
    User.find({}, (err, users) => {
      res.json(users);
    });
  })
  .post((req, res, next) => {
    let user = new User(req.body);

    user
      .save()
      .then(doc => {
        res.send(doc);
      })
      .catch(err => {
        // console.log("hey: " + err);
        next(err);
      });

    // user.save(err => {
    //   if (err) {
    //     console.log(err);
    //     res.send(err);
    //   } else {
    //     res.send(user);
    //   }
    // });
  });

userRouter.route("/:email").get((req, res) => {
  User.findOne({ email: req.params.email }, (err, user) => {
    res.json(user);
  });
});

module.exports = userRouter;
