const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const path = require("path");
const hbs = require("hbs");
const fs = require("fs");

const mongoose = require('mongoose');
var { Fiche } = require('./models/fiche');

// Application the port run in
const port = 8080;

// Define MongoURI
mongoose.Promise = global.Promise;
let mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/fichable-dev';

if (process.env.NODE_ENV === 'production') {
    mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/fichable-prod';
}

app.use(express.static(__dirname + '/public'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// Connect the App to the Database
mongoose
    .connect(mongoURI, {
        useNewUrlParser: true
    })
    .then(() => console.log(`MongoDB Connected`))
    .catch(err => console.log(err));

// Partials' folder
hbs.registerPartials(__dirname + "/views/partials");

// Define Handlebars as the main view engine
app.set("view engine", "hbs");

// index.html page
app.get("/", function (req, res) {
    Fiche.find({}).then((fiches) => {
        res.render("index", {fiches});
    }, (e) => {
        res.render("index", {fichesError : e.message})
    });
    
});

// /fiches/new page
app.get('/fiches/new', (req, res) => {
    res.render("fiches/new");
});

// add a Fiche to the Database
app.post("/fiches/submit", (req, res) => {
    console.log(req.body)
    Fiche.create({
        ...req.body
    }, (error, fiche) => {
        console.log(error.message);
    });
});

// profile.html page - login/signup/profile
app.get('/profile', (req, res) => {
    res.render("users/profile");
});


// Run the App' !
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});