const express = require("express");
const userRouter = express.Router();

userRouter.route("/login").post((req, res, next));
