'use strict';

const mongoose = require('mongoose');

const listSchema = mongoose.Schema(
    {
    card1: {type: String, required: true},
    card2: {type: String, required: true},
    card3: {type: String, required: true},
    card4: {type: String, required: true},
    card5: {type: String, required: true},
    card6: {type: String, required: true},
    card7: {type: String, required: true},
    card8: {type: String, required: true},
    card9: {type: String, required: true},
    card10: {type: String, required: true}
});

const cardList = mongoose.model('Card-List', listSchema);

module.exports = {cardList};