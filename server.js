"use strict";

const express = require("express");
const mongoose = require("mongoose");
const uuid = require("uuid/v4");
const bodyParser = require("body-parser");
const passport = require("passport");
const morgan = require("morgan");

mongoose.Promise = global.Promise;
//Defining routers for users and JWT Auth
const { router: usersRouter } = require("./users");
const { router: authRouter, localStrategy, jwtStrategy } = require("./auth");

const { PORT, DATABASE_URL } = require("./config");
const { cardList } = require("./models");

const app = express();
const jsonParser = bodyParser.json();

//Logging
app.use(morgan("common"));

//CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  if (req.method === "OPTIONS") {
    return res.send(204);
  }
  next();
});

//Passport JWT
passport.use(localStrategy);
passport.use(jwtStrategy);

app.use("/api/users/", usersRouter);
app.use("/api/auth/", authRouter);

const jwtAuth = passport.authenticate("jwt", { session: false });

//Test Protected endpoint
app.get("/api/protected", jwtAuth, (req, res) => {
  return res.json({
    data: "Snoopy"
  });
});

app.use(express.json());
app.use(express.static("public"));

//GET request to /cardlists => return all lists

app.get("/cardlists", (req, res) => {
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
app.get("/cardlists/:id", (req, res) => {
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
app.post("/cardlists", jsonParser, (req, res) => {
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

app.put("/cardlists/:id", jsonParser, (req, res) => {
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

app.delete("/cardlists/:id", (req, res) => {
  cardList
    .findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch(err => res.status(500).json({ message: "Internal Server Error" }));
});

//Error if user tries wrong endpoints
// app.use("*", function(req, res) {
//   res.status(404).json({ message: "Not Found" });
// });

//Sign-Up Page
app.post("/users", jsonParser, (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (email == null || password == null) {
    const message = `Missing Required Fields. Please enter valid ${
      email == null && password == null
        ? "email and password"
        : email == null
          ? "email"
          : password == null
            ? "password"
            : ""
    }`;
    console.error(message);
    res.status(400).json({ message: "Missing Required Fields" });
  }

  //Create New User in Database
  //Create Token for User
  //Send Token back to User
  //Client-side take user back to card page
});

let server;

function runServer(DATABASE_URL, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      DATABASE_URL,
      err => {
        if (err) {
          return reject(err);
        }
        server = app
          .listen(port, () => {
            console.log(`Your app is listening on port ${port}`);
            resolve();
          })
          .on("error", err => {
            mongoose.disconnect();
            reject(err);
          });
      }
    );
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log("Closing server");
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };
