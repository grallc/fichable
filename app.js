const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const path = require("path");
const hbs = require("hbs");
const fs = require("fs");
const config = require('./config')
const moment = require('moment')

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

app.use('*', (req, res, next) => {
    hbs.registerHelper('isLoggedIn', function (options) {
        if (req.session.userId) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });
    hbs.registerHelper('formatDate', function (dateString) {
        return new hbs.SafeString(
            moment(dateString).format("DD/MM/YYYY à HH:mm")
        );
    });
    hbs.registerHelper('getMessage', function (id) {
        let message;
        switch (id) {
            case `15`:
                message = `Vous n'êtes pas connecté`
                break;
            case `16`:
                message = `Vous avez bien été déconnecté`
                break;
            case `17`:
                message = `Une erreur est survenue lors de la déconnexion. Veuillez réessayer.`
                break;
            case `404`:
                message = `Page introuvable`
                break;
            case `405`:
                message = `Page en construction`
                break;
        }
        return new hbs.SafeString(message);
    });
    next()
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