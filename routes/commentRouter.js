const express = require("express");
const Comment = require("../models/commentModel");
const commentRouter = express.Router();

commentRouter.route("/:city").get((req, res) => {
  Comment.find({ city: req.params.city }, (err, comments) => {
    res.json(comments);
  });
});

commentRouter
  .route("/find/:id")
  .get((req, res) => {
    Comment.find({ _id: req.params.id }, (err, comment) => {
      res.json(comment);
    });
  })
  .delete((req, res) => {
    Comment.findById(req.params.id, (err, comment) => {
      comment.remove(err => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(204).send("removed");
        }
      });
    });
  });

commentRouter
  .route("/")
  .get((req, res) => {
    Comment.find({}, (err, comments) => {
      res.json(comments);
    });
  })
  .post((req, res) => {
    let comment = new Comment(req.body);
    comment.save();
    res.status(201).send(comment);
  });

// commentRouter.route("/:id").delete((req, res) => {
//   Comment.findById(req.params.id, (err, comment) => {
//     comment.remove(err => {
//       if (err) {
//         res.status(500).send(err);
//       } else {
//         res.status(204).send("removed");
//       }
//     });
//   });
// });

module.exports = commentRouter;
