"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const config = require("../config");
const router = express.Router();

const { cardList } = require("./models");
const { User } = require("../users/models");

const jsonParser = bodyParser.json();

const jwtAuth = passport.authenticate("jwt", { session: false });

//GET request to /cardlists => return all lists

router.get("/", (req, res) => {
  cardList
    .find()
    .populate("creator")
    .exec(function(err, cardlists) {
      if (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
      }

      res.json(
        cardlists.map(cardlist => {
          return {
            id: cardlist._id,
            creator: cardlist.creator_id,
            name: cardlist.name,
            card1: cardlist.card1,
            card2: cardlist.card2,
            card3: cardlist.card3,
            card4: cardlist.card4,
            card5: cardlist.card5,
            card6: cardlist.card6,
            card7: cardlist.card7,
            card8: cardlist.card8,
            card9: cardlist.card9,
            card10: cardlist.card10
          };
        })
      );
    });
});

//GET request to return card lists by ID
router.get("/:id", jwtAuth, (req, res) => {
  cardList
    .findById(req.params.id)
    .then(cardlist =>
      res.json({
        id: cardlist._id,
        creator: cardlist.creator_id,
        name: cardlist.name,
        card1: cardlist.card1,
        card2: cardlist.card2,
        card3: cardlist.card3,
        card4: cardlist.card4,
        card5: cardlist.card5,
        card6: cardlist.card6,
        card7: cardlist.card7,
        card8: cardlist.card8,
        card9: cardlist.card9,
        card10: cardlist.card10
      })
    )
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

//POST request to add lists
//Check to see if lists are filled.
router.post("/", jsonParser, jwtAuth, (req, res) => {
  const requiredFields = [
    "name",
    "card1",
    "card2",
    "card3",
    "card4",
    "card5",
    "card6",
    "card7",
    "card8",
    "card9",
    "card10"
  ];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.log(message);
      return res.status(400).send(message);
    }
  }

  User.findById(req.user.id)
    .then(user => {
      if (user) {
        cardList
          .create({
            name: req.body.name,
            creator: req.user.id,
            card1: req.body.card1,
            card2: req.body.card2,
            card3: req.body.card3,
            card4: req.body.card4,
            card5: req.body.card5,
            card6: req.body.card6,
            card7: req.body.card7,
            card8: req.body.card8,
            card9: req.body.card9,
            card10: req.body.card10
          })
          .then(cardlist =>
            res.status(201).json({
              id: cardlist.id,
              creator: user.id,
              name: cardlist.name,
              card1: cardlist.card1,
              card2: cardlist.card2,
              card3: cardlist.card3,
              card4: cardlist.card4,
              card5: cardlist.card5,
              card6: cardlist.card6,
              card7: cardlist.card7,
              card8: cardlist.card8,
              card9: cardlist.card9,
              card10: cardlist.card10
            })
          )
          .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" });
          });
      } else {
        const message = "User not found";
        console.error(message);
        return res.status(400).send(message);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

router.put("/:id", jsonParser, jwtAuth, (req, res) => {
  if (!(req.params.id === req.body.id)) {
    const message =
      `Request path id (${req.params.id}) and request body id ` +
      `(${req.body.id}) must match`;

    console.error(message);
    return res.status(400).json({ message: message });
  }

  if (!(req.user.id === req.cardlist.creator_id)) {
    const message =
      `Request user id (${req.user.id}) and request cardlist id ` +
      `(${req.cardlist.creator_id}) must match`;

    console.error(message);
    return res.status(400).json({ message: message });
  }

  console.log(`Updating cardlist item \`${req.params.id}\``);
  const updatedCardList = {};
  const updateableFields = [
    "name",
    "card1",
    "card2",
    "card3",
    "card4",
    "card5",
    "card6",
    "card7",
    "card8",
    "card9",
    "card10"
  ];

  updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });

  cardList
    .findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
    .then(updatedCardList =>
      res.status(204).json({
        id: updatedCardList.id,
        //creator: updatedCardList.creator_id,
        //double check this use of virtualization
        name: updatedCardList.name,
        card1: updatedCardList.card1,
        card2: updatedCardList.card2,
        card3: updatedCardList.card3,
        card4: updatedCardList.card4,
        card5: updatedCardList.card5,
        card6: updatedCardList.card6,
        card7: updatedCardList.card7,
        card8: updatedCardList.card8,
        card9: updatedCardList.card9,
        card10: updatedCardList.card10
      })
    )
    .catch(err => res.status(500).json({ message: "Internal Server Error" }));
});

router.delete("/:id", jwtAuth, (req, res) => {
  cardList
    .findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch(err => res.status(500).json({ message: "Internal Server Error" }));
});

//Error if user tries wrong endpoints
router.use("*", function(req, res) {
  res.status(404).json({ message: "Not Found" });
});

module.exports = { router };
