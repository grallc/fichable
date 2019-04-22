const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const fs = require("fs");

// Application the port run in
const port = 8000;

// Partials' folder
hbs.registerPartials(__dirname + "/views/layout/partials");

// Define Handlebars as the main view engine
app.set("view engine", "hbs");

// Where are views located ?
app.use(express.static(__dirname + "/public"));

// index.html page
app.get("/", function(req, res) {
    res.render(path.join(__dirname + "/views/layout/index.hbs"));
});

// create.html page
app.get('/create', (req, res) => {
    res.render(path.join(__dirname + "/views/layout/create.hbs"));
});

// profile.html page
app.get('/profile', (req, res) => {
    res.render(path.join(__dirname + "/views/layout/profile.hbs"));
});


// Run the App' !
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});