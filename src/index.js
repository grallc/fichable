const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const fs = require("fs");
const firebase = require("firebase");

const port = 8000;

// Define Handlebars as the main view engine
app.set("view engine", "hbs");

// Where are views located ?
app.use(express.static(__dirname + "/public"));

// Run the App' !
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
