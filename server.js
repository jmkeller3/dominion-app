'use strict'

const express = require('express');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const { PORT, DATABASE_URL } = require('./config');
const { cardList } = require('./models');

const app = express();
app.use(express.json());
app.use(express.static('public'));

//GET request to /cardlists => return all lists

app.get('/cardlists', (req, res) => {
    cardList
        .find()
        .then(cardlists => {
            res.json({
                cardlists: cardlists.map((cardlists) => cardlists.serialize())
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Internal server error'});
        });
})

//GET request to return card lists by ID
app.get('/cardlists/:id', (req, res) => {
    cardList
        .findById(req.params.id)
        .then(cardlists => res.json(cardlists.serialize()))
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        });
});


app.use('*', function (req, res) {
    res.status(404).json({ message: 'Not Found' });
});

let server;

function runServer(databaseURL, port = PORT) {

    return new Promise((resolve, reject) => {
        mongoose.connect(databaseURL, err => {
            if (err) {
                return reject(err);
            }
            server = app.listen(port, () => {
                console.log(`Your app is listening on port ${port}`);
                resolve();
            })
            .on('error', err => {
                mongoose.disconnect();
                reject(err);
            });
        });
    });
}

function closeServer() {
    return mongoose.disconnect().then(() => {
        return new Promise((resolve, reject) => {
            console.log('Closing server');
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