const mongoose = require("mongoose");

mongoose.set("useCreateIndex", true);
const Schema = mongoose.Schema;

var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  return re.test(email);
};

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username must be provided."],
      maxlength: [24, "Username must not exceed 24 characters."]
    },
    email: {
      type: String,
      lowercase: true,
      Required: [true, "Email address cannot be left blank."],
      validate: [validateEmail, "Please fill a valid email address."],
      index: { unique: true, dropDups: true }
    },
    password: {
      type: String,
      required: [true, "Password cannot be left blank."],
      minlength: [6, "password must be at least 6 characters long."]
    }
  },
  { collection: "users" }
);

userSchema.post("save", function(error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new Error("This email is already in use."));
  } else {
    next();
  }
});

module.exports = userModel = mongoose.model("users", userSchema);
