// import citiesRouter from "./routes/citiesRouter";
const citiesRouter = require("./routes/citiesRouter");
const itineraryRouter = require("./routes/itineraryRouter");
const activityRouter = require("./routes/activityRouter");
const commentRouter = require("./routes/commentRouter");
const userRouter = require("./routes/userRouter");
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const User = require("./models/userModel");
const app = express();
const Request = require("request");
const port = process.env.PORT || 5000;
let jwt = require("jsonwebtoken");
let config = require("./config");
let { checkToken, errorHandler } = require("./middleware");

class HandlerGenerator {
  login(req, res, next) {
    let email = req.body.username;
    let password = req.body.password;
    // For the given username fetch user from DB

    // let userEmail = "admin@gmail.com";
    // let userPassword = "password";

    Request(`http://localhost:5000/users/${email}`, (error, response, body) => {
      if (error) {
        return console.dir("error", error);
      }
      let data = JSON.parse(body);

      let userName = data.username;
      let userEmail = data.email;
      let userPassword = data.password;

      checkUser(userName, userEmail, userPassword);
    });

    function checkUser(userName, userEmail, userPassword) {
      if (email && password) {
        if (email === userEmail && password === userPassword) {
          //here goes all the info we want to preserve
          let token = jwt.sign(
            { userName: userName, email: email, password: password },
            config.secret,
            {
              expiresIn: "24h" // expires in 24 hours
            }
          );
          // return the JWT token for the future API calls
          res.json({
            success: true,
            message: "Authentication successful!",
            token: token,
            userEmail: userEmail,
            userName: userName
          });
        } else {
          next({
            //this next() sends the info to the next middleware (errorHandler) insteead of returning it
            status: 403,
            success: false,
            message: "Incorrect username or password"
          });
          // res.sendStatus(403).json({
          //   success: false,
          //   message: "Incorrect username or password"
          // });
        }
      } else {
        next({
          status: 400,
          success: false,
          message: "Authentication failed! Please check the request"
        });
        // res.sendStatus(400).json({
        //   success: false,
        //   message: "Authentication failed! Please check the request"
        // });
      }
    }
  }

  index(req, res) {
    // console.log(req.decoded);
    res.json({
      success: true,
      message: "Index page"
    });
  }
}

let handlers = new HandlerGenerator();

app.use(
  bodyParser.urlencoded({
    // Middleware
    extended: true
  })
);

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
  "mongodb://lluis:l123456@ds117334.mlab.com:17334/mytinerary",
  { useNewUrlParser: true }
);

app.use("/cities/all", citiesRouter);
app.use("/itinerary", itineraryRouter);
app.use("/activity", activityRouter);
app.use("/comments", checkToken, commentRouter);
app.use("/users", userRouter);
app.post("/login", handlers.login);
app.get("/v1", checkToken, handlers.index);

// app.use(function(err, req, res, next) {
//   console.error(err.stack);
//   console.error(err.status);
//   res.status(400).send(err.message);
// });

app.use(errorHandler); //this code is the same as the above commented, but taken from middleware.js isntead

app.listen(port, () => console.log(`Listening on port ${port}`));
