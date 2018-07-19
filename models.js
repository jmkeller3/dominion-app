'use strict';

const mongoose = require('mongoose');

const listSchema = mongoose.Schema({
    card1: {type: Object, required: true},
    card2: {type: Object, required: true},
    card3: {type: Object, required: true},
    card4: {type: Object, required: true},
    card5: {type: Object, required: true},
    card6: {type: Object, required: true},
    card7: {type: Object, required: true},
    card8: {type: Object, required: true},
    card9: {type: Object, required: true},
    card10: {type: Object, required: true}
});

const cardList = mongoose.model('Card-List', listSchema);

module.exports = {cardList};