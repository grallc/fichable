const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const path = require("path");
const hbs = require("hbs");
const fs = require("fs");
const config = require('./config')

// MongoDB relative imports
const mongoose = require('mongoose');

// Authentication relative imports
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
app.use(cookieParser());

// Application the port run in
const port = config.getPort();

// Define MongoURI
mongoose.Promise = global.Promise;
let mongoURI = config.getDatabaseURI()

app.use(express.static(__dirname + '/public'))
app.use(require('morgan')('dev'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())

app.use(cors());

// Connect the App to the Database
mongoose
    .connect(mongoURI, {
        useNewUrlParser: true
    })
    .then(() => console.log(`MongoDB Connected`))
    .catch(err => console.log(err));

app.use(session({
    secret: config.getAuthSecret(),
    saveUninitialized: true,
    resave: false,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));

// Partials' folder
hbs.registerPartials(__dirname + "/views/partials");

// Define Handlebars as the main view engine
app.set("view engine", "hbs");

// index.html page
app.get("/", function (req, res) {
    res.redirect('/fiches');
});


hbs.registerHelper('getFicheCaptchaKey', () => {
    return config.getFicheCaptchaKey();
})

hbs.registerHelper('getRegisterCaptchaKey', () => {
    return config.getRegisterCaptchaKey();
})


app.use('/', require('./routes/index'));
app.use('/api', require('./routes/api/index'));

// Run the App' !
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});