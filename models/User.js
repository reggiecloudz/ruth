const mongoose = require("mongoose");
var passportLocalMongoose = require('passport-local-mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  full_name: {
    type: String,
  },
}, { timestamps: true });

userSchema.plugin(passportLocalMongoose);

var User = mongoose.model("User", userSchema);

module.exports = User;