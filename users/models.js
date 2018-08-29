"use strict";
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  cardlists: [{ type: mongoose.Schema.Types.ObjectId, ref: "cardlist" }]
});

listSchema.pre("findOne", function(next) {
  this.populate("cardlists");
  next();
});

listSchema.pre("find", function(next) {
  this.populate("cardlists");
  next();
});

UserSchema.methods.serialize = function() {
  return {
    email: this.email
  };
};

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

const User = mongoose.model("User", UserSchema);

module.exports = { User };
