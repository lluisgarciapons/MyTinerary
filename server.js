// import citiesRouter from "./routes/citiesRouter";
const citiesRouter = require("./routes/citiesRouter");
const itineraryRouter = require("./routes/itineraryRouter");
const activityRouter = require("./routes/activityRouter");
const commentRouter = require("./routes/commentRouter");
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
  "mongodb://lluis:l123456@ds117334.mlab.com:17334/mytinerary",
  { useNewUrlParser: true }
);
// mongoose.connect(
//   "mongodb://yotester:a123456a@ds121262.mlab.com:21262/testers",
//   { useNewUrlParser: true }
// );

// app.get("/api/hello", (req, res) => {
//   res.send({ express: "Hello From Express" });
// });
// app.post("/api/world", (req, res) => {
//   console.log(req.body.post);
//   res.send(
//     `I received your POST request. This is what you sent me: ${req.body.post}`
//   );
// });

app.use("/cities/all", citiesRouter);
app.use("/itinerary", itineraryRouter);
app.use("/activity", activityRouter);
app.use("/comments", commentRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));
