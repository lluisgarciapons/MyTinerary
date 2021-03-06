let jwt = require("jsonwebtoken");
const config = require("./config.js");

let checkToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
  if (token && token.startsWith("Bearer ")) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: "Token is not valid"
        });
      } else {
        req.decoded = decoded;
        // console.log(decoded);
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: "Auth token is not supplied"
    });
  }
};

errorHandler = function(err, req, res, next) {
  // console.error(err.stack);
  console.error(err);
  res.status(err.status || 400).send(err.message);
};

module.exports = {
  checkToken: checkToken,
  errorHandler: errorHandler
};
