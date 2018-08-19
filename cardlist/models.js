"use strict";

const mongoose = require("mongoose");
const uuid = require("uuid");

const listSchema = mongoose.Schema({
  // userid: { type: String, required: true },
  name: { type: String, required: true },
  card1: { type: String, required: true },
  card2: { type: String, required: true },
  card3: { type: String, required: true },
  card4: { type: String, required: true },
  card5: { type: String, required: true },
  card6: { type: String, required: true },
  card7: { type: String, required: true },
  card8: { type: String, required: true },
  card9: { type: String, required: true },
  card10: { type: String, required: true }
});

listSchema.methods.serialize = function() {
  return {
    id: this._id,
    // userid: this.userid,
    name: this.name,
    card1: this.card1,
    card2: this.card2,
    card3: this.card3,
    card4: this.card4,
    card5: this.card5,
    card6: this.card6,
    card7: this.card7,
    card8: this.card8,
    card9: this.card9,
    card10: this.card10
  };
};

//users
//username
//password

const cardList = mongoose.model("cardlist", listSchema);

module.exports = { cardList };
