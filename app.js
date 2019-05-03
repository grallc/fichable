const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const fs = require("fs");

const mongoose = require('mongoose');
var { Post } = require('./models/post');

// Application the port run in
const port = 8080;

mongoose.Promise = global.Promise;
let mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/fichable-dev';

if (process.env.NODE_ENV === 'production') {
    mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/fichable-prod';
}

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
    Post.find({}).then((posts) => {
        res.render("index", {posts});
    }, (e) => {
        res.render("index", {postsError : e.message})
    });
    
});

// create.html page
app.get('/create', (req, res) => {
    res.render("create");
});

// profile.html page
app.get('/profile', (req, res) => {
    res.render("profile");
});


// Run the App' !
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});