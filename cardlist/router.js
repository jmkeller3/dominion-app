"use strict";
const express = require("express");
const bodyParser = require("body-parser");

const config = require("../config");
const router = express.Router();

const jsonParser = bodyParser.json();

//GET request to /cardlists => return all lists

router.get("/cardlists", (req, res) => {
  cardList
    .find()
    .then(cardlists => {
      res.json({
        cardlists: cardlists.map(cardlists => cardlists.serialize())
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

//GET request to return card lists by ID
router.get("/cardlists/:id", (req, res) => {
  cardList
    .findById(req.params.id)
    .then(cardlists => res.json(cardlists.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

//POST request to add lists
//Check to see if lists are filled.
router.post("/cardlists", jsonParser, (req, res) => {
  const requiredFields = [
    "name",
    // "userid",
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

  cardList
    .create({
      name: req.body.name,
      // userid: req.body.userid,
      //change to req.user later
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
    .then(cardlist => res.status(201).json(cardlist.serialize()))
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

router.put("/cardlists/:id", jsonParser, (req, res) => {
  if (!(req.params.id === req.body.id)) {
    const message =
      `Request path id (${req.params.id}) and request body id ` +
      `(${req.body.id}) must match`;

    console.error(message);
    return res.status(400).json({ message: message });
  }

  console.log(`Updating cardlist item \`${req.params.id}\``);
  const toUpdate = {};
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
    .findByIdAndUpdate(req.params.id, { $set: toUpdate }, { new: true })
    .then(updatedCardList => res.status(204).end())
    .catch(err => res.status(500).json({ message: "Internal Server Error" }));
});

router.delete("/cardlists/:id", (req, res) => {
  cardList
    .findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch(err => res.status(500).json({ message: "Internal Server Error" }));
});

module.exports = { router };

//Error if user tries wrong endpoints
// app.use("*", function(req, res) {
//   res.status(404).json({ message: "Not Found" });
// });

//Sign-Up Page
// app.post("/users", jsonParser, (req, res) => {
//   let email = req.body.email;
//   let password = req.body.password;
//   if (email == null || password == null) {
//     const message = `Missing Required Fields. Please enter valid ${
//       email == null && password == null
//         ? "email and password"
//         : email == null
//           ? "email"
//           : password == null
//             ? "password"
//             : ""
//     }`;
//     console.error(message);
//     res.status(400).json({ message: "Missing Required Fields" });
//   }
// });
//Create New User in Database
//Create Token for User
//Send Token back to User
//Client-side take user back to card page
